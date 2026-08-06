# ElastiCache

## Concept
- In-memory cache service of AWS
- Support Redis and Memcached
- Reduce latency by storing frequently accessed data in memory
- Improve application performance
	- Reduce database workload
	- Faster response time
- Redis
	- Support persistence and replication
	- Support data structures such as List, Set, Hash
- Memcached
	- Simple key-value cache
	- Multi-threaded and easy to scale horizontally
- Common use cases
	- Session storage
	- Frequently accessed query results
	- Real-time leaderboard or ranking

## Thoughts
- ElastiCache is useful when the database becomes a bottleneck because of repeated read requests
- Redis is more commonly used because it provides more features than Memcached