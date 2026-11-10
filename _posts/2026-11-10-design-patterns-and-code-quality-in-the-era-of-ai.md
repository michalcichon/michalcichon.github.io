---
layout: post
title:  "Design patterns and code quality in the era of AI"
description: "How AI agents could change the way we think about design patterns, modularity, code quality, and human-readable software."
date:   2026-11-10 11:00:00 +0100
categories: programming
keywords: AI agents, agentic development, design patterns, code quality, software architecture, LLMs
tags: ai programming software-architecture
image: "assets/2026-11-10/banner.webp" # Image for RSS; placeholder until the banner is added
comments: true
---

**I’ve been working with AI agents for a while now, and I keep coming back to a question: if agents write more and more of our code, should we change the way we structure it? The principles we use today help humans understand and maintain software, but I wonder how well they serve the agents now doing some of that work.**

<div class="article-hero">
  <img src="{{site.url}}/assets/2026-11-10/banner.webp" alt="Vincent van Gogh - The Starry Night">
</div>

We usually discuss code quality from a human perspective. Someone needs to understand a method, review a change, or maintain a system several years after its original authors have left. Readability, modularity, and clean APIs help us manage that work.

But what happens when the next developer opening a module is an agent? Should we keep applying the same principles, look for new design patterns, or reconsider what “good code” means altogether?

I don’t have a finished answer, but I think the question is more interesting than whether AI can follow our existing coding standards.

## A chapter instead of the whole book

Imagine asking someone to edit one chapter of a book. Ideally, they can read that chapter, understand its purpose, and make the change without studying every other chapter.

A codebase with clear boundaries offers a similar possibility. An agent changing a payment provider integration should ideally need the relevant implementation, its contract, and its tests. It should not need to reconstruct the entire application to discover what a successful payment means.

This makes me suspect that modularity could become even more valuable in agentic development. Smaller, coherent areas of responsibility may reduce the context an agent needs to read, leaving more room for useful information and potentially reducing token usage.

That is a hypothesis worth measuring, though. Splitting a project into more files does not automatically make a task more local. If understanding one operation requires jumping through twelve tiny modules, we may have made navigation harder without reducing the amount of information needed.

The useful boundary is the one that lets a reader ignore the implementation on the other side. That reader might be a human or an agent.

## Old principles, different incentives

There is an important distinction here: modularity and information hiding are broader design principles, while design patterns are recurring ways of organizing particular solutions. We could preserve the principles while changing which patterns we find useful. We did not invent these ideas only because humans had to type code manually. They help contain change and make reasoning about a system possible. Generating code faster does not remove those problems.

Still, the incentives could shift. A human might tolerate an undocumented convention because they have worked on the project for years. An agent starting a new session may have to rediscover it. Explicit contracts, discoverable entry points, and tests that show intended behavior could therefore deserve more attention, while some abstractions may deserve less. If a generic framework makes every small change require broad exploration, its elegance may be expensive in practice. Conversely, duplicating business rules to make individual files self-contained could create inconsistencies that are harder to detect later.

I would want to judge these choices through actual maintenance tasks: how much context was needed, how many attempts failed, and whether the resulting change was correct. Token usage alone would be a poor definition of code quality.

The same question extends to programming languages. If agents handle more of the implementation, perhaps we can give greater weight to runtime performance and memory usage, even when a language requires more effort from human developers. We might even develop languages specifically for LLMs, although “optimized” could mean anything from fewer tokens to better compiler feedback or more reliable changes. Those goals do not necessarily align, and we would still need to validate behavior and diagnose failures. I would be cautious about choosing a language for a long-lived system around the strengths of one generation of models.

## Could we turn off the lights?

Even if agents become very good at implementing changes, I am still uncomfortable with the idea of letting them work without anyone checking the code. What happens when a production bug affects revenue and no agent can fix it? But there is an awkward follow-up: what happens when no human can fix it either? We already build systems that no single person fully understands. Having humans write the code does not guarantee that someone will know how to repair it.

The difference, to me, is whether we retain an independent way to investigate and recover. If the people operating a system can inspect its behavior, question its assumptions, and understand its critical paths, they have another route when an agent gets stuck. That route becomes much narrower if the code is effectively unreadable to them.

Human-readable code does not guarantee recovery. We also need useful logs, reproducible failures, tests, rollback options, and ways to isolate faulty components. Those capabilities matter regardless of who wrote the implementation.

For now, I would treat human readability as a valuable fallback. Giving it up would require stronger evidence than an agent completing a few development tasks faster.

## A codebase for two kinds of readers

My current instinct is to keep code understandable to both humans and agents, while paying more attention to how much knowledge each change requires.

That means clear module responsibilities, APIs that hide internal complexity, and behavior that can be checked without reading the entire system. It also means resisting abstractions that exist mainly to satisfy a rule about what clean code should look like.

New patterns may emerge as we learn more about agentic development. I would expect the useful ones to help agents make bounded changes and help humans establish whether those changes are safe to rely on.

The question I want to ask when looking at a codebase is becoming: how much of this system must a developer understand to change one thing safely? For now, that seems like a useful question whether the developer is a person or an agent.
