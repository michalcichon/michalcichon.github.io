---
layout: post
title:  "Finding the Sweet Spot: Between Overengineered and Underengineered Code"
description: "There’s a moment in every developer’s career when you realize that both too little and too much engineering hurt a project just the same — only in different ways."
date:   2025-10-11 15:00:00 +0200
categories: software-development
keywords: overengineering, underengineering, software development
tags: programming technology software-development
image: "assets/2025-10-11/cover.jpg" # Image for RSS
comments: true
---

**We start with a simple idea — just a few lines of code. A few weeks later, someone adds a new feature, and suddenly that “temporary” solution you wrote on a Friday evening has become a critical dependency. Sounds familiar?**

**So next time, you try to make it better — adding layers, abstractions, interfaces, dependency injection, and tests. The code now feels future-proof… until no one can understand it, or Product comes up with a new feature that makes the whole structure pointless.**

**There’s a moment in every developer’s career when you realize that both too little and too much engineering hurt a project just the same — only in different ways. Welcome to the never-ending dance between underengineering and overengineering.**

![A way to choose]({{site.url}}/assets/2025-10-11/cover.webp)

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

Recently, I discovered a similar issue in the codebase I work on. A struct named `ApiError`, conforming to `Error`, was actually a REST API response type that also conformed to `Decodable`. It was being reused as an error type. Inside that struct, you could find both fields coming from the backend and additional fields used for internal error handling. As more and more cases had to be considered, we kept adding new fields to something that was supposed to be just a simple DTO.

Fortunately, we caught it early — before too much dependent code was written outside of our networking layer.

## Final thought

Finding the balance between the simplest implementation and something overly engineered can be challenging. We all aim to build future-proof codebases, but it’s hard to truly foresee the future. What we can always do, though, is ask ourselves a few simple questions: Can I explain this code to someone in five minutes? Is the API easy to extend? How easily could this code adapt to a constantly evolving environment?

We should never feel unhappy about what we push to our repositories. If something requires cutting corners due to time constraints, we should at least ensure that what we add is easy to reverse — something we can later replace with a more durable implementation.

There’s nothing more persistent than a temporary solution but if we stay aware of it, document it, and design for change, it doesn’t have to haunt us forever. Good engineering isn’t about avoiding compromises. It’s about making them consciously.