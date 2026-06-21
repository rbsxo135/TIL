# GitLab


## Concept
- Connected with github name and email
- Default git commands are available
- Gitlab-runner
	- Worker node that runs **jobs**
	- If git push happens at Gitlab project, Gitlab builds a Pipeline based on **.gitlab-ci.yml**
	- The pipe line consists of serveral jobs and Gitlab-runner doing that job
	- A job could be test, build, deploy, ...

## Configure
- Gitlab
	- Need ID/PW/Access Token for Gitlab(even if you have your own github login)
	- .gitlab-ci.yml file must be configured if you want to configure CI/CD
- Gitlab-runner
	- Could be run in linux host, Docker container, ...
	- Need to be register with command "gitlab-runner register"
	- Register with **Access Token** is recommended
	- **Tag** is quite important. Gitlab gives jobs to the runner only matches tags of a pipeline
- .gitlab-ci.yaml
	- stages:
		- List jobs that should be done in order
	- variables:
		- List variables for yaml configuration
	- Config each stage
		- stage:
		- image: 
		- tags:
		- before_script:
		- script:
		- only:
		...

## Thoughts
- Useful than Github in situation that **CI/CD** is important
- We can put multiple Gitlab-runner for large scale CI/CD
- Tag is useful when a project is consist of various services.  
	&rigthearrow; Since there is no project with single service, tagging is necessary. 
