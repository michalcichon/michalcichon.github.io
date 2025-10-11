---
layout: post
title:  "Finding the Sweet Spot: Between Overengineered and Underengineered Code"
description: "There’s a moment in every developer’s career when you realize that both too little and too much engineering hurt a project just the same — only in different ways."
date:   2025-10-09 06:00:00 +0200
categories: software-development
keywords: overengineering, underengineering, software development
tags: programming technology software-development
image: "assets/2025-10-15/cover.png" # Image for RSS
comments: true
---

![A way to choose]({{site.url}}/assets/2025-10-15/cover.webp)

We start with a simple idea — just a few lines of code. A few weeks later, someone adds a new feature, and suddenly that “temporary” solution you wrote on a Friday evening has become a critical dependency. Sounds familiar?

So next time, you try to make it better — adding layers, abstractions, interfaces, dependency injection, and tests. The code now feels future-proof… until no one can understand it, or Product comes up with a new feature that makes the whole structure pointless.

There’s a moment in every developer’s career when you realize that both too little and too much engineering hurt a project just the same — only in different ways. Welcome to the never-ending dance between underengineering and overengineering.

## Don’t try to foresee too much

We all want a future-proof codebase, but in reality every codebase has an expiration date. iOS is a great example: when Apple introduced Swift, many of us were excited—and also asked, why? We already had Xcode, Objective-C, simulators, Instruments—why did we need anything else? Suddenly there was a new language, and we faced the prospect of fewer and fewer developers comfortable with Objective-C while sitting on a huge Objective-C codebase. 

Requirements change, goals change, and standards evolve, so pieces inevitably get rewritten. Large platforms show this clearly: the Linux kernel, for instance, has replaced or refactored much of its early code over the years as it has grown. The lesson: build for the near-term horizon, and be ready to evolve.

## But don’t block yourself

Like in chess, good coding requires strategy. At first glance, “too complex” and “too simple” code seem like opposites, but if we accept change as inevitable, what really matters isn’t complexity — it’s adaptability. Adding a new feature should require as few modifications as possible and shouldn’t break existing contracts. And if we do make a mistake and need to rewrite a component, it’s far better when the code is simple, with minimal dependencies and layers.

That’s why it’s usually better to start simple, but with room to change and evolve. For example, if we need to add a flag to our API that identifies a user as a moderator, it often makes more sense to introduce a more flexible parameter like `roles` (a collection) instead of a plain boolean `is_moderator`. Then, if we need to support additional roles in the future, we can simply add new ones instead of cluttering the API with more boolean flags.

If we design our code to be more extensible, we might only need to write a small “plugin” or a new class that reuses existing components, without worrying that the entire codebase becomes more complex. It’s already complex because we’ve *pulled that complexity forward*—we’ve extracted it from the future code we’re now implementing.

## Think about contracts

One of the best ways to make a system more maintainable is to think in terms of APIs and contracts.
When you start working on a complex feature, the first question should be: *how will this code be used in the existing codebase?* That mindset can simplify a lot from the very beginning.

I remember when I was a junior full-stack developer (Java + JavaScript) working in a team of more experienced engineers. I was tasked with building a **date-range component** for a banking application. I assumed I could reuse as much code as possible, so I looked at the existing date picker and created an abstraction that could handle a date range instead of a single date.

The result was not great:
- The implementation was scattered across multiple files instead of being self-contained.
- The new component was complex to use — we had to create two independent date fields and then manually bind them through my abstraction layer.

Apart from that, integrating my code into the dashboard turned out to be a nightmare:

```html
<div class="dateButtons">
    <span buttons-radio
        model="dateRange"
        options="dateRanges">
    </span>
    <button 
        ng-class='{active: highlighted}'
        date-range-picker 
        highlighted='customDateHighlighted'
        date-range="customDateRange"><img src="" />
    </button>
</div>
```

One of my senior colleagues suggested a complete rewrite and came up with this simple Angular API:

```html
<div date-range-selector="dateRange" date-ranges="dateRanges"></div>
```

I was surprised that the internal implementation didn’t reuse the existing date field at all — it was actually **much simpler** than mine.
That experience taught me that reuse isn’t always the best choice, but **thinking about how others will use your code always is**.

