---
layout: post
title:  "I have vibe-coded a game in ChatGPT, Claude and Gemini"
description: ""
date:   2025-10-01 06:00:00 +0200
categories: programming
keywords: programming, vibe-coding, games, memory game, memo game
tags: programming
image: "assets/2025-10-01/thumbnail.jpeg" # Image for RSS
comments: true
---

**Coding without actually writing any code sounds tempting — especially for those who don’t know how to code. It also seems like a nice approach to prototyping when we’re not familiar or proficient with a given technology but need quick results.**

This time, I wanted to test the capabilities of three popular LLMs: ChatGPT 5, Claude (Sonnet 4.5), and Gemini (2.5 Pro). The task was simple: to code a basic memory game that everyone is familiar with. The rule was straightforward — I would only describe what I expected and point out any issues I noticed, but I wouldn’t touch the code itself at all. Let’s see which LLM performs better.

The original prompt was:

```
Create a memory game: 
- It should run in a web browser. 
- Ideally, use vanilla JavaScript and HTML, but you may use a library if it makes sense. 
- For simplicity, assume the back of the cards is just a solid purple color, and the fronts feature emojis (fruits, vegetables, animals, symbols). 
- When a pair is matched, both cards should disappear. 
- Assume a grid of 5×4 cards.
```

And the first iteration is not totally wrong but a bit useless. After flipping a card we still see the back of a card which makes it more like a guess game, because we don't know what elements is actually on the card face. 

<video controls playsinline width="100%">
  <source src="{{site.url}}/assets/2025-10-01/chatgpt-1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>