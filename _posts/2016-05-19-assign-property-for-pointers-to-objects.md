---
layout: post
title:  "Assign property for pointers"
description: "When I lately upgraded Xcode to 7.3.1 I suddenly got a lot of errors in one of my older project I wanted to rebuild..."
date:   2016-05-19 10:09:00 +0200
categories: ios
keywords: xcode, assign, weak property
tags: ios programming
thumbnail: code.png
image: "assets/thumbnails/code.png" # Image for RSS
background: "#d74d00"
comments: true
---

When I lately upgraded Xcode to 7.3.1 I suddenly got a lot of errors in one of my older project I wanted to rebuild.

```
Declaration uses __weak, but ARC is disabled
```

It's a standard error if we are using **MRR libraries** with `weak` references in ARC project, and it can be fixed pretty easy. So I set **Weak References** in Manual Retain Release to `YES` in my project and the CocoaPods configuration and I expected the error to be solved, but unfortunately a new one appeared. 😅

```
Existing instance variable 'state' for property 'state' with assign attribute must be __unsafe_unretained
```

**SBJSON** is using the old concept of dealing with weak references and there is something like that in the source code:

```objc
@property (nonatomic, assign)  SBJsonStreamParserState *state; // Private
```

Pretty strange, isn't it? We have a reference to some object and the `assign` property modifier. But actually it was a very common practice in iOS 4 and older when there was no `weak` modifier.

In the newer Objective-C standard we have `weak` modifier so the bug was easy to fix, but it made me think for a while about iOS toolkit evolution and those little changes that are being silently introduced from time to time. Something that was unnoticed for about 4 years in the project suddenly appeared as an error in the newest Xcode.