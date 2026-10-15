---
layout: post
title:  "What If All Our Code Goes in .gitignore?"
description: "What if AI makes code cheap enough to treat as a build artifact, and specifications, tests and contracts become the thing we maintain?"
date:   2026-10-15 12:00:00 +0200
categories: software-development
keywords: ai, llm, ai-agents, code-generation, specifications, testing, software-engineering, code-review, reproducible-builds, engineering-practices
tags: ai engineering programming
image: "assets/2026-10-16/cover.jpg" # Image for RSS
comments: true
published: true
---

**Imagine ‌opening ‌a ‌pull request that doesn't change a single line of code. It just updates a specification, a couple of tests, maybe some instructions for an AI agent. And when you merge it, the code is automatically generated, tested and deployed. Then you check out the repository again, you don't see the implementation, because the entire `src/` directory is ignored by `.gitignore`. Sounds a bit scary, right?**

<div class="article-hero">
  <img src="{{site.url}}/assets/2026-10-16/cover.jpg" alt="Pieter Bruegel the Elder - The Tower of Babel (Rotterdam)">
</div>

## We Have Always Cared About the Code

For decades, source code has been at the center of software engineering. We write it, then review it, and sometimes refactor it. We argue about naming, abstractions, duplication, and whether a particular function should be ten lines shorter or extracted into a new module. Even when we work at a higher level of abstraction, the implementation is still what we ultimately produce and maintain. And that makes sense, because code is the executable expression of our decisions, and reading it tells us what a system does, why it does it, and where it might fail.

Writing code takes time, and so does reading it. I once heard that we spend 20% of our time writing code and the rest reading it. Now, in the age of AI, I think this imbalance is even more pronounced. Understanding an unfamiliar codebase can be much harder than implementing a new feature in isolation, and every additional line is something that someone may eventually need to debug, modify, or explain. AI changes the economics because generating an implementation can now be much cheaper than understanding it: an agent can produce hundreds of lines while we're still thinking through the requirements, and it can rewrite an entire module faster than we can carefully review the diff.

If the cost of producing code keeps falling, should we continue treating the code itself as our primary engineering output?

## What If Code Were a Build Artifact?

Consider a different way to organize a software project. Instead of treating the implementation as the primary source of truth, we maintain the things that define what the system is supposed to do:

- Specifications describing expected behavior.
- Tests that verify important properties.
- Interfaces and contracts between components.
- Architectural constraints and security policies.
- Configuration describing how the system should be built and deployed.

An AI agent uses these artifacts to generate the implementation. The generated code is compiled, tested, checked against the constraints, and packaged for deployment. If we need to change the behavior, we modify the specification or tests and generate a new implementation. In this model, the code is closer to a build artifact than to a document someone maintains by hand.

We already do something similar in other areas of software engineering. We generate code from schemas, compile source into binaries, build containers from configuration, and recreate infrastructure from declarative definitions. What would be new is the scale. Instead of generating a small, predictable part of the implementation, we would be generating most of the application. If the implementation can be regenerated reliably, why spend so much time maintaining it by hand?

## Define the Behavior Before Writing the Code

The more code we generate, the more important it becomes to define precisely what that code is supposed to do. Requirements are often incomplete, assumptions go undocumented, and edge cases are discovered only during implementation. When a human writes the code, some of these gaps get resolved along the way. An AI agent can turn the same ambiguities into hundreds of lines of plausible-looking code before anyone notices something is missing.

Consider a payment service. What happens when the provider times out after processing a transaction? Can the client safely retry the request? What if two requests attempt to process the same payment? These aren't implementation details. They're behavioral requirements, and leaving them undefined forces the implementer — human or AI — to make assumptions.

Carefully documenting expected behavior, failure modes, state transitions, and invariants before implementation can prevent many of these mistakes. We can then translate those requirements into tests and contracts that help verify the result. This doesn't guarantee correctness, but it shifts more of the engineering effort toward defining the problem rather than fixing misunderstandings afterward. Perhaps the most valuable thing an engineer produces isn't the code itself, but a precise description of what that code must do.

## Why Read Code We Didn't Write?

There is another assumption worth examining: that understanding software requires reading its implementation. Reading code is useful, of course. It helps us investigate bugs, understand algorithms, find security problems, and reason about performance. But reading every line has never guaranteed correctness. A developer can carefully review a change and still miss a race condition. A reviewer can approve a beautifully structured implementation that misunderstands a business requirement. A hundred percent of the diff can be read without anyone noticing that the system is missing an essential authorization check.

We have always relied on more than code review: tests, static analysis, type systems, production monitoring, and the collective knowledge of the team. AI makes that harder to ignore. When an agent generates a large implementation, reading every line may not be the best use of an engineer's attention. Perhaps we should spend more time checking assumptions, defining constraints, verifying behavior, and investigating the parts of the system where failure would be expensive. We still need to understand the software we build. What changes is which parts we need to understand, and how we check that our understanding is correct.

## The Problem With Throwing Code Away

There is an obvious flaw in the idea of putting our source code in `.gitignore`: generated code is not correct just because it can be regenerated. If a production incident occurs, we need to know exactly what was running. If an agent produces a different implementation tomorrow, that version might behave differently even when the specification hasn't changed. If a security vulnerability is discovered, we need to identify affected versions and find out whether the problem exists in our deployed artifacts. And what happens when the agent, model, dependencies, or generation instructions change?

A reproducible build should not depend on the vague promise that an AI system will produce something equivalent next time. We need versioned inputs, traceable outputs, pinned dependencies where appropriate, and a way to connect a deployed artifact to the exact process that created it. There is also a more fundamental problem: specifications are never complete. Tests encode the behavior we thought to check, and contracts describe the boundaries we thought to define. Neither necessarily captures every assumption hidden in the implementation.

If we stop examining the code entirely, we risk a gap between what we believe the system does and what it actually does. And when something breaks, someone still has to debug it. Code may be cheap to generate, but understanding a subtle production failure still isn't.

## From Code Ownership to Behavioral Ownership

Perhaps source code doesn't become disposable so much as our relationship with it changes. We may care less about manually producing every line and more about owning the behavior of the system. That means being able to answer questions such as:

- What guarantees does this component provide?
- What assumptions does it make about its environment?
- What happens when a dependency fails?
- Which operations can it perform, and with what permissions?
- How do we know that a new implementation preserves the properties we care about?
- Can we reproduce, investigate, and roll back a particular release?

These questions matter whether the code was written by a human, generated by an AI agent, or produced by a compiler. They also suggest that some engineering practices may become more important. Good boundaries, explicit contracts, meaningful tests, observability, and reproducible builds are valuable because they let us reason about systems without understanding every implementation detail at all times. The less predictable the implementation process becomes, the more we will need reliable ways of verifying its output.

## So, Should We Put `src/` in `.gitignore`?

Probably not, at least not literally and not for most of the systems we build today. Source code remains essential for debugging, auditing, security analysis, and understanding behavior that our specifications failed to capture. In many environments, keeping the exact source used to produce a release is also an important part of a reliable engineering process. Still, the joke points at something real.

What if the source code we maintain manually becomes a smaller part of the system? What if the things we version, review, and carefully design are increasingly the specifications, contracts, tests, policies, and tools that constrain how implementations are generated? What if reviewing the system becomes more important than reviewing every line? Maybe we won't put all our code in `.gitignore`. But in a world where generating code is cheap, we'll finally have to explain why so much of our engineering process still assumes that writing and reading it are the hardest parts of the job.