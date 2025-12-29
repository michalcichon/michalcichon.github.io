---
layout: post
title:  "Why do some programming languages have a bad reputation?"
description: "If you look at standard PHP functions you will find that there is a horrible mess. There is no naming strategy, functions have different order of parameters, there are many functions that do the same work but exist in the same super big scope..."
date:   2013-11-10 10:09:00 +0200
categories: programming
keywords: PHP, programming languages
tags: php programming
image: "assets/2013-11-10/cover.jpg" # Image for RSS
comments: true
---

When I began my big journey of developing software I was only a bit experienced in **Atari BASIC**. It was a time when Google just started its business and layouts of websites were created with a high use of **HTML tables**. For me it was very cool to experiment with primitive internet technologies of these days. Since 2003 it has been how I expressed my creativity.

![Code]({{site.url}}/assets/2013-11-10/cover.jpg)

Some years after my humble beginnings I learned PHP and started designing dynamic websites. Then I realized that many people think about PHP programmers as non-professionals. I was wondering why they have such a bad reputation. Times have changed and today there is a strong PHP community in Poland as well as in other countries or worldwide, but some people still have mixed feelings about PHP. Since I also have opportunities to write code in JavaScript I noticed that many people think about that language in similar way as about PHP ten years ago.

Why do some languages have good and others have bad reputation? My first thought was that there are a lot of PHP programmers, everyone can code in it, and the learning curve is very low. We can start writing PHP code pretty fast without having to learn a lot. If there are many beginners writing code in some language then we tend to think of that language as non-professional. There are even some languages which are particularly designed to teach programming like Pascal and almost nobody plans to write commercial programs using them. Of course we have good and complex applications written in Objective Pascal (or Delphi) but there is no rapid growth of this kind of technologies.

The other thing is bad language design. If you take a look at standard PHP functions you will find that there is a horrible mess. There is **no naming strategy**, functions have different order of parameters, there are many functions that do the same work but exist in the same super big scope. The old rule says that when you have garbage in the input you get the same thing in the output (*"Garbage in, garbage out"*). So the people who get messy language tend to don’t pay much attention to write good quality code. As in the old saying “The fish stinks from the head first”.

There is no problem to write good code in PHP, but programmers don’t get good support from the creators of the language to answer the questions about good practices. The similar problem was with **Perl** which allows programmers to write code that do the same thing in many, many different ways. Larry Wall, the creator of Perl, prides himself on that saying *“There’s more than one way to do it”*. But in reality **it’s hard to find the only one best way of implementing something**.

<a name="back-1"></a>
Not only the language designers are responsible for that. JavaScript has a very good object model based on prototypes. The main problem of JavaScript is that you program in different way than in most popular languages like Java or C++. When a programmer has a vague idea of how to get things done he usually creates wrong patterns. If there is too many of them we usually think that there is a problem with a language.[[1](#ref-1)]

The question is how to improve the reputation of that kind of languages? How to change the way people think about them? The first step is to inform people about **best practices**. The second thing is to develop **stabile frameworks**. Zend and other frameworks have speeded up the expansion of good patterns of PHP just like Spring did the same job in the Java world. The last thing is to improve languages themselves. The process of making PHP more organized is on going. But there is also a lot of possibilities of making better programming tools and environments which can help programmers write good quality code.

---

<a name="ref-1"></a>
*[[1](#back-1)] - I believe it has changed a lot since I wrote this article in 2013!*