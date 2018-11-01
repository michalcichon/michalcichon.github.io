---
layout: post
title:  "Assign property for pointers"
description: "Updating an IDE can bring some interesting side effects."
date:   2016-05-19 10:09:00 +0200
categories: ios
keywords: xcode, assign, weak property
thumbnail: code.png
background: "#d74d00"
---

When upgrading Xcode to 7.3.1 I got a lot of errors from libraries I use in one of my older project.

`Declaration uses __weak, but ARC is disabled`

It's a standard error if we are using MRR libraries with weak references in ARC project, so it can be fixed pretty easy. I set **Weak References** in Manual Retain Release to YES in my project and CocoaPods configuration and I expected the error to be solved, but unfortunately the new one appeared. 😅

`Existing instance variable 'state' for property 'state' with assign attribute must be __unsafe_unretained`

SBJSON is using the old concept of dealing with weak references and there is something like that in the source code:

{% highlight objc %}
@property (nonatomic, assign)  SBJsonStreamParserState *state; // Private
{% endhighlight %}

Pretty strange, I would say. We have a reference to some object and the *assign* property modifier. But actually it was a very common practice in iOS 4 and older when there was no weak modifier.

In the newer Objective-C standard we have *weak* modifier so the bug was easy to fix, but it made me think for a while about iOS evolution. Something that was unnoticed for about 4 years in the project suddenly appeared as an error in the newest Xcode.