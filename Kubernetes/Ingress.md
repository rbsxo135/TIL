# Kubernetes Ingress

## Concept
- An API object that manages external access to the services in a cluster, typically http/https traffic  
- Operates at L7 to provide smart routing rules  
    &rightarrow; Allows routing traffic to different internal services based on the request host or path
- Handles **TLS/SSL** directly at the edge  
- Requires an **Ingress Controller** to actually function  
    &rightarrow; The Ingress resource itself is just a set of rules, so we need to configure ingress controller
- Ingress Controller is the actual implementation engine that executes the routing rules defined by the Ingress resource  
    &rightarrow; There are nginx, traefik, or HAProxy for the ingress controller

## Thought
- Domain mapping and SSL configuration are fundamental for any web service, and Ingress lets us handle that complex reverse proxy setup in a pure, declarative K8s way
- Instead of exposing multiple services using NodePort or LoadBalancer, it provides a consolidated entry point
- In the cloud architecture, SSL configuration could be done with ACM
    - If we make the cloud service to handle SSL, we can save resource for k8s architecture
    - If we make k8s to handle SSL, we can include SSL configuration as a part of k8s orchestration  
        &rightarrow; We can manage it with Helmchart and ArgoCD