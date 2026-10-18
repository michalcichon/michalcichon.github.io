---
layout: case-study
title: Geolocation-based social app for iOS
order: 1
period: "2018 – 2026"
summary: A social app with over 3 million users, built by cross-functional teams that decided with data. I worked on it for almost nine years, three of them as iOS chapter lead.
stack: [Objective-C, Swift, MVVM + routers, Realm, fastlane, Bitrise]
links:
  - title: Related post
    url: /software-development/2026/06/15/what-i-learned-working-on-a-large-scale-social-media-ios-application.html
---
## Context
The app has more than 3 million users, 5 million at its peak, mostly in the DACH and MENA regions. I joined in January 2018 and stayed until October 2026.

## My role
I was an iOS chapter lead for around three years, and an engineer on the product the rest of the time. The teams were multi-functional. We tried Spotify-style squads and later Shape Up.

## What I worked on
- Channels and real-time chat, built from scratch.
- Many iterations of features that were already running.
- Feed performance improvements.
- Small experiments in feeds and post details.
- A redesign and the introduction of dark mode.

## How we worked
- **Data first.** Decisions came from user interviews and tracking, not opinions.
- **Experiments.** Many A/B tests. Experiments sat behind feature flags and we measured engagement in selected cities.
- **Stability.** We aimed for 99% crash-free sessions while mostly shipping new features.

## Codebase
It started as 100% Objective-C and was 99% Swift by 2026. The architecture was MVVM with routers, data lived in Realm, and releases ran through fastlane and Bitrise CI.
