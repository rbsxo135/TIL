# DTO (Data Transfer Object)

## Concept
- An object whose only job is to **carry data between layers or across a boundary**
    - Controller &harr; Service, Service &harr; external API, server &harr; client
- Contains **fields + getters/setters only**
    - No business logic, no behavior
    - Often immutable (all fields set once via constructor, or a Java `record`)
- Decouples the API/response shape from the internal model
    - The client sees only what the DTO exposes
    - Internal fields (password, internal IDs, audit columns) are never leaked
- Shapes data for a specific use case
    - Flatten nested structures, rename fields, merge data from multiple sources
    - Request DTO and Response DTO are usually separate classes
- Reduces round trips
    - Bundle everything a single call needs into one object instead of many fine-grained calls

## DTO vs Domain (Entity)
| | DTO | Domain / Entity |
|---|---|---|
| Purpose | Transfer data across a boundary | Model business concepts and rules |
| Contents | Fields + accessors only | Fields + **business logic / invariants** |
| Lifetime | Short-lived, per request/response | Long-lived, mapped to persistence (JPA `@Entity`) |
| Depends on | Nothing (plain object) | Domain rules; ideally no web/framework concerns |
| Changes when | The API contract changes | Business requirements change |
| Validation | Format checks on input (`@NotNull`, `@Size`) | Domain invariants ("balance can't go below 0") |

- **Why keep them separate**
    - Exposing an Entity as the API response couples the DB schema to the public contract  
        &rightarrow; A column rename or a new relation can break clients or trigger unwanted lazy loading / serialization
    - Binding request JSON straight onto an Entity lets a client set fields it should never touch (mass assignment)
    - The domain can evolve its internal structure freely as long as the mapping to the DTO is updated

## Configure
- Mapping between the two happens in the service (or a dedicated mapper)
    - Manual: `new UserResponse(user.getId(), user.getName())`
    - Library: MapStruct (compile-time, no reflection), ModelMapper (runtime)
- Typical flow
    - Request DTO &rightarrow; validate &rightarrow; convert to Domain &rightarrow; run business logic / persist
    - Domain &rightarrow; convert to Response DTO &rightarrow; serialize to JSON
- Keep conversion out of the controller and out of the Entity itself  
    &rightarrow; The Entity should not import response classes

## Thoughts
- A DTO feels like boilerplate on a small project, but it is really a **contract boundary**  
    &rightarrow; The moment an Entity leaks to the client, every DB change becomes a breaking API change
- Splitting Request and Response DTOs looks redundant, but they change for different reasons and rarely stay identical for long
- `record` in modern Java removes most of the boilerplate complaint  
    &rightarrow; Immutable, concise, and clearly "just data"
- The mapping code is the price of decoupling; a mapper library hides it but the boundary still needs to be designed deliberately
