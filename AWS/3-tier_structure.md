# 3-Tier AWS Structure

## Basic 3-tier Architecture
- Public subnet
	- OpenVPN
	- NAT
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
	- OpenVPN needs license fee, but it is more useful than the bastion server(account system, tracking, ...)
 
## Thoughts
- This is just a brief note for 3-Tier AWS structure
- This page will update after I learn and build the structure
