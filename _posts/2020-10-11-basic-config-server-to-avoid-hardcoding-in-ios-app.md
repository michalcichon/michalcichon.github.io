---
layout: post
title: "Basic config server to avoid hardcoding in iOS applications"
description: "..."
date: 2020-10-11 08:00:00 +0200
categories: ios
keywords: iOS, hardcoding, config server, mariadb, swift app
tags: ios tools
thumbnail: code.png
image: "assets/thumbnails/code.png" # Image for RSS
background: "#d74d00"
comments: true
---

Every information hardcoded in the client application makes it more difficult to update or fix. The problem is getting only worse when we regularly roll out new versions of our application. In this case we need to keep track of every build to be sure we don't shut down any resource we pointed directly in our source code in the previous builds. Hardcoding is generarly a bad idea.

In this short tutorial, I will show you how to build a simple configuration server that helps to avoid hardcoding values on the client side.

I will use Node.js and MariaDB on the backend side.

# Installing dependencies

https://mariadb.org/download/

```bash
brew install mariadb
```


```bash
mysql.server start
```

sudo mysqld_safe --skip-grant-tables --skip-networking &

```bash
mysql -u root
```

```bash
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
```

```bash
sudo mysql -u root
```

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MySecretPassw0rd!';
```

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

```sql
-- Make sure each key is unique
ALTER TABLE `config` ADD UNIQUE (`key`);
```

```sql
-- Insert test data
INSERT INTO config(`key`, `value`) VALUES ("app.background.color", "#FFB6C1");
INSERT INTO config(`key`, `value`) VALUES ("app.fun_button.text", "Test me!");
INSERT INTO config(`key`, `value`) VALUES ("app.fun_button.url", "https://www.google.com/search?query=funny%20cats");
```

```sql
-- Update some values
UPDATE `config` SET `value` = "#87CEFA" WHERE `key` = "app.background.color";
UPDATE `config` SET `value` = "Can't wait!" WHERE `key` = "app.fun_button.text";
```


```bash
npm init
```

```bash
npm install express mysql body-parser --save
```

https://mariadb.com/kb/en/str_to_date/

```sql
select STR_TO_DATE('2020-10-11T18:37:16.000Z', '%Y-%m-%dT%H:%i:%s%.%#Z') as 'timestamp';
```

https://stackoverflow.com/questions/46458487/how-to-convert-a-date-string-with-optional-fractional-seconds-using-codable-in-s/46458771#46458771