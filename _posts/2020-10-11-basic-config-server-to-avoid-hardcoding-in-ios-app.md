---
layout: post
title: "Basic config server to avoid hardcoding in iOS applications"
description: "Every information we hardcode in the client application makes it more difficult to update or fix. The problem is getting only worse when we regularly roll out new versions of our application. In this case we would need to keep track of every build to be sure we don't shut down any resource we pointed directly in our source code in the previous builds. Hardcoding is generally a bad idea..."
date: 2020-10-11 08:00:00 +0200
categories: ios
keywords: iOS, hardcoding, config server, mariadb, swift app
tags: ios tools
thumbnail: code.png
image: "assets/thumbnails/code.png" # Image for RSS
background: "#d74d00"
comments: true
---

Every information we hardcode in the client application makes it more difficult to update or fix. The problem is getting only worse when we regularly roll out new versions of our application. In this case we would need to keep track of every build to be sure we don't shut down any resource we pointed directly in our source code in the previous builds. Hardcoding is generally a bad idea.

In this short tutorial, I will show you how to build a simple configuration server that helps to avoid hardcoding values on the client side.

# Dependencies

I would like to build something simple with technologies I know more or less from my previous experiences but not heavily. I would pick Node.js stack with Express that will give me neat results pretty quickly. I have used MySQL before but never an open source fork MariaDB, so I would like to give it a try. On the client side I would love to finally build something with SwiftUI. It gives me the following dependencies:

* Node.JS
* Express
* MariaDB
* Swift
* SwiftUI

# Database

I will start with data. MariaDB is open source and installation instructions and binaries can be found on its [website](https://mariadb.org/download/). However installing on macOS is very easy with [brew](https://brew.sh/):

```bash
brew install mariadb
```

Once it is installed, we can try to run it.

```bash
mysql.server start
```

I worked pretty well, but I found that I can't get to the root user.

```bash
mysql -u root
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
```

This is probably because the password wasn't set to my user. I started mysqld_safe and then I could log in to `root` account. 

```bash
sudo mysqld_safe --skip-grant-tables --skip-networking &
```

```bash
sudo mysql -u root
```

I changed the root's password with the following command:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MySecretPassw0rd!';
```

We should not use root account in real life, but just for the demo it is just fine. I won't use my running locally MariaDB instance on the production. 😅

# Database Schema

I would like sort of key-value storage that can be fetched from the backend side and stored in a local database. Additionally I would like to keep track of the updates so I won't fetch configurations I already have on my device.

We could build more complex versioning system. But I would keep it simple and use timestamps. Thanks to `DEFAULT` statement, `updated_at` field will be automatically updated by MariaDB engine every time a row in `config` table is updated.

For convenience I have used [Sequel Pro](https://www.sequelpro.com/) that allows to work with SQL statements as well as create and alter tables visually.

The schema for `config` table looks like this:

```sql
-- Table to store key-value config entries
CREATE TABLE `config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(128) DEFAULT NULL,
  `value` text DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

It's also a good idea to keep `key` values unique, so I added `UNIQUE` for `key` column:

```sql
-- Make sure each key is unique
ALTER TABLE `config` ADD UNIQUE (`key`);
```

And inserted some test data to the table.

```sql
-- Insert test data
INSERT INTO config(`key`, `value`) VALUES ("app.background.color", "#FFB6C1");
INSERT INTO config(`key`, `value`) VALUES ("app.fun_button.text", "Test me!");
INSERT INTO config(`key`, `value`) VALUES ("app.fun_button.url", "https://www.google.com/search?query=funny%20cats");
```

I can see in Sequel Pro that my table looks fine.

![Sequel Pro table view)]({{site.url}}/assets/2020-10-11/sequel_pro.png)

So far we can update our keys using basic SQL statements but it would be nice to have a REST API to do so.

```sql
-- Update some values
UPDATE `config` SET `value` = "#87CEFA" WHERE `key` = "app.background.color";
UPDATE `config` SET `value` = "Can't wait!" WHERE `key` = "app.fun_button.text";
```

# Backend Application

This are my first steps to Node.js and I inspired a nicely written article by [bezkoder](https://bezkoder.com/node-js-rest-api-express-mysql/). I start new project with `npm` which I believe is the standard for Node.js applications.


```bash
npm init
```

![Init npm)]({{site.url}}/assets/2020-10-11/npm_init.png)

`npm` asks few questions and creates `package.json` file for us. This is the place where we define dependencies. To add a new dependency we simply execute `npm install` like this:

```bash
npm install express mysql body-parser --save
```

I started by defining the project structure. I would like to keep it simple but also to have it nicely ordered. I created a main `server.js` file and `app` catalog with the following sub-catalogs:
* config - I will keep here config to the database
* controllers
* models
* routes

`server.js` is very simple and it simply initialize Express with parsers and routers. 

```js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to basic config server." });
});

