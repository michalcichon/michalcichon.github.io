---
layout: post
title:  "Algorithms + Data structures = Programs"
description: "I have been working as a contractor software developer for many years. In my job I have a lot of what I enjoy the most in my professional life - crème de la crème of software development - writing programs. This process is almost never a single shot of typing what was thought, running, testing and committing into the repository. It is obviously not as there are always nuances of what should be done..."
date:   2021-03-28 09:00:00 +0200
categories: software-development
keywords: code review, code evaluation, recruiting software developers
tags: programming processes
thumbnail: code.png
image: "assets/thumbnails/code.png" # Image for RSS
background: "#f05138"
comments: true
---

**I have been working as a contractor software developer for many years. In my job I have a lot of what I enjoy the most in my professional life - *crème de la crème* of software development - writing programs. This process is almost never a single shot of typing what was thought, running, testing and committing into the repository. It is obviously not as there are always nuances of what should be done, any kind of limitations and as always expectations which can change dynamically.**

The process or building a new logic in our programs is never a linear process as it has been already mentioned thousands times across articles, books and blog posts like this you are reading at the moment. Fortunately I don’t want to start this topic here all over again. This time I would like to focus on something slightly different but still not something that floats totally separately to that *crème de la crème*. That thing is evaluating someone else code. And what I mean here is not a code review we do for our friendly coworkers we know inside out with all their weird habits. This time I would like to step back for a minute and think about evaluating code for candidates, people we never known or companies that need to evaluate the state of their software to decide if they should invest more into quality.

