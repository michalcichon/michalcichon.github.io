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

**One of the most useful patterns in software development — and one that is available in many languages, not just Swift — is dependency injection. When I first learned about it over a decade ago, I started using it everywhere possible. It’s a simple idea with a surprisingly big impact. Here’s why it’s worth mastering.**

![Contemplating my code before morning coffee]({{site.url}}/assets/2025-11-25/cover.webp)

## Why is it so useful?

One of the biggest advantages of using dependency injection is that it makes our code immediately more testable. Even in projects full of singletons, we can break apart large chunks of tightly coupled code into smaller, more loosely coupled components. Our implementations rely more on protocols (interfaces) rather than concrete classes, making it easier to swap or replace them.

By depending on abstractions rather than concrete implementations, each component can focus solely on its own responsibilities, without knowing the details of how other parts of the system are managed. This makes it easier to reuse components across different parts of an app. We can easily replace services with mocks during testing or switch implementations when requirements change.

## A basic example of how to use initializer-based dependency injection

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

It’s already looks much better. Now we can create mock variants of these classes for our tests using inheritance like this:

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

    var currentUser: User {
        persistence.currentUser
    }

    func fetchUserData() async {
        if let user: User = try? await network.request("/user/me") {
            persistence.saveUser(user)
        }
    }
}

class PremiumService: PremiumServiceProtocol {
    
    func grantSuperPowers(to user: User) {
        var updated = user
        updated.isPremium = true
        database.saveUser(updated)
    }

    func purchase(_ product: Product) async throws {
        try await storeKit.startPurchase(productId: product.id)
    }
}

// Mock implementations

class MockUserService: UserServiceProtocol {

    var currentUser: User = User(id: "test-id", name: "TestUser", isPremium: false)
    var fetchUserDataCalled = false

    func fetchUserData() async {
        fetchUserDataCalled = true
        // Instant predictable mock result
        currentUser = User(id: "mock-123", name: "MockUser", isPremium: true)
    }
}

class MockPremiumService: PremiumServiceProtocol {
    var grantedUsers: [User] = []
    var purchasedProducts: [Product] = []

    func grantSuperPowers(to user: User) {
        grantedUsers.append(user)
    }

    func purchase(_ product: Product) {
        purchasedProducts.append(product)
    }
}

```

What we have here is called **initializer-based dependency injection** because we pass our dependencies through the initializer. In my opinion, it’s the best basic way to implement dependency injection for iOS applications. It’s a simple concept that anyone can learn quickly. It offers excellent testability: all dependencies are injected at object creation, so tests can consistently provide mocks or stubs. There’s no risk of uninitialized dependencies, which makes tests more reliable.

It’s also characterized by strong modularity. Components are fully decoupled from concrete implementations, and each dependency is clearly defined in the initializer, making it easy to swap implementations.

However, there are several other ways to handle dependency injection, which I will briefly explain in the next sections.

## Property injection 

```swift
class ExampleViewModel {

    // Dependencies are optional until injected
    var userService: UserServiceProtocol!
    var premiumService: PremiumServiceProtocol!
    var adService: AdServiceProtocol!

    func makeUserHappy() {
        let currentUser = userService.currentUser
        premiumService.grantSuperPowers(to: currentUser)
        adService.removeAds()
    }
}

// Somewhere else 
let vm = ExampleViewModel()
vm.userService = UserService.shared
vm.premiumService = PremiumService.shared
vm.adService = AdService.shared
```

This kind of dependency injection is usually seen in views containing IBOutlets, or in cases where we depend on view components that need to be initialized first. It’s more flexible because we don’t have to pass dependencies through the initializer—the injection timing is more flexible. However, this comes at a cost: there’s a risk of calling dependencies before they are injected, which can crash the app. It’s also harder to enforce correctness. That’s why I prefer the initializer-based dependency injection described in the previous section.

It can be handy for testing, as we can easily swap dependencies after object creation, but it’s also easier to break and make our tests flaky.

It’s not optimal in terms of modularity because objects rely on external code to inject dependencies before use. The contract of required dependencies is less explicit, making it easier to misuse the component.

In my opinion, code clarity can also suffer because readers of our source code must track when and where dependencies are injected.

## Method injection 

```swift
class ExampleViewModel {
    func makeUserHappy(
        userService: UserServiceProtocol,
        premiumService: PremiumServiceProtocol,
        adService: AdServiceProtocol
    ) {
        let currentUser = userService.currentUser
        premiumService.grantSuperPowers(to: currentUser)
        adService.removeAds()
    }
}

// Usage:
let vm = ExampleViewModel()
vm.makeUserHappy(
    userService: UserService.shared,
    premiumService: PremiumService.shared,
    adService: AdService.shared
)
```

This kind of dependency injection is more functional. We don’t need to store our dependencies as properties, and it’s also easy to test methods implemented this way. On the other hand, calling these methods can become quite verbose. It’s also not very optimal if we want to call the method from many different places. In that case, the problem of keeping everything consistent is simply delegated elsewhere, and we still need to manage it somewhere.

It’s very testable. Each method call receives its dependencies explicitly, making it easy to test in isolation. However, it may take some extra effort to setup dependencies in our tests. 

In terms of modularity, we also can find a strong advantage of this approach. Objects don’t need to store dependencies as properties, reducing hidden state. But on the other hand, it can become cumbersome if multiple methods need the same dependencies repeatedly.

## Summary

There are three basic approaches to dependency injection in Swift. What do you think about these approaches? Do you use dependency injection in your projects? Or maybe you use a dependency injection framework—if so, what do you think about these lightweight approaches?

Regardless of the approach you choose, the key is to make your code more modular, testable, and maintainable. Even lightweight dependency injection can significantly improve the architecture of your Swift projects without adding unnecessary complexity. Experiment with different techniques and see which one fits your team and project style best.