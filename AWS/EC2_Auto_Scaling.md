# EC2 Auto Scaling

## Concept
- In a broader sense, auto scaling means a service that automatically **scale-out** by create instances from the preset or **scale-in** by terminating instances upon according to auto scaling policy  
    &rightarrow; AWS Auto Scaling Group, ECS, EKS are included  
    &rightarrow; This page is about AWS Auto Scaling Group
- The preset in EC2 Auto Scaling is **Launch Template**
- We can set desired capacity and scaling limit(min qnt and max qnt of instances)
 
## Configure
- Launch Template
    - Launch template needs an EC2 image as a base of instance
    - EC2 image can be selected from AMI or genereated from running instance
    - Security group, key pair, instance type &rightarrow; also needed to be configured
    - Thesedays, launch template is **only for auto scaling group**  
        &rightarrow; Subnet, AZ should not be selected  
        &rightarrow; Terminate/Stop option should be disabled
- Network
    - Set networks that EC2 instances will be deployed
    - We can target multiple AZ &rightarrow; High Availability
- Auto Scaling Policy
    - Target tracking scaling policy
        - We can set target criteria and AWS automatically scale-out/scale-in to meet that criteria
        - ASGAverageCPUUtiliztion, ASGAverageNetworkIn, ASGAverageNetworkOut, ALBRequestCountPerTarget, ...
    - Step Scaling Policy
        - Associate with CloudWatch alarm
        - Scale-out/scale-in after CloudWatch alarm
    - Scheduled Scaling
        - Scaling based on prescheduled timeling
    - Predictive Scaling
        - AWS analyzes CloudWatch data  
            &rightarrow; Predict traffic and proactively scale-out/scale-in

## Thoughts
- Under micro-service architecture, many services are configured with ECS, EKS  
    &rightarrow; But still there are cases that we need to configure EC2 and EC2 Auto scaling group
- Auto scaling is one of the most important services in AWS, essense of cloud engineering
- Since auto scaling group can be connected to ELB, auto scaling is also important in high availablity
