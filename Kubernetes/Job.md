# Kubernetes Job

## Concept
- General pods are designed to run continuously (ex. web servers)  
    &rightarrow; If they exit, k8s considers it a failure and restarts them
- But some tasks need to run until completion and then stop (ex. batch processing, data backup)  
    &rightarrow; We use "Job" resource for these finite tasks
- Job creates one or more pods and ensures that a specified number of them successfully terminate
    - Can be configured for parallel execution  
        &rightarrow; `parallelism` defines how many pods run at once, `completions` defines total successful runs needed
    - If a pod fails before completion, the Job controller automatically retries based on the `backoffLimit` rule
- Once the task succeeds, the pods enter a Completed state  
    &rightarrow; They stop consuming CPU/Memory resources but keep logs available for debugging

## Thought
- It is highly useful for automated cron-like tasks or heavy database migrations that don't need to run 24/7
- The fact that it manages the retry logic automatically saves a lot of custom scripting effort for batch processing