## Be pragmatic

Once, I was involved in developing an iOS banking application. We had a really nice API for creating forms, mainly used for transfers. The API was well thought out and required very little effort to build a new form. I don’t remember the exact code, but it looked something like this (though at that time it was written in Objective-C):

```swift
var internalTransferForm = FormBuilder()

let firstNameField = FormField(name: "first_name", type: .string)
let lastNameField  = FormField(name: "last_name", type: .string)
let ibanField = FormField("iban", type: .iban)

internalTransferForm.addFields([firstNameField, lastNameField, ibanField])

view.addSubview(internalTransferForm)

```

It worked almost magically, handling things like signing, validation, and submission under the hood.
Or at least — it did, until we had to add a field that wasn’t sent to the backend or signed at all, but still needed to behave like a regular form field on the client side.

We struggled for a few days with that new requirement, considering whether to add a boolean flag to our `FormField` definition that would mark fields as `nonSendable` or `clientOnly`, and then extend our coordinator to handle that new parameter. But that approach would have required changes in many places across the codebase.

Then one of the junior developers suggested that we could simply use the `UITableView` API directly and add the field there — after all, our `Form` was essentially a `UITableView` under the hood. We gave it a try, and it worked perfectly.

In the end, we never needed another field like that again, so extending our entire `FormField` abstraction for this single case would have been a poor decision. Sometimes, the pragmatic shortcut really is the right one.

## Keep it DRY, but not _super_ DRY

“Don’t repeat yourself” is a wonderful principle. In a perfect world, we’d anticipate every future use case, and our code would be perfectly composed into small, reusable components — with no duplication at all.

I’ve seen too many codebases that ignore this rule, and the result is always the same: a nightmare to change anything. When we try to add new logic in one place, we suddenly have to update it everywhere.

The real problem appears when we notice that we need to add that new logic in places A, B, and C — but not in D. That’s when we realize something isn’t quite right.

But we can also easily go too far in the other direction. Imagine we have two entities — let’s say two DTOs — that looked identical at the time we implemented them, so we decided to extract their common fields into a parent class.

A few weeks (or months) later, it turns out that the relationship between them was only _illusory_. By then, we’ve written a lot of new code that depends on this false inheritance. Now we not only have to split these DTOs again, but also rewrite much of the code that was built on top of that mistaken relationship.

Recently, I discovered a similar issue in the codebase I work on. A struct named ApiError, conforming to Error, was actually a REST API response type that also conformed to Decodable. It was being reused as an error type. Inside that struct, you could find both fields coming from the backend and additional fields used for internal error handling.

Fortunately, we caught it early — before too much dependent code was written outside of our networking layer.

## Final thought

Finding balance between too engineered and ... might be challenging. We love future-proof code bases.


---

---

Intuitively, when I have two equally good ideas how to implement something bigger, but one is based on inheritance and the latter based on composition, I usually go with composition. But there can be a catch, if we go too deep into decomposing a functionality into too small peaces, it can be challenging to figure out how to use it. 

---

I think one of the nicer ideas about how to make the system more maintainable is by thinking about APIs and contracts. For example when we want to introduce a functionality of a horizontally scrollable container, there are things we should consider:
- The configuration should be simple and we should be allowed to place there any ViewController we want with a small effort (like for example adding a protocol confirmation).
- The API should be simple and possible to be used in one place. If we need to setup multiple different layers, bindings in a few different places and also add a new case to a few enums just to be able to place a ViewController into a container then we can notice two things: we produce way too many lines of code to configure each case we want to instantiate a new container, and it's way to complex for the rest of the team to use it.


--

Ideas to mention:


- automatic forms in that healthcare project we couldn't really work with and we abandoned creating a custom forms.

- Rather we don't go with this one: feed type in the social media app vs horizontally scrollable feeds and filters

- sometimes junior can understand something wrongly like that ticket i work on as a junior to allow the java app running on websphere to accept extra parameters. i build the whole system and docs and scripts to do so but i haven't noticed that websphere has something like parameters we can configure for the app. we just needed to agree on param naming and use it in the app side. 

- ApiError we get form the backend side as json was used as our iternal error, and we started to create the same objects on our side and mixed both in one object

