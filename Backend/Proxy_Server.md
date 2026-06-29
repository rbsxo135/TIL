# Proxy Server  

## Concept
- A server located between clients and servers
- There are two types of proxy server  
	&rightarrow; Forward proxy / Reverse proxy
- Forward Proxy Server
	- It is located **right after clients**     
		&rightarrow; Every traffic from clients goes to the proxy server
	- It protects and controls clients' activities
		- Prevent clients to access dangerous webpages
		- Hide clients' IP
	- Boost Internet speed by caching
- Reverse Proxy Server
	- It is located **right in front of servers**     
		&rightarrow; Every traffic heading to servers goes to the proxy server
	- It supports servers
		- Hide servers' IP
		- Load balancing
		- SSL off-loading
- nginx, apache, cloudflare  
	&rightarrow; Widely used for the proxy server

## Thoughts
- Reverse proxy server is widely used and almost essential part of modern website
- In AWS, there is a lot of services that can replace reverse proxy server  
	&rightarrow; ALB, Cloudfront, ...
- But if traffic of the service is too heavy for AWS services, we might need to configure our own reverse proxy server

