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
published: false
---

**I’ve been working as an iOS developer for over a decade. A few months ago, I decided to move into a different role. The transition was quickly followed by a demanding new project, so I put those thoughts aside for a while. Now, with some distance and perspective, I’d like to look back on the past few years and the lessons they taught me.**

<div class="article-hero">
  <img src="{{site.url}}/assets/2026-06-15/cover.jpg" alt="Gravure de Flammarion">
</div>

## When Tech Felt Like Magic

Back in the 2010s, I already had a few years of experience in enterprise-scale application development. I worked mostly with Java, and iPhones were still a fresh novelty—expensive, and somewhat alternative to the mainstream.
Having a super small, portable computer where you could install tiny apps felt like a crazy yet amazing idea. Being able to work with a hipster programming language like Objective-C and finally forget about Internet Explorer 6 felt like a huge relief.
In 2014 I was still working on banking apps but I replaced my toolkit of Eclipse, Java, Spring, Hibernate, and Oracle databases with Xcode, Interface Builder, Objective-C, and Core Data. I learned how to create custom UI elements, transitions, and… massive view controllers. 🫣  

## Job that feels like home

The biggest breakthrough was when I started working at Codete in June 2016. The company was super dynamic, in a very good momentum and constantly growing. They wanted to have the best engineers and I wanted to be among the brightest so I could learn quicker from more experienced engineers. I knew they were all seniors. 

The other side of the coin was that the first projects I got at Codete were mostly legacy code bases. Our partners knew we were experts so we were getting projects with broken architecture, messy code bases or insufficient performance they asked us to help with. I remember commuting to work thinking about how to fix yet another retain cycle or improve an algorithm that had a bottleneck ruining the performance. When I look back I think that it was an inspiring and stimulating experience. 

One day I got to know that one developer working on a social app for one of our clients was leaving the company and I knew I had to try getting in. I always wanted to work on social media apps: users demanding new features, big scale, a lot of A/B tests and extensive tracking that can help us understand trends and user interaction felt like bread and butter for me.

I was super motivated, did my best on interviews and it really clicked. At that very moment I instantly knew that was the perfect job for me. 

## Work that can be fun

Don’t get me wrong. I enjoy working on code, but I strongly believe that a friendly team and good atmosphere at the workplace might be a game changer for any job. The company was remote first, having developers on three different continents. Yet, the company was not huge, the iOS team was just 3 devs including me. 

That was still before the pandemic and we had gatherings in the headquarters every quarter to discuss Objectives and Key Results and have just fun time together. Every such OKR gathering in the HQ or somewhere else in the world gave me a lot of energy to work even more passionately on our features and investigating bugs.

## Work From Home Visibility

When you work in the office it’s easier to show your presence. When the only face to face interaction is on Google Meet (many meetings during a day, but still the communication is mostly Slack), we really need to commit to be visible. Working on new features and discussing new feature implementation details in the RFCs, ad hoc meetings to distill some tech details, pair programming, proactively asking questions on Slack whenever something is ambiguous. These all are important parts of the job.

There is no coffee table where we can sit together and demonstrate our presence. That’s why it’s important to demonstrate our presence in a different way. Is it bad? Is it good? I would not be so definitive in my opinion. It’s simply different, and it’s good when our “presence” metrics meet with “good work committed” metrics. 🙂

## Over communicate when necessary

When we work on something uncertain, even when we have some preliminary design, the product owner has their vision, but we don’t really know what direction is the best option, it’s super crucial to proactively communicate our doubts and ideas. 

Sometimes a single message on Slack can change the direction of the project as everyone has their “aha moment” saying “we haven't thought about it. This is a good idea”. There is no “too late” to say out loud what we don’t get or like.

Sometimes rising a concern “too late” in the process is better to steer the direction a bit before we go live with some new feature.

## Understanding data is the key

When working on social media apps, making sure we measure what we intend to measure is one of the most important aspects of the work. Running a small experiment in one city might not give us representative results that scale to a different city or market. One thing is to understand statistics but not less important is to see how human interaction maps to a sequence of tracking system events and funnels. 

Surprisingly high amount of time I’ve been involved into tasks that required to navigate, read and interpret data we collected from our A/B tests to be able to understand bottlenecks in our onboarding processes or even crashes.

Understanding that we have a huge base of users that enjoy our product and that having our features polished, fine and clean is a huge motivation to work harder.

## Product that drives the software development life cycle and architecture

To make our user happy we should not only provide a stabile and reliable user experience but hear their voice and steer our focus. The implementation should be flexible enough so we can easily replace UI without ruining the core business logic, removing or rebuilding some parts of the app should be cheap and painless. 

That’s why we often try to adopt the best and most flexible architecture possible. To be frank, sometimes we try too much but the overall effort pays off fast when we need to just replace one another subview or connect some pieces a bit differently in the navigation. 

We can choose between different presentation layer architectures like MVVM, MVP, clean code, VIPER or TCA but as these are commonly discussed topics in the iOS world it’s not the only architecture question we usually ask. The data flow, data architecture, caching and topics like if we should keep a small amount of layers or maybe go with approach like data source pattern or repository pattern are not less but usually male important topics.

The real engineering begins when we implement tests flexible enough so we don’t need to rewrite them with every small adjustment for the UI and they are meaningful enough so they prevent us from pushing new yet broken features. 

## We can achieve everything when we keep focused 

And finally, we are not lone planets. We’re all connected. And if we keep everyone in sync, pairing when necessary and making sure we go faster towards the same goal we can achieve everything. 

Many times in the past few years I was sure that what we do is meaningful. Even when sometimes we figure out something could be better implemented. When we are still in the game, having flexible enough processes and flexible app architecture we can quickly adjust and make our product every day a bit better. 

## What’s next?
That’s a topic for a separate blog post, and I believe it will be interesting to share some insights soon.

In the last 10+ years I fixed many “impossible to fix” issues, performance bottlenecks, especially on the feeds and on fast scrolling, tons of ad related issues that could potentially cost us a lot of missing profit, many migrations of 3rd party integrations, and many, many more. 

I’m still mostly an engineer and having a slightly different toolbox doesn’t dramatically change how I work and what are my objectives. I’m learning a lot still having a constant feeling that I can use a lot from my experience and good practices.
