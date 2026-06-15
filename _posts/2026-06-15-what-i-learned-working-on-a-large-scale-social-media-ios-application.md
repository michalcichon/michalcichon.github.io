---
layout: post
title:  "What I Learned Working on a Large-Scale Social Media iOS Application"
description: "Lessons learned from building and maintaining a large-scale social media iOS application, including architecture, engineering practices, product development, and team collaboration."
date:   2026-06-15 15:00:00 +0200
categories: software-development
keywords: ios, iphone, swift, mobile-development, software-engineering, software-architecture, social-media, large-scale-systems, product-development, engineering-culture
tags: processes software-development technology ios engineering
image: "assets/2026-06-15/cover.jpg" # Image for RSS
comments: true
published: true
---

**I’ve been working as an iOS developer for over a decade. A few months ago, I decided to move into a different role. The transition was quickly followed by a demanding new project, so I put those thoughts aside for a while. Now, with some distance and perspective, I’d like to look back on the past few years and the lessons they taught me.**

<div class="article-hero position-bottom">
  <img src="{{site.url}}/assets/2026-06-15/cover.jpg" alt="Gravure de Flammarion">
</div>

## When Tech Felt Like Magic

Back in the 2010s, I already had a few years of experience in enterprise-scale application development. I mostly worked with Java, and iPhones were still a fresh novelty, expensive and somewhat alternative to the mainstream.

Having a small, portable computer where you could install tiny apps felt like a crazy yet amazing idea. Working with a “hipster” programming language like Objective-C and finally forgetting about Internet Explorer 6 came as a huge relief.

In 2014, I was still working on banking apps, but I replaced my toolkit of Eclipse, Java, Spring, Hibernate, and Oracle databases with Xcode, Interface Builder, Objective-C, and Core Data. I learned how to create custom UI elements, transitions, and… massive view controllers. 🫣  

## A Job That Felt Like Home

The biggest breakthrough came when I started working at Codete in June 2016. The company was in strong momentum, growing quickly and very dynamically. They wanted to hire the best engineers, and I wanted to be among the brightest so I could learn faster from more experienced people. I knew most of them were senior engineers.

The other side of the coin was that the first projects I got at Codete were mostly legacy codebases. Our partners trusted us as experts, so we were often assigned systems with broken architecture, messy codebases, or insufficient performance. I remember commuting to work and thinking about how to fix yet another retain cycle or improve an algorithm bottleneck that was hurting performance. Looking back, I see it as a highly stimulating and formative experience.

One day, I learned that a developer working on a social app for one of our clients was leaving the company, and I knew I had to try to get into that project. I had always wanted to work on social media apps, systems with demanding users, large scale, lots of A/B tests, and extensive tracking that helps understand user behavior felt like a perfect fit.

I was highly motivated, did my best in the interviews, and it really clicked. At that moment, I knew it was the perfect job for me.

## Work Can Be Fun

Don’t get me wrong. I enjoy working with code, but I strongly believe that a friendly team and good atmosphere can be a game changer in any job. The company was remote-first, with developers across three different continents. Still, it wasn’t a huge organization, the iOS team consisted of just three developers, including me.

This was still before the pandemic, and we had quarterly gatherings at headquarters (or sometimes elsewhere) to discuss Objectives and Key Results and simply spend time together. Each of these OKR sessions gave me a lot of energy and motivation to work more passionately on features and bug investigations. I also wrote about one of these offsites on my blog: [PED offsite in Istanbul]({{site.url}}/events/2025/05/28/ped-offsite-in-istanbul.html).

## Visibility While Working From Home

When you work in an office, it’s easier to show your presence. When the only face-to-face interaction is over Google Meet (with many meetings during the day, while most communication happens on Slack), you need to consciously stay visible.

Working on new features, discussing implementation details in RFCs, joining ad hoc technical discussions, pair programming, and proactively asking questions on Slack whenever something is unclear. These all become important parts of the job.

There is no coffee table where you can casually sit together and demonstrate your presence. That’s why it’s important to show your contribution in other ways. Is it good? Is it bad? I wouldn’t be definitive. It’s simply different, and it works best when “visibility” aligns with actual meaningful work.

## Overcommunicate When Necessary

When working on something uncertain, even when there is a preliminary design, a product vision, and a general direction, it is crucial to proactively communicate doubts and ideas.

Sometimes a single message on Slack can change the direction of a project, as people suddenly have an “aha moment” and realize: “We haven’t thought about this. That’s a good point.”

There is no “too late” moment to say what you don’t understand or don’t agree with.

Sometimes raising a concern “too late” is still better than not raising it at all if it helps adjust the direction before release.

## Understanding Data Is Key

When working on social media apps, ensuring that we measure what we intend to measure is one of the most important aspects of the job. Running a small experiment in one city might not produce representative results for another market or region.

It’s not only about understanding statistics, but also about how human behavior maps to tracking events, funnels, and system metrics.

A surprisingly large amount of my time was spent navigating, reading, and interpreting data from A/B tests to understand bottlenecks in onboarding flows or even crash patterns.

Knowing that millions of users rely on the product, and that improvements directly impact their experience, is a strong motivation to keep improving it.

## Product-Driven Architecture

To make users happy, we must not only provide a stable and reliable experience but also listen to feedback and adjust direction accordingly. The implementation must be flexible enough to replace UI without breaking core business logic, and making changes should be cheap and safe.

That’s why we often aim for flexible architectures. Sometimes we overdo it, but the effort usually pays off when we need to replace a component or adjust navigation flows quickly.

We can choose between MVVM, MVP, Clean Architecture, VIPER, or TCA, but beyond these common iOS patterns, the more important questions are often about data flow, caching strategies, and whether we should use repository or data source patterns.

Real engineering starts when we design tests that are flexible enough not to break with every small UI change, while still being meaningful enough to catch real regressions.

## We Can Achieve Anything When We Stay Focused

And finally, we are not lone planets. We are all connected. When we stay aligned, pair when necessary, and move toward the same goal, we can achieve a lot.

Many times over the past few years, I was convinced that what we were building mattered, even when we later discovered better ways to implement something. As long as we stay in the game, with flexible processes and adaptable architecture, we can continuously improve the product.

## What’s Next?

That’s a topic for a separate blog post, and I hope to share those insights soon.

Over the past 10+ years, I’ve fixed many “impossible” issues: performance bottlenecks (especially in feeds and fast scrolling), ad-related issues that could have cost significant revenue, and numerous migrations of third-party integrations, among many others.

I’m still primarily an engineer, and having a slightly different toolbox doesn’t fundamentally change how I think or what I aim to achieve. I’m still learning a lot, with a constant feeling that I can build on my experience and good practices.