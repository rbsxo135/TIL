# Docker Compose

## Concept
- Run **multiple Docker containers**

## Configure
- Must Configure **docker-compose.yml**
	- yaml file don't allow **tab**, must use **spacebar**!
    - We can list Docker containers under "service:" section
    - Configure image, volume, depend, port, enviornment, ...
- "docker compose" commands always searchs **current working diredtory**
    -> docker-compose.yml file **must be in current working directory**

## Thoughts
- There is no application running with single component
    -> Use docker compose to run multiple containers for app/service
- We can group containers in project/app/service/...
