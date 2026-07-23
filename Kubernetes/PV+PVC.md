# Kubernetes PV & PVC

## Concept
- Pods are ephemeral by nature and can be destroyed or restarted at any time  
    &rightarrow; Since data inside a container vanishes when it dies, we need a way to persist data beyond the lifecycle of a single Pod
- PV (Persistent Volume): The actual piece of network-attached storage in the cluster provisioned by an administrator  
    &rightarrow; Represents a real storage resource (like AWS EBS, NFS, or local disk) that exists independently of any individual Pod
- PVC (Persistent Volume Claim): A request for storage by a user or Pod  
    - Developers specify the size and access modes
    - Kubernetes **automatically binds** it to a matching PV  
        &rightarrow; If there is no proper PV for pods, it will be pending forever...
- Pods consume storage by using the PVC as a volume  
    &rightarrow; This abstract layer allows developers to request storage without needing to know the underlying infrastructure details
- Access mode
    - RWO(Read Write Once): Only single node can read and write
    - ROX(Read Only Many): Various nodes can mount the volume with read-only authority
    - RWX(Read Write Many): Various nodes can mount the volume with read-write authority

## Thought
- Separating the infrastructure role (PV) from the application developer role (PVC) is a really elegant and decoupled design
- Since data remains safe in the PV even if the Pod restarts, mastering this concept is an absolute must for running stateful applications on K8s