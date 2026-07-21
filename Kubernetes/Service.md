# Kubernetes Service

## Concept
- IP addresses for each pods are not static  
    &rightarrow; Allocated by DHCP
- But we need static IP for a specific service(ex. web service)  
    &rightarrow; We can use resource "Service"
- Service is a kind of middleware
    - It has static IP called "ClusterIP"  
        &rightarrow; User request should be sent to this IP
    - Service distributes these traffic to pods that match selector label
    - We can also set "NodePort"  
        &rightarrow; Every pods that match selector label opens that port
- When a Service is created, kube-api-server notify to kube-proxy servers located in each nodes  
    &rightarrow; Then kube-proxy server list a rule in **os level iptable**

## Thought
- It seems essential component of k8s since most of web service need its functions
- Especially it can do load balancing, proxy stuff