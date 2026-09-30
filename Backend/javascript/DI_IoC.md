# DI and IoC

## Concept
- IoC (Inversion of Control) is a general design principle, not something Spring invented
    - Traditional flow: a class controls its own dependencies, creating them itself with new and deciding when/how
    - Inverted flow: control over creating and wiring dependencies moves outside the class, to a container, a factory, or a composition root  
        &rightarrow; The class only declares what it needs, it no longer decides how that need gets satisfied
- DI (Dependency Injection) is the specific technique most commonly used to achieve IoC
    - A dependency is passed into an object from the outside instead of the object creating or looking it up itself
    - Three forms: constructor injection, field injection, setter injection (constructor injection makes the dependency explicit and required, the other two are more implicit)
- Why invert control at all
    - Loose coupling: a class depends on an abstraction rather than constructing a concrete implementation itself, so the implementation can be swapped without touching the class
    - Testability: a mock or stub can be substituted at injection time, since the class never hardcodes how it obtains the real dependency
    - Centralized wiring: object creation and wiring logic lives in one place instead of being duplicated inside every class that needs the same dependency
- IoC does not require a framework
    - Manual DI: pass dependencies through constructors by hand and wire everything together in one place (a composition root), usually near the application's entry point
    - A DI framework (Spring's IoC container on the Java side, something like InversifyJS or NestJS's own container on the JavaScript side) automates this wiring at scale, but the underlying idea works without one
- How this connects to a bean container
    - A bean and its IoC container are one concrete implementation of these ideas: the container holds the object graph, reads bean definitions, and performs DI to satisfy each bean's dependencies
    - IoC and DI are the general principle, the bean container is just the mechanism that automates it in a Spring application

## Thoughts
- Manual DI (passing dependencies through a constructor by hand, no framework at all) made the whole idea click before any Spring-specific vocabulary did  
    &rightarrow; Spring's container is only automating something that is possible, if tedious, without it
- Testability is the benefit that feels most concrete day to day  
    &rightarrow; Once a class only receives a dependency instead of constructing it, swapping in a mock stops requiring any change to the class itself
- Seeing DI as separate from the Bean/container mechanics (from an earlier note) helped separate "what problem is this solving" from "how does Spring happen to solve it"
