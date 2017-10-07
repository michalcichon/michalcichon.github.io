---
layout: post
title:  "The assign property for pointers to objects"
description: "Updating a IDE can bring some interesting side effects."
date:   2016-05-19 10:09:00 +0200
categories: ios
keywords: xcode, assign, weak property
thumbnail: code.png
background: "#d74d00"
---

With Xcode upgrade to 7.3.1 I got a lot of errors from libraries I use in one of my older project.

`Declaration uses __weak, but ARC is disabled`

It is a standard error if we are using MRR libraries with weak references in ARC project, so the correction of this error was pretty easy. I set Weak References in Manual Retain Release to YES in my project and cocoa pods configuration and I expected the error would be solved, but unfortunately new one appeared. 😅

`Existing instance variable 'state' for property 'state' with assign attribute must be __unsafe_unretained`

SBJSON was using old concept of dealing with weak references and I saw something like that in the source code:

{% highlight objc %}
@property (nonatomic, assign)  SBJsonStreamParserState *state; // Private
{% endhighlight %}

Pretty strange, isn’t it? We have reference to a object and assign property modifier. But it was very common practice in iOS 4 and older when there was no weak modifier.

In the current Objective-C standard we have weak modifier so the bug was easy to fix, but it made me think for a while about iOS evolution. Something that was unnoticed for about 4 years in the project suddenly appeared as an error in the newest Xcode.