---
layout: post
title: "Basic Configuration Server to Avoid Hardcoding in iOS Applications"
description: "Hardcoding any information in a client application makes it more difficult to update or fix. The problem worsens when we regularly roll out new versions of the application. In such cases, we would need to track every build to ensure we don’t shut down any resources directly referenced in our source code from previous builds. Hardcoding is generally a bad idea...."
date: 2020-10-17 08:00:00 +0200
categories: ios
keywords: iOS, hardcoding, config server, mariadb, swift app
tags: ios backend
image: "assets/2020-10-17/cover.jpg" # Image for RSS
comments: true
---

***Hardcoding any information in a client application makes it more difficult to update or fix. The problem worsens when we regularly roll out new versions of the application. In such cases, we would need to track every build to ensure we don’t shut down any resources directly referenced in our source code from previous builds. Hardcoding is generally a bad idea.***

In this short tutorial, I will demonstrate how to build a simple configuration server to help avoid hardcoding values on the client side.

## Dependencies

I want to build something simple using technologies I am somewhat familiar with from past experiences, but have never used extensively. I’ll choose a Node.js stack with Express, as it allows me to achieve neat results quickly. I previously worked with Node.js during a course I attended a few years ago. I’ve also used MySQL before but never its open-source fork, MariaDB, so I’d like to give it a try. On the client side, I’d love to finally build something with SwiftUI. This brings me to the following dependencies:

* Node.JS
* Express
* MariaDB
* Swift
* SwiftUI

## Database

