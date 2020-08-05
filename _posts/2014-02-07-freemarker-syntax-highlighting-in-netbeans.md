---
layout: post
title:  "Freemarker syntax highlighting in NetBeans"
description: "Installing Freemarker support for NetBeans was quite complicated when I did it for the first time. Unfortunately the official Freemarker's website pointed me to a wrong plugin."
date:   2014-02-07 10:09:00 +0200
categories: tools
keywords: syntax, netbeans, lexer
tags: programming
comments: true
---

Installing **Freemarker** support for NetBeans was quite complicated when I did it for the first time. Unfortunately the official Freemarker's website pointed me to a wrong plugin.

To have Freemarker syntax highlighter correctly configured, you should first install a plugin called "Lexer to NetBeans Bridge". You can find it here: [Lexer to NetBeans Bridges][lexer].

Then you install plugin named "Freemarker NetBeans Plugin" available here: [Plugin][plugin]

![Make sure you have these files downloaded.]({{site.url}}/assets/2014-02-07/netbeans1.png)

{:.image-caption}
*Make sure you have these files downloaded.*

![Install both of the plugins using the menu option Tools > Plugins]({{site.url}}/assets/2014-02-07/netbeans2.png)

{:.image-caption}
*Install both of the plugins using menu Tools > Plugins*

![Now it looks just fine.]({{site.url}}/assets/2014-02-07/netbeans3.png)

{:.image-caption}
*Now it looks just fine.*

After the installation process ends make sure you don't have other Freemarker plugins installed. They can cause some problems, so in my case I had to make a quick cleanup after installing those plugins.

[lexer]: http://bits.netbeans.org/maven2/org/netbeans/modules/org-netbeans-modules-lexer-nbbridge/RELEASE71/

[plugin]: http://plugins.netbeans.org/plugin/52115/freemarker-netbeans-plugin
