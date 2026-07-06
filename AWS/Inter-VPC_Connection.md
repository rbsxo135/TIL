# Inter-VPC Connection  

## Concept
- Connect two or more diffrent VPCs
- Connecting VPCs means that each VPC can see **others' subnet**  
	&rightarrow; Available to be routed through Inter-VPC connection
- Just making connection doesn't change anything. We need to configure **routing table**

## VPC Peering
- 1:1 Connection Between VPCs
- If we want to make connection betwenn three or more VPCs thorugh VPC peering, we need to make a **mesh connection**  
	&rightarrow; Make VPC peering for every combination of VPCs
- We can connect VPCs in diffrent regions
- Only traffic between diffrent AZ incurs cost  
	&rightarrow; Just making VPC peering doesn't incur cost

## TGW(Transit Gateway)
- Multiple VPCs are connected to the TGW
- Each VPC can communicate through TGW
- We can connect VPCs in diffrent regions  
	&rightarrow; Reason why TGW is essential for multi-region architecture
- TGW is fully paid service  
	&rightarrow; Just making TGW incurs cost

## Multi-VPC Architecture Practice Troubleshooting
- I configured Multi-VPC Architecture with VPC peering
- I configured VPC peering, routing table
- I found that a EC2 in a public subnet pings well but a EC2 in a private subnet is not reachable  
	&rightarrow; Since VPC peering is not matter with whether a instance is public or private, it is a problem
- I didn't consider AWS SDN mechanism
- I didn't make **explicit association** with routing table and subnet  
	&rightarrow; It can cause VPC peering connection not to be enabled in hardware level(AWS SDN doesn't push to hardware level)
- By making explicit association, we can **force** AWS SDN to enable VPC peering connection in hardware level  
	&rightarrow; The EC2 in the private subnet can be reached after this configuration
- Thoughts from troubleshooting
	- AWS official guide recommends **explicit association** of subnet
	- Since it was not problem of network level, it was quite hard to solve the problem

## Thoughts
- Multi-VPC environment is common because of management issue, multi-region structure, ...
- These connection methods don't use **public Internet**  
	&rightarrow; Secure methods 
- We can divide environment by creating couple of VPCs  
	&rightarrow; Dev, Test, Production, ...  
	&rightarrow; Good CI/CD with separation
