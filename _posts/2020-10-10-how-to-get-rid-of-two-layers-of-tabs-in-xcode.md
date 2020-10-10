---
layout: post
title:  "How to get rid of two layers of tabs in Xcode"
description: "When they introduced document tabs, they didn't automatically hide window tabs for users migrating from older versions of Xcode (at least not in my case). It leads to two layers of nested tabs: one level is the bar of window tabs and inside each window tab we have another layer of document tabs. I believe it's way too complex..."
date:   2020-10-10 13:00:00 +0200
categories: ios
keywords: Xcode, tabs, window tabs, document tabs, nested tabs
tags: ios tools
thumbnail: code.png
image: "assets/thumbnails/code.png" # Image for RSS
background: "#d74d00"
comments: true
---

There is one thing that annoyed me a bit when I start using the new Xcode 12 but not to the level I had to fix it ASAP. I would like to share as I found there is an easy fix (ufff, fortunately 😅) that can be applied and it actually improves the overall flow.

# Window tabs vs document tabs

When they introduced document tabs, they didn't automatically hide window tabs for users migrating from older versions of Xcode (at least not in my case). It leads to two layers of nested tabs: one level is the bar of window tabs and inside each window tab we have another layer of document tabs. I believe it is way too complex (*I just want to have multiple documents opened in one editor...*). 

![Two layers of nested tabs in Xcode (window and document tabs)]({{site.url}}/assets/2020-10-10/xcode-tabs-1.png)

First of all I did a quick research in the internet, and found one solution from Jesse: [How to fix the incomprehensible tabs in Xcode 12](https://www.jessesquires.com/blog/2020/07/24/how-to-fix-the-incomprehensible-tabs-in-xcode-12/) but to be honest I don't like this idea, as the window and document tab bars are still presented and take 50 pixels of the screen.

# The solution

I believe it's way easier and beneficial to not change Navigation Style to "Open in Place" as Jesses proposed (*as I still want to benefit from tabs in the best possible way*), but to actually hide the window tab bar. The document tab bar is more intelligent compared to the window tab bar. It automatically checks if the document we try to open is already in the bar and detects what documents were only previewed (they are marked with an italic font) and can be closed or rather replaced with another document. It's quite similar behavior to what we have in Sublime Text and VS Code.

To hide the window tab bar we should close other window tabs first (there should be only one window tab on the screen). Please note window tabs are the first raw, document tabs are below. If there are still more then one window tab opened, the option to hide the bar will be greyed out.

![Hiding the window tab bar)]({{site.url}}/assets/2020-10-10/xcode-tabs-2.png)

The option to hide the window tab bar is located in `View` → `Hide Window Tab Bar`. If you would like to make it visible again, there is a reversing option `View` → `Show Window Tab Bar`.

![The window tab bar is now hidden!)]({{site.url}}/assets/2020-10-10/xcode-tabs-3.png)

That's it! The window tab bar is hidden! 🙌

# One more thing 

This is something that may not apply to you particularly. Few Xcode versions before I enabled one option to open debugger in a new tab. I wanted to prevent the debugger from presenting breakpointed code in the currently opened window tab, as it could close something I worked before debugging. Actually since I have hidden the window tab bar I don't need it anymore. To restore it I just had to disable this option.

![Stop debugger from opening in a new window tab)]({{site.url}}/assets/2020-10-10/xcode-tabs-4.png)

The option to stop opening debugged code in a new window tab is here: `Xcode` → `Preferences...`, then on the `Behaviors` tab find `Running` section and `Pauses` sub-section.

# By the way, about editing...

I wrote this article in VS Code. To make sure it's written without spelling errors I used [Spell Right](https://github.com/bartosz-antosik/vscode-spellright) extension. It's awesome as on macOS it uses the system spelling API and I believe I can recommend it. But I found that it doesn't work out of the box, and it marks all word as incorrect. To make it working I had to add to my `settings.json` the following configuration:

```json
"spellright.language": [
        "en-US"
    ],
```