// routes
require("./app/routes/config.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
```

In `config/db.config.js` I keep credentials to my database.

```js
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "MySecretPassw0rd!",
    DB: "config",
    TIMEZONE: "utc"
};
```

The model responsible for database connection was created in `models` folder:

```js
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  timezone: dbConfig.TIMEZONE
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
```

This is later used in `config` model that will be used to insert and read configs. It has only two fields: `key` and `value`:

```js
const sql = require("./db.js");

// constructor
const Config = function(config) {    
    this.key = config.key;
    this.value = config.value;
};
```

To the model I added two methods. The first one is responsible for adding new keys, the other is for returning them from the database. 

```js
Config.create = (newConfig, result) => {
    sql.query("INSERT INTO config SET ?", newConfig, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created config: ", { id: res.insertId, ...newConfig });
        result(null, { id: res.insertId, ...newConfig });
    })
}

Config.getAfter = (timestamp, result) => {
    sql.query(`SELECT * FROM config WHERE updated_at > STR_TO_DATE('${timestamp}', '%Y-%m-%dT%H:%i:%s%.%#Z')`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("configs: ", res);
        result(null, res);
    });
};

module.exports = Config;
```

I would like to stop here for a moment. Actually I struggle a bit because of this timestamp format. It is a standard ISO-8601 but it is not supported by MariaDB's [STR_TO_DATE](https://mariadb.com/kb/en/str_to_date/) function. I had to use a formatted input but to play with it I simply use this short statement which I run from `Sequel Pro`:

```sql
select STR_TO_DATE('2020-10-11T18:37:16.000Z', '%Y-%m-%dT%H:%i:%s%.%#Z') as 'timestamp';
```

The controllers simply handle HTTP requests and call model's methods.

For example:

```js
exports.findAfter = (req, res) => {
    Config.getAfter(req.params.timestamp, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Config after timestamp ${req.params.timestamp}.`
            });
            } else {
                res.status(500).send({
                    message: "Error retrieving Configs after timestamp " + req.params.timestamp
                });
            }
        } else res.send(data);
      });
};
```

The full source code will be available on my Github.

# Client Application

As I above-mentioned, I would love to use SwiftUI. It is super exciting that we can actually create a project completely without AppDelegate and UIKit life cycle.

![Creating a new project in Xcode)]({{site.url}}/assets/2020-10-11/xcode-new-project.png)

The client app will use `ConfigService` to fetch fresh configuration from the backend side. I would like to trigger it early when the application boots. To demonstrate that config is refreshing UI, I have created a simple demo application with one button that opens a web page. The button's title as well as the main screen background is configurable. I will use the following keys:
* `app.background.color` that allows modifying the background color
* `app.fun_button.text` - the button's text
* `app.fun_button.url` - the button's url

The model confirms to Codable to make it easy to encode and decode from JSON.

```swift
struct Config: Codable {
    let key: String
    let value: String
    let updated_at: Date
}
```

The service class would be a singleton. I don't want to have more instances of this class in my application.

```swift
class ConfigService {
    
    static let shared = ConfigService()

}
```

I added some dependencies and `init`s:

```swift
private let serverUrl: String
private let defaults: UserDefaults
private let notificationCenter: NotificationCenter

private var timestamp: Date? {
    get { defaults.object(forKey: Constants.timestampKey) as? Date }
    set { defaults.setValue(newValue, forKey: Constants.timestampKey) }
}

// MARK: - Init

convenience init() {
    let serverUrl = Constants.configServerUrl
    let defaults = UserDefaults.standard
    let notificationCenter = NotificationCenter.default
    self.init(serverUrl: serverUrl, defaults: defaults, notificationCenter: notificationCenter)
}

init(serverUrl: String, defaults: UserDefaults, notificationCenter: NotificationCenter) {
    self.serverUrl = serverUrl
    self.defaults = defaults
    self.notificationCenter = notificationCenter
    fetchConfig()
}
```

As you can see, the service fetches config just after initialization. To store data locally I used `UserDefaults` which is already a nice key-value storage. I would like to keep the timestamp of the newest known configuration in `UserDefaults` as well. To keep it clear I used a computed property `timestamp` that gives me the getter and setter.

I would like 3 different getters so I can simply get `UIColor`, `URL` and `String` objects from `ConfigService`:

```swift
func string(key: String, defaultValue: String) -> String {
    return defaults.string(forKey: key) ?? defaultValue
}

func url(key: String, defaultValue: URL) -> URL {
    guard let string = defaults.string(forKey: key) else { return defaultValue }
    return URL(string: string) ?? defaultValue
}

func color(key: String, defaultValue: UIColor) -> UIColor {
    guard let string = defaults.string(forKey: key) else { return defaultValue }
    return UIColor(hexString: string) ?? defaultValue
}
```

The data is internally stored as strings so for incorrect data we can use default values.

The method to fetch fresh config utilizes a standard `URLSession` so no additional dependencies are required.

```swift
private func fetchConfig() {
    let baseUrl = URL(string: serverUrl)!
    let url: URL
    if let timestamp = timestamp {
        url = baseUrl.appendingPathComponent(DateFormatter.iso8601withFractionalSeconds.string(from: timestamp))
    } else {
        url = baseUrl
    }
    
    let task = URLSession.shared.dataTask(with: url) { [weak self] (data, response, error) in
        guard let data = data else { return }
        guard let self = self else { return }
        let decoded = self.decodedConfigs(data: data)
        self.update(configs: decoded)
    }
    
    task.resume()
}
```

When the app is run for the first time, it will fetch the whole config from `http://localhost:3000/config`. But the next time we have stored timestamp of the newest element. 

The standard formatter for ISO-8601 from `DateFormatter` doesn't allow fractional seconds that are returned from the backend side, so a custom formatter had to be implemented. I used the same approach as [here](https://stackoverflow.com/questions/46458487/how-to-convert-a-date-string-with-optional-fractional-seconds-using-codable-in-s/46458771#46458771).

As you can see after we fetch the data, we `decode` and then `update`.

The method to decode configs uses a standard JSONDecoder but we need to remember about setting `dateDecodingStrategy`. Otherwise the timestamp won't be represented correctly.

```swift
private func decodedConfigs(data: Data) -> [Config] {
    let decoder = JSONDecoder()
    decoder.dateDecodingStrategy = .formatted(DateFormatter.iso8601withFractionalSeconds)
    return try! decoder.decode([Config].self, from: data)
}
```

Once the new configs are encoded we can update the local `UserDefaults`, and notify other components. We could use some reactive components, but for the demo it is simpler to use a standard `NotificationCenter`.

```swift
private func update(configs: [Config]) {
    for config in configs {
        defaults.setValue(config.value, forKey: config.key)
    }
    
    if let lastTimestamp = configs.map({ $0.updated_at }).max() {
        timestamp = lastTimestamp
    }
    notify()
}

// MARK: - Notify other objects

private func notify() {
    notificationCenter.post(name: .didUpdateConfig, object: nil)
}
```

On the UI we have a `ContentView` made from `Link` and `Color` inserted to a single `ZStack`.

```swift
struct ContentView: View {
  @ObservedObject var model = ContentViewModel()
  var body: some View {
      ZStack {
          Color(model.backgroundColor).ignoresSafeArea()
          Link(model.buttonText, destination: model.buttonURL)
      }
      
  }
}
```

`@ObservedObject` is a property wrapper that allows to store an observable object instance.

The `ViewModel` needs to be an `ObservableObject` and it has only three properties:
* `buttonText`
* `buttonURL`
* `backgroundColor`

```swift
class ContentViewModel: ObservableObject {
    
    var buttonText: String { ConfigService.shared.string(key: "app.fun_button.text", defaultValue: "Dogs are awesome!") }
    var buttonURL: URL { ConfigService.shared.url(key: "app.fun_button.url", defaultValue: URL(string: "https://www.google.com/search?query=dogs%20are%20awesome")!) }
    var backgroundColor: UIColor { ConfigService.shared.color(key: "app.background.color", defaultValue: #colorLiteral(red: 0, green: 0, blue: 0, alpha: 1)) }
    
}
```

As you can see they are computed and use `ConfigService`'s shared instance to get the fresh config but we also provide some default values in case there is no values in `ConfigService`'s data store.

`ConfigService` is independent from SwiftUI but we notify by `NotificationCenter` and we utilize `objectWillChange` to make a manual update to `ContentViewModel`. It is important to dispatch to the main queue as it will trigger UI changes and the notification center will send from a background queue. `@objc` is required for `onConfigUpdate` method because otherwise it won't be visible by `#selector`.

```swift
init() {
    NotificationCenter.default.addObserver(self, selector: #selector(onConfigUpdate), name: .didUpdateConfig, object: nil)
}

@objc func onConfigUpdate() {
    DispatchQueue.main.async { [weak self] in
        self?.objectWillChange.send()
    }
}
```

![The application state is refreshed after fetching the config)]({{site.url}}/assets/2020-10-11/app.png)

As you can see the app's state is refreshed after the config is fetched. To better illustrate it, we could use [Charles](https://www.charlesproxy.com/) that allows us to see the communication between the client and the server.

![The whole config is fetched for the first time)]({{site.url}}/assets/2020-10-11/charles-1.png)

For the first time the whole configuration is fetched. 

![No need to update anything)]({{site.url}}/assets/2020-10-11/charles-2.png)

But when the config is requested for the last known timestamp, the config is empty as no new updates were done since we fetched it last time.

The full source code of the server and the client app are available on [Github repo](https://github.com/michalcichon/basic-config). Feel free to study, fetch and play with it.