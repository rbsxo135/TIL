# ECS(Elastic Container Service) & EKS(Elastic Kubernetes Service)

## Concept(Both)
- A fully managed container orchestration system
- Divided by a control plane(master node) and data plane(worker node)
- Worker node can be configured with Fargate or EC2 instance
    - Fargate
        - Serverless type
        - Worker nodes are hidden in AWS server  
        - We can only see the container from control plane
        - For worker nodes, we pay strictly for the vCPU, memory, and storage requested per task
        - **GPU is not supported**
    - EC2 instance
        - Actual ec2 instances are created by ECS or EKS
        - For worker nodes, we pay for the ec2 instances
        - If we choose an instance type that support GPU processor, we can allocate GPU resource to container

## ECS Concept
- AWS-native container orchestration service
- Uses AWS proprietary architecture instead of Kubernetes standards
- Much simpler, lighter, and faster to launch tasks &rightarrow; Less operational overhead compared to K8s
- Uses simple abstractions like **Task Definitions** and **Tasks/Services**
- No complex K8s objects like Pods or Deployments to manage
- Networking naturally uses AWS VPC and IAM roles attach directly to tasks

## EKS Concept
- A fully managed, standard CNCF-certified Kubernetes service
- Highly portable across on-premise, AWS, GCP, or Azure
- Zero vendor lock-in where the exact same YAML manifests can run on any standard K8s cluster
- Seamlessly integrates with Helm, ArgoCD, Prometheus, and Istio
- Managed Control Plane with flexible Data Plane options
- Basically AWS handles the control plane but we can make bastion host or OpenVPN server and directly access to the cluster

## Thought
- ECS is more lighter than EKS when we configure a cluster
- Since EKS is based on the kubernetes engine, it works same way in other cloud platform  
    &rightarrow; EKS could be used in **multi-cloud infrastructure**