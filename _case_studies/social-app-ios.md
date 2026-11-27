---
layout: case-study
title: Geolocation-based social app for iOS
order: 2
period: "2018 – 2026"
summary: A social app with over 3 million users, built by cross-functional teams that decided with data. I worked on it for almost nine years, three of them as iOS chapter lead.
stack: [Objective-C, Swift, MVVM + routers, Realm, fastlane, Bitrise]
links:
  - title: Related post
    url: /software-development/2026/06/15/what-i-learned-working-on-a-large-scale-social-media-ios-application.html
images:
  - src: /assets/case-studies/social-app/social-app.webp
    alt: Geolocation-based social app for iOS
---
## Context
The app has more than 3 million users, 5 million at its peak, mostly in the DACH and MENA regions. I joined in January 2018 and stayed until October 2026.

## My role
I was an iOS chapter lead for around three years, and an engineer on the product the rest of the time. The teams were multi-functional. We tried Spotify-style squads and later Shape Up.

## What I worked on
- Channels and real-time chat, built from scratch.
- Many iterations of features that were already running.
- Performance improvements: feed and boot time optimizations.
- Many A/B tests in feeds and post details. They often ran at the same time and could overlap, so I made sure they didn't interfere with each other or break the app.
- Investigations of long-lived crashes, often requiring a deep dive into metrics and analytics to find the cause.
- Many spikes exploring architecture, and applying MVVM to old modules.
- Integrating obfuscation tools.
- The whole build system, written in Ruby and integrated with Bitrise.
- A redesign and the introduction of dark mode.

## What I owned
For most of the time I owned a few features: chat, channels, the new-user experience, and versioning management with a strategy for old clients. I also started several initiatives to remove old feature flags and simplify the codebase.

## Other work I was involved in
Features the wider product team shipped, where I contributed on the iOS side.

- A private chat with a two-sided invitation flow, image sharing and voice memos.
- Monetization: in-app purchases, subscriptions and paid features such as post boosts, read receipts and gifts.
- User moderation, where trusted users review flagged content based on their reputation and karma.
- Ads from Google Ad Manager, with banners from several external sources inserted into feeds.
- Gradual migration from Objective-C to Swift, and SwiftUI for new and static screens.

## How we worked
- **Data first.** Decisions came from user interviews and tracking, not opinions.
- **Experiments.** Many A/B tests. Experiments sat behind feature flags and we measured engagement in selected cities.
- **Release cadence.** New versions shipped every two weeks, with geo-targeted rollouts and market-specific segmentation.
- **Stability.** We held a crash-free rate of about 99% while mostly shipping new features.

## Codebase
It started as 100% Objective-C and was 99% Swift by 2026. The architecture was MVVM with routers, data lived in Realm, and releases ran through fastlane and Bitrise CI.
