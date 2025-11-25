---
layout: post
title:  "Dependency injection patterns in Swift"
description: ""
date:   2025-11-25 15:00:00 +0200
categories: software-development
keywords: swift, dependency injection, di, design patterns
tags: swift programming software-development
image: "assets/2025-11-25/cover.jpeg" # Image for RSS
comments: true
---

**One of the most useful patterns in software development — and one that is available in many languages, not just Swift — is dependency injection. When I first learned about it a few years ago, I started using it everywhere it's possible. It's a simple idea with a surprisingly big impact. Here's why it's worth mastering.**

![Contemplating my code before morning coffee]({{site.url}}/assets/2025-11-25/cover.webp)

## Why is it so useful?

One of the biggest advantages of using dependency injection is that it makes our code immediately more testable. Even in projects full of singletons, we can break apart large chunks of tightly coupled code into smaller, more loosely coupled components. Our implementations rely more on protocols (interfaces) rather than concrete classes, making it easier to swap or replace them.

By depending on abstractions rather than concrete implementations, each component can focus solely on its own responsibilities, without knowing the details of how other parts of the system are managed. This makes it easier to reuse components across different parts of an app. We can easily replace services with mocks during testing or switch implementations when requirements change.

## Simple example

Imagine that we use in our `ViewModel`, a couple of services which are singletons. Instead of referencing them directly in the method definition like this:

```swift
func makeUserHappy() {
    let currentUser = UserService.shared.currentUser
    PremiumService.shared.grantSuperPowers(to: currentUser)
    AdService.shared.removeAds()
}
```

We can move references outside of the method:

```swift
class ExampleViewModel {
    private let userService = UserService.shared
    private let premiumService = PremiumService.shared
    private let adService = AdService.shared

    func makeUserHappy() {
        let currentUser = userService.currentUser
        premiumService.grantSuperPowers(to: currentUser)
        adService.removeAds()
    }
}
```

The next step of moving it away would be to pass these references to the initializer:

```swift
class ExampleViewModel {
    private let userService: UserService
    private let premiumService: PremiumService
    private let adService: AdService

    init(userService: UserService = .shared, 
         premiumService: PremiumService = .shared,
         adService: AdService = .shared) {
            self.userService = userService
            self.premiumService = premiumService
            self.adService = adService
    }

    func makeUserHappy() {
        let currentUser = userService.currentUser
        premiumService.grantSuperPowers(to: currentUser)
        adService.removeAds()
    }
}
```

It's already looks much better. Now we can create mock variants of these classes for our tests using inheritance like this:

```swift
class MockUser: UserService {
    override var currentUser: String {
        User(id: -1, name: "Bob")
    }
}

class MockPremiumService: PremiumService {
    private var superUsers: [Users]
    override func grantSuperPowers(to: User) {
        user.powers.append(.premiumPowers)
        superUsers.append(user)
    }
}
```

Inheritance can help us replace the implementation of exposed service methods, but the rest of the underlying logic remains the same. This can lead to serious side effects, especially if the internal logic of our service classes is complex. A much better approach is to rely on protocol conformance instead of concrete classes in our ViewModel. 

Taking this into consideration, we can end up with something like this:

```swift
class ExampleViewModel {
    private let userService: UserServiceProtocol
    private let premiumService: PremiumServiceProtocol
    private let adService: AdServiceProtocol

    init(userService: UserService = UserService.shared, 
         premiumService: PremiumService = PremiumService.shared,
         adService: AdService = AdService.shared) {
            self.userService = userService
            self.premiumService = premiumService
            self.adService = adService
    }

    func makeUserHappy() {
        let currentUser = userService.currentUser
        premiumService.grantSuperPowers(to: currentUser)
        adService.removeAds()
    }
}
```

Then we can implement MockUserService and the real UserService independently, without needing to mix parts of the real service into the mock — which is exactly what tends to happen when relying on inheritance.

```swift

// Protocols
protocol UserServiceProtocol {
    var currentUser: User { get }
    func fetchUserData() async
}

protocol PremiumServiceProtocol {
    func grantSuperPowers(to user: User)
    func purchase(_ product: Product)
}

// Real implementations

class UserService: UserServiceProtocol {
    
}
```
