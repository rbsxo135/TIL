# AWS Code Deploy + Gitlab Pipeline Practice

## Concept
- This pipeline is for a service running on EC2 instances
- Pipeline
	1. git push triggers the pipeline
	2. Gitlab launches a deploy container
	3. Configure aws cli for the container to excute code deploy
	4. Upload all the current files to S3(for version control)
	5. Copy all the modified files to EC2 instances
- Since we preserve every version of the service in S3, we can easily rollback the patches

## Configure
- This practice only focuses on **deploy**. So a gitlab runner for test environment wasn't configured
- Configure AWS(Code deploy service, Code deploy group)
	- Create an application for code deploy
	- Since our code deploy app needs to access S3, it has IAM role with **AWSCodeDeploy** role and **AmazonS3FullAccess** role
	- Include our EC2 instances into code deploy group
	- Tag EC
- Configure .gitlab-ci.yml
	- Only deploy stage exists
	- Launch a container for aws cli &rightarrow; Use a gitlab basic container image
	- After the container launched, install and configure aws cli
	- Zip and upload all current files in EC2 instance to S3
- Configure appspec.yml
	- Make the gitlab container to copy all the modified files into EC2 instances
	- Set permissions for EC2 instances

## Thoughts
- Since MFA was on, I needed to generate a session passkey from MFA approved session and give it as environment variables to gitlab  
	&rightarrow; The most annoying part of this practice
- I can try to set up gitlab runner for a test stage and configure test part of CI/CD
- There is an option for **EC2 Auto Scaling Group**  
	&rightarrow; I can try it next time  
