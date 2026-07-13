# Private Gitlab

## Concept
- **Self hosting** a private gitlab server
- Compeletly isolated  
    &rightarrow; Our code doesn't go through the Internet
- There is no fee except the cost for the server infra itself
- Easily host with docker(or docker compose)
- It supports a **local image registry** service  
    &rightarrow; We can make a image version control system with image registry

## Configure
- Configure docker-compose.yml file on gitlab server  
    - If we want to enable registry we need to set **registry_external_url, gitlab_rails['registry_enabled'] = true, and map port 5050**  
        &rightarrow; If this configuration seems not applied, check /etc/gitlab/gitlab.rb located inside the container
    - Create **config, logs, data directory** and map these volumes to container
- For CI/CD pipeline, running a gitlab-runner server is highly recommended  
    - Make another server for gitlab-runner and follow instruction under Project > CI/CD > runners (tagging is important!)

## Gitlab - Gitlab-runner - Web-EC2 CI/CD pipelining with AWS prac Troubleshooting
- Since both Gitlab and Gitlab runner could be run with docker, I tried to run both in single EC2  
    &rightarrow; It was terrible choice. It increased complexity of the config and causes a hairpin problem
- I didn't configure for non-TLS private registry  
    &rightarrow; We need to configure a build stage at .gitlab-ci.yml file

## Thoughts
- Private Gitlab is practical since it has no additional fee
- Since I didn't use an orchestration system(ECS, EKS, ...) I need to deploy with ssh and cp command  
    &rightarrow; It was quite annoying... We must use an orchestration system!