[Nicklaus Wirth](https://en.wikipedia.org/wiki/Niklaus_Wirth) coined that phrase about the relation of programs, algorithms and data structures in 1976. It was 45 years ago but such clever foundations like this would probably never get old. If think about it for a second it is obviously always true. Every design patters, every function, method and spaghetti code you just wrote to scrape some silly thing from the internet can be divided into two categories: data we manipulate and the logic that is used to do that manipulation. Simple as that.

# Git (almost) never lies

If the code I get is distributed to me with a git repository then I usually start my investigation from the git history. Don't get me wrong here, I don't mean that I check timestamps to calculate the velocity or something that crazy. The history is useful to learn more about the candidate's process of thinking and reasoning. Maybe they had some brilliant idea that halfway turned out to no be so cool. Maybe they tried something so hard but gave up at some point. These things can be a source of some nice follow up when we discuss the solution later in the interview. 

# Global state and friends

Encapsulation was one of the basic concepts and earliest concepts of Object Oriented Programming, appeared in Simula 62 (59 years ago!) but lexical scoping so the idea that a block of code can hide its private variable is a concept that appeared even earlier in ALGOL 60 (61 years ago, WOW!). Globally mutable state should be avoid as we should prefer architecture composed of objects with strictly defined responsibilities. Any global state should be a red light and needs to be investigated, as this is a definitely anti-pattern in OOD. That's why the second thing I check in the source code is if it has any global variable that can be accessed and mutated with any other object, what side effects it can cause etc.

```swift
var secretCollection: [String] = []
class BrilliantService {
    func doSomethingImportant() {
        let secretElement = SecretElementProvider.shared.generateSecretElement()
        secretCollection.append(secretElement)
    }
}

class AwfulService {
    func doSomethingUnexpected() {
        someVeryImportantThing()
        if secretCollection.count > 16 {
            secretCollection.removeFirst()
        }
    }
}
```

Obviously both classes are awful, and as you can see side effect can happen late (in this silly example after we add more than 16 elements to our globally available collection) so it can be difficult to spot the problem. Imagine if we have an application with thousand of classes using that `secretCollection` directly.

As you can see there is used also one more object usually recognized as an ant-pattern, a singleton. A bad press is mainly because it creates a globally available object than can be access and mutate anywhere in our source code. However it used to be intensively used in mobile development to save resources (I remember when we developed a banking app in 2010s we had to be careful to not create too many amount formatters when we wanted to present hundreds of transactions in a single table view). Today as brand new phones have thousand times better specs than personal computers a decade ago, it lost a bit its relevance, but still is quite useful. However, it needs to be used carefully. Other red light can be: a class with all methods static, a class with all attributes public. When it comes to testing, as we can't really test global state agains all possible use cases, we usually can make at least the code that utilize singleton testable.

```swift
class NotTestable {
    func doSomething() {
        let elements = DatabaseService.shared.getAllElements()
        ElementsManager.shared.update(elements.filter({ $0.isActive }))
    }
}

class ALittleBitMoreTestable {
    //dependencies
    let databaseService: DatabaseServiceProtocol
    let elementsManager: ElementsManagerProtocol

    convenience init() {
        self.init(databaseService: databaseService, elementsManager: elementsManager)
    }

    init(databaseService: DatabaseServiceProtocol, elementsManager: ElementsManagerProtocol) {
        self.databaseService = databaseService
        self.elementsManager = elementsManager
    }

    func doSomething() {
        let elements = databaseService.getAllElements()
        elementsManager.update(elements.filter({ $0.isActive }))
    }

}
```

As you can see we can use a basic dependency injection pattern to make the code more testable (we can exchange our implementations of both protocols with mock classes in our tests).

# Threads and queues

With Swift and Objective-C standard libraries we get a lot of useful tools to deal with concurrency and asynchronous processing with is quite important when we deal with asynchronous natures of networking and UI events. Unfortunately many developers have still issues with using them and understand concepts like thread safety, queues, etc. Usually we can easily spot something matching this pattern:

```swift
DispatchQueue.main.async {
    // Here goes some code I don't really undestand
}
```

It can be a code that modifies UITableView stack, that deals with some collection that is accessed from multiple threads etc. Dispatching to the main queue is in these cases usually not a good idea.

# Duplicated & unused code

If there are some places with duplicated code, a good question would be why the author of that code decided to leave it as it is. That can tell us a lot about whether the architecture of the solution is thoughtful. If it is only a sake of extracting few parameters to new method that could cover all cases when the code was duplicates, then it probably is not a huge problem. But if there is a lot of duplicates it might indicate more underlaying problems.

Similarly, when we see methods that are unused, we can use them as an additional story teller about how the solution was handler by the author. Maybe there is commonly known pattern that was used and then modified to fit into the solution but some helper method wasn't removed.

# Consistency

Inconsistency in the naming can tell us if the code was written with experience developer or someone without prior experience. Someone who is experienced would tent to use a consistent naming strategy and project structure that has a thoughtful design.

When it comes to application architecture, we would like to see not only new fancy design patterns like VIPER or MVVM being used, but to see why they were used, what are the underlying concepts behind them. We use architecture to solve real problems like layers separation, data security, to improve data flow etc. and not only because we need to delight the academia. 

# Data structures & algorithms

After we investigated the project on high level, trying to spot inconsistencies we can go deeper and analyze how the logic works, what is the data flow throughout the whole project. A red light here could be reinventing commonly known algorithms, reimplementing SDK methods, using inefficient data structures (for example Array instead of Set when we need to store unique objects and we need quick look up).

```swift
func getAllUniqueActiveElements1() -> [Item] {
    var registry = [Item]()
    let now = Date()
    let array1 = dataProvider1.filter({ $0.lastAccessDate > now })
    let array2 = dataProvider2.filter({ $0.lastAccessDate > now })
    let allElements = array1 + array2
    for item in allElements {
        if !registry.contains(item) {
            registry.append(item)
        }
    }
    return registry
}

func getAllUniqueActiveElements2(limitDate: Date) -> [Item] {
    var registry = Set<Item>()
    let array1 = dataProvider1.filter({ $0.lastAccessDate > now })
    let array2 = dataProvider2.filter({ $0.lastAccessDate > now })
    registry.formUnion(array1+array2)
    return Array(registry)
}
```

Sometimes a not optimal solution is good enough and it can give another opportunity to discuss the implementation details.

# Mobile first

We don't implement things only for sake of doing it. Our apps do amazing things not only because we know how to implement the most efficient algorithm or because our architecture is extendable and clean. Our apps do amazing things because they can utilize unique features of mobile devices and the SDKs we get from Apple engineers. If the app utilizes push notifications, it is good to check how the push tokens are registered, what is the data flow of notifications inside the application, if any notification extension is used and how. In almost every app, how the communication between table/collection view and its data sources is designed, how the delegates are invoked and how the state is managed? What is inside `viewDidLoad` and `viewWillAppear` methods? These questions should be always answered.

# Conclusions

Code evaluation is not an easy task. We as developers are accustomed to different practices and styles in our code bases and usually it is not easy to say what is the best solution for a given problem. However a thorough analysis of the source code can be a good starting point for a more in-depth discussion about implementation details and can be useful source of knowledge about what is someone's level.