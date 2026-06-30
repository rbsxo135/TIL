# Multi-stage_Dockerfile  

## Concept
- One way to Configure Dockerfile
- Make multiple stages and **choose specific Docker image** for each stage

## Configure
- FROM phrase means beginning of the stage
- Sholud use FROM {Docker image} AS {Stage name}
    &rightarrow; Then we can use Stage name when we configure next stage
- We can give --from option when we write COPY phrase to access to the previous stage
    &rightarrow; --from={previous Stage name}

## Thoughts
- We can use various Docker images to build single Docker container
- Well-known usage is separting building stage and running stage
    &rightarrow; We can choose better(lighter, more stable...) image for the container
- It is close to an "Option", not a "Method"