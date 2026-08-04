# Terraform Module Concept

## Concept
- Modularization & Reusability
    - Groups multiple resources into a single reusable unit
    - Avoids code duplication (DRY principle) across different environments (Dev, Staging, Prod)
- Encapsulation & Abstraction
    - Hides internal implementation details and exposes only necessary inputs and outputs
    - Teams can consume modules like black boxes without worrying about underlying resource configurations
- Module Structure
    - Root Module: The main entry point where terraform apply is executed
    - Child Module Called by the root module using a module block
    - Standard directory layout: main.tf, variables.tf, outputs.tf

## Configure
- Module Declaration
    - Call a module via module "name" { source = "..." } block in the root module
    - source parameter can point to a local path (./modules/vpc) or remote registries (Git, Terraform Registry)
- Inputs & Outputs
    - variables.tf: Defines arguments accepted by the module
    - outputs.tf: Exposes resource attributes generated inside the module so other resources/modules can consume them via module.<MODULE_NAME>.<OUTPUT_NAME>

## Thought
- Modules are crucial for managing large-scale infrastructure systematically
    - &rightarrow; Without modules, root configurations quickly turn into unmaintainable spaghetti code
- Strict parameter design is essential for flexibility
    - &rightarrow; Over-parameterizing makes modules too complex to use, while hardcoding values destroys reusability; striking the right balance in variables.tf is key
- State management extends to module scope
    - &rightarrow; Renaming or refactoring a module block in code without updating state (terraform state mv) can trigger unintended resource destruction and recreation