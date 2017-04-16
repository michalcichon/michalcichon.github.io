---
layout: post
title:  "Freemarker syntax highlighting in NetBeans"
date:   2014-02-07 10:09:00 +0200
categories: tools
---

Unlike for Eclipse, installing Freemarker support for NetBeans was quite complicated. Unfortunatelly the official Freemarker's website pointed me to some wrong plugin.

To install Freemarker syntax highlighter, first install plugin called "Lexer to NetBeans Bridge". You can find it here: [Lexer to NetBeans Bridges][lexer].

Then you can install plugin named "Freemarker NetBeans Plugin" available here: [Plugin][plugin]

![Make sure you have these files downloaded.]({{site.url}}/assets/2014-02-07/netbeans1.png)

{:.image-caption}
*Make sure you have these files downloaded.*

![Install both of the plugins using menu Tools > Plugins]({{site.url}}/assets/2014-02-07/netbeans1.png)

{:.image-caption}
*Install both of the plugins using menu Tools > Plugins*

![Now it looks just fine.]({{site.url}}/assets/2014-02-07/netbeans1.png)

{:.image-caption}
*Now it looks just fine.*

After the installation make sure you don't have other Freemarker plugins installed. They can cause problems.

[lexer]: http://bits.netbeans.org/maven2/org/netbeans/modules/org-netbeans-modules-lexer-nbbridge/RELEASE71/

[plugin]: http://plugins.netbeans.org/plugin/52115/freemarker-netbeans-plugin
