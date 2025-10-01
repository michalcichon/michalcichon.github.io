---
layout: post
title:  "How I Vibe-Coded a Game Using ChatGPT, Claude, and Gemini"
description: ""
date:   2025-10-01 06:00:00 +0200
categories: programming
keywords: programming, vibe-coding, games, memory game, memo game
tags: programming
image: "assets/2025-10-01/thumbnail.png" # Image for RSS
comments: true
---

![Thumbnail]({{site.url}}/assets/2025-10-01/thumbnail.png)

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

The first iteration was not totally wrong, but it was a bit useless. After flipping a card, we still saw the back side, which turned the whole thing into more of a guessing game — we had no idea what element was actually on the face of the card.

<video controls playsinline width="100%">
  <source src="{{site.url}}/assets/2025-10-01/chatgpt-1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

I believed this was just a small CSS issue that ChatGPT could easily fix. So I prompted:

```
It looks promising, but unfortunately, when I click on a card and it flips, I still see the back of the card instead of its face. The face should be an emoji on a white background.
```

But the result was quite strange. Now, all cards were visible from the start, so the whole game was pointless.

<video controls playsinline width="100%">
  <source src="{{site.url}}/assets/2025-10-01/chatgpt-2.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

I tried a couple of times to fix it by prompting ChatGPT again, but it didn’t seem to work. Either all cards were face-up from the beginning, or the back was still visible even after flipping.

Here are some of the prompts I used:

```
The faces are now displayed, but their size (including the white background) is much smaller than the back and aligned to the top. The face and the back of a card should be the same size, and the emoji should be centered inside the card. I also noticed that the flip animation is gone, which I liked very much.
```

```
This version is even more broken: 
- It shows the faces instead of the backs at the start of the game, so I can see where each emoji is. Before flipping a card, we should display the backs of all cards. Then, after clicking, the flip animation should run and the face should be revealed. Only when two cards match should they disappear. 
- The emoji is not vertically centered. The white background of the face should be the same size as the back.
```

```
Issues: 
- Card faces are visible before flipping them. 
- When a card is flipped, it shows the same emoji side but mirrored. Instead, before flipping, it should display the purple back, and after flipping, it should show the card face. 
- On the card face side, the emojis are still not centered, the white area is too small, and the emoji itself is also small. The emoji should be centered both vertically and horizontally, and the face should have the same size and corner radius as the back.
```

```
Issues: 
- After flipping a card, I still see the back — nothing has changed. 
- I can’t verify anything further.
```

```
Issues: 
- In this version, we (again) can see the face of the card before flipping it. 
- After flipping, the card looks the same but mirrored. Instead, it should show the face after flipping and the back before flipping.
```

Unfortunately, none of this brought me closer to a proper solution.

You can find my full series of prompts and attempts in this repo: https://github.com/michalcichon/memo-game. 

## Gemini

I wasn’t happy with the results from ChatGPT, so I moved on to Gemini (2.5 Pro). I sent the same prompt:

```
Create a memory game: 
- It should run in a web browser. 
- Ideally, use vanilla JavaScript and HTML, but you may use a library if it makes sense. 
- For simplicity, assume the back of the cards is just a solid purple color, and the fronts feature emojis (fruits, vegetables, animals, symbols). 
- When a pair is matched, both cards should disappear. 
- Assume a grid of 5×4 cards.
```

And to my surprise, Gemini provided a working solution right from the start.

The code was split into three files — `index.html`, `script.js`, and `style.css` — which felt more structured and used significantly fewer CSS tricks. Most importantly, it worked surprisingly well.

<video controls playsinline width="100%">
  <source src="{{site.url}}/assets/2025-10-01/gemini.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

You can find the full code here: https://github.com/michalcichon/memo-game-gemini

## Claude

To get a broader picture of LLM capabilities, I ran another test — this time with Claude. Using the same prompt, and to my surprise again, Claude generated a working solution immediately as well.

<video controls playsinline width="100%">
  <source src="{{site.url}}/assets/2025-10-01/claude.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

I liked Claude’s solution the most. It deserves extra points for making the game responsive — the grid shrinks dynamically when there’s less space in the browser window.

You can find the solution here: https://github.com/michalcichon/memo-game-gemini. 

