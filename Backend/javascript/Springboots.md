# Spring Boot Basic Concept

## Concept
- A framework built on top of the Spring Framework that removes most of the manual setup
- Opinionated defaults (**convention over configuration**)
    - Auto Configuration scans the classpath and wires up beans automatically (a DataSource bean is created just by adding a JDBC driver dependency)
    - Starter dependencies (spring-boot-starter-web, spring-boot-starter-data-jpa, ...) bundle a whole feature's dependencies into one line
    - No XML configuration required, almost everything is Java config or annotations
- Embedded server
    - Ships with an embedded Tomcat (or Jetty/Undertow) inside the jar  
        &rightarrow; No separate WAS installation, the application itself is runnable with java -jar
- IoC container and Dependency Injection
    - Objects (beans) are created and wired by the Spring container instead of being newed up manually
    - Dependencies are received through the constructor rather than fetched by the class itself
- Layered architecture
    - Controller: receives HTTP requests, delegates to Service, returns a response
    - Service: business logic
    - Repository: data access, talks to the database
    - Domain/Entity: the model classes, often mapped to DB tables with JPA
- Key annotations
    - SpringBootApplication marks the entry point and turns on auto configuration and component scanning
    - RestController and RequestMapping (GetMapping, PostMapping, ...) define HTTP endpoints
    - Service, Repository, Component mark a class as a bean, mainly for documentation of its role
    - Autowired (or constructor injection) asks the container to inject a bean

## Configure
- Spring Initializr generates the project skeleton with the chosen build tool and dependencies
- Build tool is Gradle or Maven, both support wrapper scripts (gradlew, mvnw) so the exact version is checked into the repo
- Configuration lives in application.yml (or application.properties)
    - DB connection info, server port, logging level, custom properties
    - Profile-specific files (application-dev.yml, application-prod.yml) switch with spring.profiles.active
- Run with the wrapper (./gradlew bootRun) during development, or package a jar and run it with java -jar for deployment

## Thoughts
- Coming from plain Servlet/JSP or Express, the biggest shift is **not writing the wiring code myself**  
    &rightarrow; The container decides object lifecycle and injects dependencies, so testing becomes easier since a mock can be substituted for a real dependency
- Auto Configuration feels like magic until something doesn't wire up as expected  
    &rightarrow; When a bean isn't created, the debugging skill is knowing what triggers auto configuration (a dependency on the classpath, a property being set), not just reading my own code
- The embedded server was a nice surprise after fighting with a separate Tomcat/WAS setup for the Apache practice notes  
    &rightarrow; java -jar being enough to deploy removes an entire category of environment mismatch problems
- The layered structure (Controller/Service/Repository) maps directly onto the DTO vs Domain distinction from an earlier note  
    &rightarrow; Controller talks in DTOs, Service converts to and from the Domain, Repository persists the Domain
