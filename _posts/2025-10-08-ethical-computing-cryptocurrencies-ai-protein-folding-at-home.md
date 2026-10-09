---
layout: post
title:  "Ethical computing: cryptocurrencies, AI and protein folding at home"
description: "I bought a gaming PC — and ended up questioning how we use our computers, our time, and our energy. From games to crypto mining, this is a story about finding purpose in computing."
date:   2025-10-08 06:00:00 +0200
categories: technology
keywords: folding@home, cryptocurrencies, gpu, computing
tags: miscellaneous engineering computing 
image: "assets/2025-10-08/cover.jpg" # Image for RSS
comments: true
---

**A few months ago, I bought a computer. In theory, it was supposed to be our “home computer” — something we could use until my wife gets a new laptop from her work. It also ran Windows, so we could use applications that don’t run on my Mac — for example, some scientific programs my wife normally uses at work — and, potentially, a few games. In practice, however, the computer just ended up collecting dust at the bottom of my drawer.**

<div class="article-hero">
    <img src="{{site.url}}/assets/2025-10-08/cover.webp" alt="Sunny day">
</div>

I don’t like wasting resources — whether it’s running water, our valuable time, or a powerful GPU sitting idle, waiting for a task. It’s always a bit painful to see. This makes me reflect on how we use our computers and what it actually means to use their resources wisely.

## Why Not Just Play Games?

This was my first idea — why not just play some games? After all, this computer was literally built for gaming. So I tried a few newer titles that need a strong GPU, and it was fun — but honestly, I’m more into retro games. And, you know, to play *Heroes of Might and Magic III* or *The Secret of Monkey Island*, you really don’t need the latest NVIDIA hardware.

You might ask, then, why did I buy something I don’t really need? That’s a fair question. I think we were just worried that a weaker computer wouldn’t be able to handle more complex scientific computations if my wife suddenly needed it.

I think that, in some way, having such a computer forced me to think about using resources more wisely. Don’t get me wrong — I don’t mean that playing games is wrong. In fact, I believe it can be quite valuable to spend time with friends playing, or simply to relax after work. Why not? “Everything is for people” as my mum used to say. I guess I’ve just always preferred to create some kind of measurable value out of the tools I have. That's why... I started mining crypto.

This is what tiggers like best: creating abstract representations of value out of bare metal, with GPUs glowing red-hot. I can almost smell the dust coming from the fans spinning wildly. Or is it really?

## The Ugly Side of Computing Power

Every kind of power comes with a price — and I don’t just mean electricity bills or hardware costs. Computers, like any other tools, can be used only for a limited time. Just like other resources such as time or money, they can be spent for a specific purpose — and they are not limitless. When I spend five bucks on a chocolate bar, I can’t spend the same money again on charity. Similarly, when my GPU is busy mining another altcoin, it can’t render game graphics or perform any other, more or less valuable, work.

The story of Beverly Morris[^bbc-water] from rural Georgia shows another, far less abstract side of our digital hunger. Her quiet countryside home turned into a place where even drinking water became uncertain — not because of drought or farming, but because of a nearby data centre owned by Meta. Facilities like this one power our online lives and AI tools, but they also consume enormous amounts of water to keep their processors cool. The cloud may sound weightless, yet it has a heavy physical footprint — millions of gallons of water evaporating each day to make sure we can scroll, stream, and chat without interruption. What looks like progress in one window may, quite literally, dry out the world in another.

Operating AI brings similar problems, as it requires a great deal of power. In Boxtown, a predominantly Black neighborhood in Memphis, residents began reporting worsening respiratory problems and foul gas smells after Elon Musk’s xAI facility began operating[^xai-memphis]. Researchers found nitrogen dioxide levels spiking near the site. The community alleges that the data centre and its power turbines are being imposed on them with little transparency or accountability.

Looking back at the birth of the internet — or even the first sparks of ARPANET — it’s hard not to notice a pattern: the more power we crave, the heavier the footprint we leave behind. At some point, we’ll have to face these consequences, because if we don’t, the next wave of progress might come at a price we can no longer ignore.

## A Spark That Lights the Fire

We can’t fix the world in a single day, but we can start a change within ourselves. Each time we mindlessly scroll through social media, we might pause and ask: how much energy was spent building the algorithmic feed that keeps us watching? Maybe our attention could be invested in something more meaningful. Wherever there’s demand, there will always be supply — and I truly believe that real change begins the moment we choose to stop doing one thing and start doing another.

## Do What Matters with Small Steps

Going back to my dust-collecting PC, I wanted to put it to good use and contribute something positive to the world — so I ran Folding@Home.
If you haven’t heard of it, Folding@Home is a distributed computing project that lets anyone donate their computer’s idle processing power to help scientists simulate protein folding and study diseases such as cancer, Alzheimer’s, and COVID-19.

