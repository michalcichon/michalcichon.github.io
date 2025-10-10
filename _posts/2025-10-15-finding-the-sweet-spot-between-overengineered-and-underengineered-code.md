---
layout: post
title:  "Finding the Sweet Spot: Between Overengineered and Underengineered Code"
description: "There’s a moment in every developer’s career when you realize that both too little and too much engineering hurt a project just the same — only in different ways."
date:   2025-10-09 06:00:00 +0200
categories: software-development
keywords: overengineering, underengineering, software development
tags: programming technology software-development
image: "assets/2025-10-15/cover.png" # Image for RSS
comments: true
---

![A way to choose]({{site.url}}/assets/2025-10-15/cover.webp)

We start with a simple idea — just a few lines of code. A few weeks later, someone adds a new feature, and suddenly that “temporary” solution you wrote on a Friday evening has become a critical dependency. Sounds familiar?

So next time, you try to make it better — adding layers, abstractions, interfaces, dependency injection, and tests. The code now feels future-proof… until no one can understand it, or Product comes up with a new feature that makes the whole structure pointless.

There’s a moment in every developer’s career when you realize that both too little and too much engineering hurt a project just the same — only in different ways. Welcome to the never-ending dance between underengineering and overengineering.

---

Intuitively, when I have two equally good ideas how to implement something bigger, but one is based on inheritance and the latter based on composition, I usually go with composition. But there can be a catch, if we go too deep into decomposing a functionality into too small peaces, it can be challenging to figure out how to use it. 

---

I think one of the nicer ideas about how to make the system more maintainable is by thinking about APIs and contracts. For example when we want to introduce a functionality of a horizontally scrollable container, there are things we should consider:
- The configuration should be simple and we should be allowed to place there any ViewController we want with a small effort (like for example adding a protocol confirmation).
- The API should be simple and possible to be used in one place. If we need to setup multiple different layers, bindings in a few different places and also add a new case to a few enums just to be able to place a ViewController into a container then we can notice two things: we produce way too many lines of code to configure each case we want to instantiate a new container, and it's way to complex for the rest of the team to use it.

