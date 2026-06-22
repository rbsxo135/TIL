# Route 53

## Concept
- DNS of AWS
- Support scalability, load balacing, health check
- High availability DNS
	- We can configure **failover record** with route 53
	- If we configure DNS failover records, clients can reach to a normal endpoint that we set in a failover scenario
- Routing option(load balacing)
	- We can choose server options for load balacing reason
	- Latency based routing
		- Route a client to the endpoint that has the least latancy
	- Weighted Round Roubin Routing
		- Group several records of resources in single record
		- We can configure ratio of traffic for grouped resources
	- Geolocation Routing
		- Route based on geolocation
- We can buy domain name that AWS afford  
	&rightarrow; The domain can be searched on the Internet

## Thoughts
- We can combine many load balancing, high availability solution with route 53
- In real-world situation, it is recommanded to buy domain name from other services and list that domain name on route 53 
