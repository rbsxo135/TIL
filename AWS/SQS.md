# SQS(Simple Queue Service)

## Concept
- Message queue service of AWS
- Decouple services by exchanging messages asynchronously
- Producer sends messages to the queue
- Consumer receives and processes messages
- Queue types
	- Standard Queue
		- Almost unlimited throughput
		- At-least-once delivery
		- Best-effort ordering
	- FIFO Queue
		- Exactly-once processing
		- Preserve message order
- Visibility Timeout
	- Hide a received message from other consumers while it is being processed
- Dead Letter Queue (DLQ)
	- Store messages that fail processing multiple times

## Thoughts
- SQS is useful for building loosely coupled systems
- It can improve scalability because producers and consumers do not need to process requests at the same speed