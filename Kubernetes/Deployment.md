# Kubernetes Deployment

## Concept
- ReplicaSet controls the number of pods, but it lacks update management  
    &rightarrow; We use "Deployment" resource to manage applications seamlessly
- Deployment is a higher-level controller that manages ReplicaSets
    - It handles rolling updates and rollbacks without downtime  
        &rightarrow; Creates a new ReplicaSet and gradually moves pods from the old one to the new one
    - If a deployment fails, we can easily rollback to a previous revision  
        &rightarrow; Keeps track of version history automatically
- By defining the desired state in the Deployment YAML, the Deployment controller works to maintain that state  
    &rightarrow; If a node dies, it spins up replacement pods on healthy nodes to match the replica count

## Thought
- It feels like the actual standard way to deploy applications in k8s since managing raw ReplicaSets or Pods is too risky
- The automation of rolling updates is super powerful because it eliminates the manual stress of zero-downtime deployments