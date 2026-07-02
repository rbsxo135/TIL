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
    - EC2 image can be selected from AMI
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

## ELB + EC2 Auto Scaling Pracitce Troubleshooting
- After configured EC2 Auto scaling group with ELB healthcheck enabled, a problem happened  
    &rightarrow; Instances kept creating and terminating since healthcheck failed
- I found that I misconfigured healthcheck API. So I fixed it and recreated AMI  
    &rightarrow; The problem was unsolved
- I put both a test instance and an instance created by auto scaling, then I found healthcheck of the test instance succeeded  
    &rightarrow; I scoped down that the problem was come from auto scaling group
- I found that a wrong AMI image was selected for the launch template...  
    &rightarrow; After fixing it, the problem was solved
- From this troubleshooting
    - I think that it was a pretty good choice to put a updated instance into a target group to check whether the auto scaling group was working well
    - A tiny misconfiguration can affect the whole system  
        &rightarrow; We need a good CI/CD!!

## Thoughts
- Under micro-service architecture, many services are configured with ECS, EKS  
    &rightarrow; But still there are cases that we need to configure EC2 and EC2 Auto scaling group
- Auto scaling is one of the most important services in AWS, essense of cloud engineering
- Since auto scaling group can be connected to ELB, auto scaling is also important in high availablity
