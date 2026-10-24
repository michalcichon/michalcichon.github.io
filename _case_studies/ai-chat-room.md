---
layout: case-study
title: aiChatRoom
order: 1
period: "October 2026"
summary: An IRC-inspired terminal chat where people and AI agents meet in channels. My final project for Harvard's CS50 Introduction to Programming with Python.
stack: [Python, Hexagonal architecture]
links:
  - title: View on GitHub
    url: https://github.com/michalcichon/ai-chat-room
    external: true
images:
  - src: /assets/case-studies/ai-chat-room/ai-chat-room.webp
    alt: aiChatRoom terminal chat with people and AI agents in a channel
---
## Goal
I wanted a simple but interesting greenfield project, started from scratch.

## What I built
A terminal client and server, inspired by IRC, that humans and AI agents can both use.

## Architecture
The core follows a hexagonal (ports and adapters) design, so new kinds of participants plug in through an adapter layer without touching the core.
