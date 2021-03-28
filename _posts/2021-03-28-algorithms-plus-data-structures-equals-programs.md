---
layout: post
title:  "Algorithms + Data structures = Programs"
description: "I have been working as a contractor software developer for many years. In my job I have a lot of what I enjoy the most - crème de la crème called writing programs..."
date:   2021-03-28 09:00:00 +0200
categories: software-development
keywords: code review, code evaluation, recruiting software developers
tags: programming processes
thumbnail: swift.png
image: "assets/thumbnails/swift.png" # Image for RSS
background: "#f05138"
comments: true
---

**I have been working as a contractor software developer for many years. In my job I have a lot of what I enjoy the most - *crème de la crème* called writing programs. This process is almost never a single shot of writing what was thought, running, testing and committing. It is obviously not as there are always nuances of what should be done, any kind of limitations and as always expectations which can be changed dynamically.**

The process or building a new logic in our programs is never a linear process as it has been already mentioned thousands times across articles, books and blog posts like this you are reading at the moment. Fortunately I don’t want to start this topic here all over again. This time I would like to focus on something slightly different but still not something that floats totally separately to that *crème de la crème*. That thing is evaluating someone else code. And what I mean here is not a code review we do for our friendly coworkers we know inside out with all weird habits. This time I would like to stop for a minute and think about evaluating code for candidates, people we never known or companies that need to evaluate the state of their software to decide if they should invest more into quality.

[Nicklaus Wirth](https://en.wikipedia.org/wiki/Niklaus_Wirth) coined that phrase about the relation of programs, algorithms and data structures in 1976. It was 45 years ago but such clever foundations like this would probably never get old. If you stop and think about it for a second it is obviously always true. Every design patters, every function, method and spaghetti code you just wrote to scrape some silly thing from the internet can be divided into two categories: data we manipulate and the logic that is used to do that manipulation. Simple as that.

# Git (almost) never lies

If the code I get is distributed to me with a git repository then I usually start my investigation from the git history. Don't get me wrong here, I don't mean that I check timestamps to calculate the velocity or something that crazy. The history is useful to learn more about the candidate's process of thinking and reasoning. Maybe they had some brilliant idea that halfway turned out to no be so cool. Maybe they tried something so hard but gave up at some point. These things are source of some nice follow up when we discuss the solution later in the interview. 

...



<!-- 
- check git history 
- shared state/singleton why they are not good why they can be helpful (date formatter at Comarch) show how we can test shared state/singletons and what can’t be tested
- Global state
- Threads, queues
- Duplicated code
- Unused code
- Consistent naming (if he’s been working for a long time and built it info his muscles or not)
- Used data structures and algorithms (reinvenions, quality etc)
- Mobile specific: resources management, UI, SDKs etc
 -->
