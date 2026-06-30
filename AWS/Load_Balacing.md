# Load Balancing  

## Concept
- Distribute network traffic to multiple instances
- Available to **scale-out** through load balancing  
	&rightarrow; Simply add instances to the network
- Load balancing algorithm
	- Round-Robin, Least Connection, Response Time
		&rightarrow; Do not gurantee that a client keeps connected to the specific server after a session established
	- Hash  
		&rightarrow; Gurantee that a client keeps connected to the specific server after a session established

## ELB(Elastic Load Balancer)
- Load balacing solution of AWS
- Support scalability, security options, high availability, health check, sticky session
- 3 modes that ELB could be run  
	&rightarrow; ALB, NLB, CLB

## ALB(Application Load Balancer)
- Working on Applicaiton Layer(L7)
- HTTP, HTTPS load balancing
- Load balance upon services

## NLB(Network Load Balancer)
- Working on Trnasport Layer(L4)
- Tracking IP and port only
- Recommanded for TCP traffic load balancing
- Short latancy and High throughput

## Thoughts
- One of the most important solution in AWS
- Essential in high availability config and auto scaling
- **Load balancer can have elastic IP** 