I will start with the data. MariaDB is open source, and installation instructions, as well as binaries, can be found on its [official website](https://mariadb.org/download/). However, installing it on macOS is very easy using [Homebrew](https://brew.sh/):

```bash
brew install mariadb
```

Once it is installed, we can try to run it.

```bash
mysql.server start
```

It worked pretty well, but I found that I can't get to the root user.

```bash
mysql -u root
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
```

This is probably because the password wasn't set for my user. I started `mysqld_safe` and then I could log in to `root` account.

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

We should not use the root account in real-life scenarios, but it's fine for the demo. I won't use my locally running MariaDB instance in production. 😅

## Database Schema

I would like a key-value storage system that can be fetched from the backend and stored in a local database. Additionally, I want to track updates to ensure that I don't fetch configurations that are already up-to-date on my device.

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
INSERT INTO config(`key`, `value`) VALUES ("app.fun_button.text", "Meeeeoowwww! 😸");
INSERT INTO config(`key`, `value`) VALUES ("app.fun_button.url", "https://www.google.com/search?query=funny%20cats");
```

I can see in Sequel Pro that my table looks fine.

![Sequel Pro table view)]({{site.url}}/assets/2020-10-17/sequel_pro.webp)

So far we can update our keys using basic SQL statements but it would be nice to have a REST API to do so.

```sql
-- Update some values
UPDATE `config` SET `value` = "#87CEFA" WHERE `key` = "app.background.color";
UPDATE `config` SET `value` = "Can't wait!" WHERE `key` = "app.fun_button.text";
```

## Backend Application

These are my first steps with Node.js, and I was inspired by a well-written article by [bezkoder](https://bezkoder.com/node-js-rest-api-express-mysql/). I started a new project using `npm`, which I believe is the standard for Node.js applications.


```bash
npm init
```

![Init npm)]({{site.url}}/assets/2020-10-17/npm_init.webp)

`npm` asks few questions and creates `package.json` file for us. This is the place where we define dependencies. To add a new dependency we simply execute `npm install` like this:

```bash
npm install express mysql body-parser --save
```

I started by defining the project structure. I wanted to keep it simple yet nicely organized. I created a main `server.js` file and an `app` folder with the following sub-folders:

- `config` (*where I will keep the database configuration*)  
- `controllers`  
- `models`  
- `routes`  

The `server.js` file serves as a very simple entry point where Express is initialized with parsers and routers.


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

In `config/db.config.js` I saved credentials to my database.

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

To the model I added two methods. The first one is responsible for adding new keys, the other one is for returning them from the database. 

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

I'd like to pause here for a moment. I actually struggled a bit with the timestamp format. While it follows the ISO-8601 standard, it is not supported by MariaDB's [STR_TO_DATE](https://mariadb.com/kb/en/str_to_date/) function. I had to use a formatted input, and to get the correct format, I experimented a bit using this short statement, which I ran from `Sequel Pro`:

```sql
select STR_TO_DATE('2020-10-17T18:37:16.000Z', '%Y-%m-%dT%H:%i:%s%.%#Z') as 'timestamp';
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

The full source code will be available on my [Github](https://www.github.com/michalcichon).

## Client Application

As I above-mentioned, I would love to use SwiftUI. It is super exciting that we can actually create a project completely without AppDelegate and UIKit life cycle.

![Creating a new project in Xcode)]({{site.url}}/assets/2020-10-17/xcode-new-project.webp)

The client app will use `ConfigService` to fetch fresh configuration from the backend. I want to trigger this process early when the application boots. To demonstrate how the configuration refreshes the UI, I have created a simple demo application with one button that opens a web page. The button's title, as well as the main screen background, is configurable. I will use the following keys:

- `app.background.color` - modifies the background color  
- `app.fun_button.text` - the button's text  
- `app.fun_button.url` - the button's URL  

The model conforms to `Codable` to make it easy to encode and decode from JSON.


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
// To store key-value on the client side
private let defaults: UserDefaults
// To be able to notify other interested entities
private let notificationCenter: NotificationCenter

// To be able to request for config changes after the last known point in time
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

The data is internally stored as strings so for incorrect data we can use default values. To decode hex color in `String` to `UIColor` type that could be used across our iOS app, I have added a simple extension to `UIColor` class:

```swift
extension UIColor {
    convenience init?(hexString: String) {
        let string = hexString.replacingOccurrences(of: "#", with: "")
        guard string.count == 6 else { return nil }
        var rgbValue: UInt64 = 0
        Scanner(string: string).scanHexInt64(&rgbValue)
        let red = (rgbValue & 0xFF0000) >> 16
        let green = (rgbValue & 0x00FF00) >> 8
        let blue = rgbValue & 0x0000FF
        self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: CGFloat(1.0))
    }
}
```

The method to fetch fresh config utilizes a standard `URLSession` so no additional dependencies are required.

```swift
private func fetchConfig() {
    let baseUrl = URL(string: serverUrl)!
    let url: URL
    // If there are known timestamp of the latest updated key, we send it back to the backend side to get config changes after that timestamp
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

When the app is run for the first time, it fetches the entire configuration from `http://localhost:3000/config`. On subsequent runs, the timestamp of the newest updated element is stored locally, and the app will call the endpoint like this: `http://localhost:3000/config/2020-10-17T18:43:19.000Z`.

Unfortunately, the standard ISO-8601 formatter from `DateFormatter` doesn't support fractional seconds returned from the backend, so a custom formatter had to be implemented. I used the approach described [here](https://stackoverflow.com/questions/46458487/how-to-convert-a-date-string-with-optional-fractional-seconds-using-codable-in-s/46458771#46458771).

After fetching the data, we `decode` it and then `update` our local storage.

The method to decode configurations uses a standard `JSONDecoder`, but it’s important to set the `dateDecodingStrategy`. Without it, the timestamp won't be represented correctly.

```swift
private func decodedConfigs(data: Data) -> [Config] {
    let decoder = JSONDecoder()
    decoder.dateDecodingStrategy = .formatted(DateFormatter.iso8601withFractionalSeconds)
    return try! decoder.decode([Config].self, from: data)
}
```

Once the new configs are encoded we can update the local `UserDefaults`, and notify other components. We could use some reactive components, but for the demo it is simpler to use the standard `NotificationCenter`.

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

As you can see, these are computed properties that use the `ConfigService`'s shared instance to fetch the latest configuration. We also provide default values in case there are no values in the `ConfigService`'s data store.

`ConfigService` is independent of SwiftUI, but we notify changes using `NotificationCenter` and utilize `objectWillChange` to manually update the `ContentViewModel`. It’s important to dispatch updates to the main queue, as this will trigger UI changes, and `NotificationCenter` sends notifications from a background queue. 

The `@objc` attribute is required for the `onConfigUpdate` method because, without it, the method won't be visible to `#selector`.

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

![The application state is refreshed after fetching the config]({{site.url}}/assets/2020-10-17/app.webp)

As you can see, the app's state is refreshed after the config is fetched. To better illustrate this, we could use [Charles](https://www.charlesproxy.com/), which allows us to monitor the communication between the client and the server.

![The whole config is fetched for the first time]({{site.url}}/assets/2020-10-17/charles-1.webp)

For the first time, the entire configuration is fetched.

![No need to update anything]({{site.url}}/assets/2020-10-17/charles-2.webp)

However, when the config is requested for the last known timestamp, the response is empty because no new updates have been made since the last fetch.

The full source code for both the server and the client app is available on the [GitHub repository](https://github.com/michalcichon/basic-config). Feel free to explore, fetch, and experiment with it.

## How We Could Improve It: Next Steps

This is just a basic demonstration of the config server approach. There are several ways we could improve it:

- Adding indexes to the database, such as on `update_at`, to improve the lookup of the newest key-values.
- Replacing MariaDB with a key-value optimized system.
- Introducing a semantic versioning system.
