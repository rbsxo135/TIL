# Traffic Control  

## Amazon Security Group
- Add security rules for instances
- **There is NO Deny rules**, Default set is deny
- Security group is closer to the instance  
	&rightarrow; Unless ASG allows a traffic, the traffic will be denied even if ACL allows the traffic
- We can make 500 ASG per VPC, 50 rules per ASG
- Automatically allow return traffics

## Network ACL(Access Control List)
- Classic ACL
- Add security rules in network level  
	&rightarrow; Rules affect on subnets
- Available to make deny rules
- In AWS, NACL is option for VPC  
	&rightarrow; NACL makes general rules for VPC
- Need to allow return traffics manually

## Thoughts
- We don't need to configure ACL for every instance  
	&rightarrow; We can manage with ASG
- Both ASG and NACL must be configured properly
