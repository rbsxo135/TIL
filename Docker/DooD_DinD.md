# DooD(Docker-out-of-Docker) vs DinD(Docker-in-Docker)  

## Concept
- DooD
	- Docker container that uses Docker engine of the **host PC**
	- A docker socket of host PC(unix://) **must be binded**
	- Used in General CI/CD pipeline 
- DinD
	- Docker container that has **its own Docker engine**
	- A docker container run from DinD container becomes a child container of DinD one
	- Must config privilege setting
	- Communicate with network address
