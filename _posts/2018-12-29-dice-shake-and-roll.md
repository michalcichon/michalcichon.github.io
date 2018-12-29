---
layout: post
title:  "Dice: shake and roll"
description: "Finally I have published my own app in the App Store. It's a very simple app to simulate a die."
date:   2018-12-29 10:44:00 +0200
categories: tools
keywords: dice, roll the dice, shake and roll
thumbnail: apple.png
background: "#000000"
---

I have my own App Store Connect account since 2016 but I used to use it as my playground and testing environment. Sometimes I used this account to prepare test builds for my clients, but most of the time it was quite empty and abandoned. Now I decided to change it so I started to work on some side projects this year. One of them is Dice.

![Dice: shake and roll]({{site.url}}/assets/2018-12-29/dice.png)

**Simplest app on the Earth**

In the first iteration I wanted to keep the design of the app as simple as posible. It has only a toggle to choose single or double dice mode. I wanted to avoid designing complex UI for choosing between variaty of different configurations, die types, rules etc. It should be simple as a dice itself.

My goals could be listed as follows:
- Make the UX as simple as possible
- Clear and colorful UI
- Continuous experience: toggle state should be persisted, so if someone kills the app or something unexpected happens it should start as it was before
- Available in more than 6 languages (especially in English, Polish, Slovak, Ukrainian, Czech and Russian)
- Keep it easy to extend: it should be easy to add new functionalities etc.
- Persist as many statistics as possible to reuse them in next iterations
- Nice architecture: the app is simple and was developed in hours (not days, weeks or months) but I wanted do this right anyways (BTW I chose the MVVM... And ehm, it has no so many models actually... 😅)
- 100% Swift

You can find **Dice: shake and roll** on App Store.