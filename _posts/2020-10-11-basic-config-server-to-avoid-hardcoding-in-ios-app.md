---
layout: post
title:  "Basic config server to avoid hardcoding in iOS applications"
description: "..."
date:   2020-10-11 20:00:00 +0200
categories: ios
keywords: iOS, hardcoding, config server, mariadb, swift app
tags: ios tools
thumbnail: code.png
image: "assets/thumbnails/code.png" # Image for RSS
background: "#d74d00"
comments: true
---

...

# Installing dependencies

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
CREATE TABLE `config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(128) DEFAULT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
