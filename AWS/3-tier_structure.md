# 3-Tier AWS Structure

## Basic 3-tier Architecture
- Public subnet
	- OpenVPN
	- NAT Gateway
	- LB
- NAT(Application) subnet
	- Sevices
- Private subnet
	- DB
	- Private Instances

## Configure
- First, create VPC, GW and configure subnets
- To make a subnet public, we need to add a route to IGW(or a service connected to IGW) on the routing table
- After configuring subnets, create resources
- For administrator, we can use a bastion server or OpenVPN service
	- OpenVPN needs license fee, but it is more useful than a bastion server(account system, tracking, ...)
- NAT Gateway is needed for **outbound traffic**
- While Application subnet can be routed to the Internet through NAT GW, Private subnet cannot  
	&rightarrow; Private subnet is literally **closed**, outbound traffic to the Internet cannot be happen
 
## Thoughts
- This is just a brief note for 3-Tier AWS structure
- This page will update after I learn and build the structure
