# Private Docker Repository  

## Concept
- We can make our own private Docker repository
- A private Docker repository could be a server or running container
- We can push to the private Docker repository by "docker push"  
	&rightarrow "docker push {server address}/{image name}:{version}

## Configure
- Just launch a private Docker repository in a server or a container
- If a private Docker repository is running on a container, a volume must be attached

## Thoughts
- We need to push Docker images because of version control, image sharing, but we cannot push every image to public Docker hub  
	&rightarrow Make a private Docker container
- If a service is based on the microservice architecture with Docker, a private Docker repository could be the main repository for version control 
