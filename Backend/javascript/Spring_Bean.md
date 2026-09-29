# Spring Bean

## Concept
- A bean is any object whose **lifecycle is managed by the Spring IoC container** instead of being created with new by the class itself
- The container creates, configures, wires, and destroys beans, based on definitions it reads at startup
- This is what Dependency Injection actually is: the container looks up the beans a class needs and passes them in, rather than the class looking them up or constructing them itself
- Registering a bean
    - Component scanning: annotate a class with Component (or the more specific Service, Repository, Controller) and the container picks it up automatically
    - Explicit declaration: write a method annotated with Bean inside a class annotated with Configuration, the method's return value becomes the bean
- Getting a bean into another class
    - Constructor injection: the dependency is a constructor parameter, this is the recommended way since it makes the dependency explicit and required
    - Field injection: Autowired directly on a field, convenient but hides the dependency and makes testing harder
    - Setter injection: Autowired on a setter, used for optional dependencies
- Bean scope decides how many instances the container creates
    - singleton (default): one shared instance per container, reused everywhere it is injected
    - prototype: a new instance every time it is requested
    - request/session scopes exist for web applications, tied to an HTTP request or session
- Bean lifecycle
    - Container creates the instance, injects its dependencies, then runs any PostConstruct method
    - When the container shuts down, it runs any PreDestroy method before discarding the bean
    - This gives a hook for setup/teardown work (opening a connection pool, closing a resource) without the class needing to know when the container starts or stops

## Configure
- A typical mistake is expecting prototype-scope behavior from a singleton bean  
    &rightarrow; A singleton bean must not hold per-request mutable state in its fields, since that state is shared across every caller
- Circular dependencies between beans (A needs B, B needs A) fail at startup with constructor injection, which is actually useful  
    &rightarrow; It surfaces a design problem immediately instead of letting field injection paper over it
- Only classes registered as beans can receive injected dependencies  
    &rightarrow; A plain object created with new inside a bean does not get its own fields auto-wired, since the container never manages it

## Thoughts
- Before this it was not clear why Autowired ever "just works", the missing piece was that the container already knows about every bean before any of my code asks for one
- Comparing bean scope to a plain new in Java: new always gives a fresh object, while a singleton bean behaves closer to a manually written static instance, except the container also handles its dependencies and lifecycle
- Constructor injection being "recommended" makes much more sense once I saw that it turns a missing dependency into a startup failure instead of a null pointer exception deep in some unrelated request
- This ties directly into the Controller-Service-Repository structure from the Spring Boot note  
    &rightarrow; Each layer is a bean, and the container is what actually connects Controller to Service to Repository at runtime
