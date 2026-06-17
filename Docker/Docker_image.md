# Docker Image

## Concept
- Compressed image of **Container**
- We can run Container from image
- We can make/get Docker image by **build, commit, pull**

## Docker build
- Build Docker image from **Dockerfile**
- Dockerfile commands are listed line by line in the Dockerfile
- Dockerfile commands
	- FROM: base image
	- LABEL: define meta data
	- RUN: make container to run the command **before container starts**. need to RUN shell first and should be given in array
		example) RUN ["sh", "-c", "echo $MY_ENV"]
	- ADD: put local host file into the directory located in the container
	- WORKDIR: change working directory
	- CMD: make container to run the command **after container starts** 

## Docker commit
- Build Docker image from **running container**
- Upon what admin do with running container, **more layers** will be put on the original image by commit

## Docker pull
- Download Docker image from hub/registry
- If address is not give, Docker automatically pulls from Dockerhub

