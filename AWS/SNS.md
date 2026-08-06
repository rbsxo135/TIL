# SNS

## Concept
- Messaging service of AWS
- Publish/Subscribe (Pub/Sub) architecture
- Publisher sends messages to a topic
- Subscribers automatically receive messages from the topic
- Support multiple subscriber types
	- SQS
	- Lambda
	- HTTP/HTTPS endpoint
	- Email
	- SMS
- One message can be delivered to multiple subscribers simultaneously
- Common use cases
	- Application notifications
	- Fan-out messaging
	- Event-driven architecture

## Thoughts
- SNS is useful when the same event should be delivered to multiple services
- SNS and SQS are often used together to build scalable and loosely coupled systems