Installing it on Windows is extremely simple. Installers are available for macOS, Linux, and Windows on the project’s website: [https://foldingathome.org/start-folding/](https://foldingathome.org/start-folding/).

As my gaming laptop runs Windows, I followed the Windows instructions.

The installer works like any standard Windows setup — if you don’t need to change the installation directory, just click Next a few times, and eventually you’ll see a list of your machines.

![Folding@Home: machines]({{site.url}}/assets/2025-10-08/machines.png)

Before you start folding, I recommend doing two things:

1. Create an account so you can monitor your (or rather, your machine’s) progress.
2. Enable GPU computing in the settings to allow your graphics card to handle more demanding computational tasks.

The registration form is available by clicking “**Login**” and then “**Register New Account**”. Before doing that, I recommend creating a passkey. A passkey is a unique identifier that ties your contributions directly to your account. You can generate one here: [https://apps.foldingathome.org/getpasskey](https://apps.foldingathome.org/getpasskey), and then return to the registration form where adding it is optional — but highly recommended.

![Folding@Home: registration]({{site.url}}/assets/2025-10-08/registration.png)

* E-mail — your e-mail address. It can be different from the one you used when creating your passkey, but it doesn’t have to be.
* Passphrase — simply your password (not the passkey!).
* Username — any string between 2 and 100 characters (😅). It doesn’t have to be unique — you can even use your dog’s name if you like! You can also type Anonymous to stay anonymous.
* Team — if you’re part of a team, you can enter its number here. Otherwise, leave it as 0.
* Passkey — the one you received in your e-mail after creating it.

After completing the registration, you’ll need to click the activation link sent to your e-mail to activate your account. Once that’s done, you can log in.

If for any reason you lose the link to the web panel, you can simply visit [https://v8-4.foldingathome.org](https://v8-4.foldingathome.org).

Next, click the small cog icon next to your machine list to open the settings. There, you can enable GPU processing, adjust the number of CPU cores to use, and tweak other available options.

![Folding@Home: settings]({{site.url}}/assets/2025-10-08/settings.png)

Then click “**Fold All**” and watch your progress right on the same page.

![Folding@Home: running]({{site.url}}/assets/2025-10-08/running.png)

You can always check your overall progress here: [https://v8-4.foldingathome.org/stats](https://v8-4.foldingathome.org/stats).

![Folding@Home: stats]({{site.url}}/assets/2025-10-08/stats.png)

And if you’re curious what appears after clicking “**WU Award**” it’s basically a rather old-fashioned certificate. 😉

![Folding@Home: certificate]({{site.url}}/assets/2025-10-08/certificate.jpg)

But what’s really cool is that you can take a peek at the protein being simulated on your machine!

![Folding@Home: certificate]({{site.url}}/assets/2025-10-08/protein.webp)

You can pause or stop folding anytime — either from the web panel or via the app’s context menu. No problem at all.

What makes Folding@Home truly remarkable is its real-world impact. The data generated by thousands of volunteers’ computers have helped researchers better understand how proteins fold and misfold — processes linked to diseases like Alzheimer’s, Parkinson’s, Huntington’s, and many cancers. During the COVID-19 pandemic, Folding@Home even became one of the most powerful computing systems on the planet, helping scientists simulate viral proteins to guide drug discovery[^fah-covid]. Each task your machine completes might represent a tiny fraction of a much larger puzzle, but together, they form insights that could one day save lives.

## Don’t Scientists Already Have Supercomputers? Why Do They Need Our Help?

It’s true that universities and research centers have access to powerful supercomputers, but their time is extremely limited and expensive. Folding@Home works differently — it combines the unused processing power of thousands of ordinary computers around the world into one massive distributed network. This allows scientists to run many small protein simulations in parallel, exploring far more possibilities than a single supercomputer could handle alone. In other words, every participant helps turn downtime and idle energy into valuable scientific computation.

## Where Do We Go from Here?

Should you now delete all your games, remove your social media apps, get rid of every bad habit, and devote all your resources to saving the planet? Probably not.

But I do believe we have the power to change our environment — bit by bit — and make it a better place.

Real change rarely comes from grand gestures — it begins with awareness, curiosity, and the willingness to do one small thing differently. Maybe it’s using your computer for something meaningful, supporting ethical technology, or simply pausing before the next scroll. These moments may feel insignificant, but together they form the spark that lights the fire.

## References

[^bbc-water]: “I can’t drink the water – life next to a US data centre”, *BBC News* (10 July 2025). <https://www.bbc.com/news/articles/cy8gy7lv448o>
[^xai-memphis]: “We Are the Last of the Forgotten: Inside the Memphis Community Battling Elon Musk’s xAI”, *TIME* (13 August 2025). <https://time.com/7308925/elon-musk-memphis-ai-data-center>
[^fah-covid]: “Virus War Goes Viral: Folding@home Gets 1.5+ Exaflops to Fight COVID-19”, *NVIDIA* (1 April 2020) <https://blogs.nvidia.com/blog/foldingathome-exaflop-coronavirus/>