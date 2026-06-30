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
	- ENV: Environment Variable. Keep existing after the container starts
	- ARG: Variable that only exists during build
	- USER: Set a user. The user keeps login after the container starts
	- ADD: Put local host file into the directory located in the container
	- WORKDIR: Change working directory
	- CMD: Make container to run the command **when container starts** 
	- ENTRYPOINT: Container runs the command that given to the "docker build" command. ENTRYPOINTS gives arguments/commands for that command. 
	- ONBUILD: If an Docker image built with ONBUILD commands, other Dockerfile use that image runs those commands while building
	- HEALTHCHECK: Set --interval --timeout --retries for health check
	- Commands given not in array &rightarrow; "/bin/bash -c" before the command
	  Commands given in array &rightarrow; only that command deliver to the container	

## Docker commit
- Build Docker image from **running container**
- Upon what admin do with running container, **more layers** will be put on the original image by commit

## Docker pull
- Download Docker image from hub/registry
- If address is not give, Docker automatically pulls from Dockerhub

