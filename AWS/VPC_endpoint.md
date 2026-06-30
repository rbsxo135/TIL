# VPC endpoint  

## Concept
- VPC endpoint is an entry point of the VPC
- An instance in the VPC can **directly** send a request to resources located outside of the VPC 
- Since the traffic through VPC endpoint uses AWS own network, it doesn't use the Internet
- There are two types of VPC endpoint &rightarrow; Interface endpoint / Gateway endpoint  
	- Interface endpoint: AWS privateLink, make a network interface in the subnet, not free
	- Gateway endpoint: Only for S3/DynamoDB, VPC directly route to the resources, free  

## Configure
- Simply turn on the option of VPC  
	&rightarrow; AWS automatically makes Interface/Gateway endpoint

## Thoughts
- Sometimes, a instance needs to request to resources that located outside of the VPC and that request must not be sended via the Internet  
	&rightarrow; Use VPC endpoint
- These days, it is common to use AWS fully managed services  
	&rightarrow; We will often use this endpoint
