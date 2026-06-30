# Webserver with Docker - Nginx reverse proxy & Node.js backend  

## Concept
- Make webserver running on Docker container
- Nginx front server
    - Reverse Proxy
    - give api to backend server
    - Base static index.html
    - load bancing available
- Node.js backend1~3
    - Express API
    - expose port 3000
	- Every backend node is made from src/backend/
		&rightarrow; give environment varient to each nodes to distinguish them
- Redis Cache DB
	- Persistance enabled(appendonly=yes)
