---
layout: post
title:  "Welcome the dark mode 🎉"
description: "I woke up this morning and noticed that my website has no dark mode. I couldn't keep it as it is without fixing it with a simple CSS change. 😂"
date:   2021-04-18 09:00:00 +0200
categories: miscellaneous
keywords: darkmode, dark mode, css
tags: miscellaneous
comments: true
thumbnail: darkmode.jpeg
image: "assets/thumbnails/darkmode.jpeg" # Image for RSS
background: "#ffffff"
---

![Dark mode]({{site.url}}/assets/2021-04-18/darkmode.webp)

My website is just a simple GitHub Page with a basic blog so I decided to keep it simple and not go with any more sophisticated Dark Mode management. It works with the preferred OS settings. 🙂

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }

  p {
    color: white;
  }
  
  /* etc, etc... */
}
```

