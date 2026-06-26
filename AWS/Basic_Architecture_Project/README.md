# Hotel Reservation Service with Chatbot  

## Key Infrastructure Components

### 1. Network & Routing (Edge & Perimeter)
- **Amazon Route 53:** Handles initial DNS resolution for external users and clients.
- **Amazon CloudFront:** Acts as the Content Delivery Network (CDN) to cache and deliver static content globally with low latency.
- **Amazon S3 (Front Web):** Configured for static website hosting, serving the frontend application via CloudFront.
- **AWS WAF (Web Application Firewall):** Integrated at the CloudFront/Route 53 edge layer to protect against common web exploits.

### 2. VPC & Core Networking (`10.0.0.0/16`)
The architecture spans a single Region (`ap-northeast-2`) across two Availability Zones (**AZ A** and **AZ B**) for high availability and fault tolerance. Network Access Control Lists (**NACLs**) act as a firewall at the subnet boundary.

#### Public Subnets (`10.0.0.0/24`, `10.0.0.1/24`)
- **Internet Gateway (IGW):** Provides a communication pathway between the VPC and the open internet.
- **Internet-Facing Application Load Balancer (ALB):** Distributes incoming traffic across backend container tasks located across both AZs.
- **NAT Gateways:** Deployed in both AZs to allow instances/containers in private or NAT subnets to securely access the internet for updates while blocking inbound traffic.
- **OpenVPN Instance (AZ A):** Facilitates secure remote access for administrators and developers into the internal private network.

#### NAT Subnets (`10.0.10.0/24`, `10.0.20.0/24`)
- **Container Task Group:** Hosts the primary application workloads running inside containers.
- **GitLab Runner (on Container):** Positioned inside AZ A's NAT subnet to securely execute CI/CD jobs. It interacts with internal resources via a dedicated **VPC Endpoint**.

#### Private Subnets (`10.0.11.0/24`, `10.0.21.0/24`)
- **Amazon RDS (Primary - AZ A):** The main relational database instance handling all application writes and transactional reads.
- **Amazon RDS (Standby - AZ B):** A Multi-AZ synchronous replica ensuring automatic failover and high availability.
- **RDS Read Replica (Report Purpose):** An asynchronous replica dedicated entirely to heavy reporting/analytical queries to offload the primary database.

### 3. Container Management & Serverless AI Pipeline
- **Amazon ECS:** Orchestrates the container tasks distributed across the NAT subnets.
- **Amazon ECR:** Stores docker images used by the ECS container tasks (specifically marked for the Chatbot Container).
- **AWS Lambda (Chatbot Response):** A serverless compute service triggered to handle chat inputs, interface with databases, and invoke AI services.
- **Amazon Bedrock (LLM):** Utilized by the Lambda function to generate intelligent, context-aware chatbot responses.
- **Amazon DynamoDB (Chatbot Session):** A NoSQL database that maintains user session states and conversational histories with single-digit millisecond latency.
- **Amazon S3 Vector DB & Log Storage:** 
    -  One S3 bucket acts as a vector storage/knowledge base for retrieval-augmented generation (RAG) with Bedrock.
    - A separate S3 bucket is dedicated to centralized log storage.
- **Amazon CloudWatch:** Monitors infrastructure metrics and collects application logs across all layers.  

## Detailed Traffic & Data Flow

1. **User Request:** An external user requests the web application; the request hits **Route 53** and is routed to **CloudFront**.
2. **Static Content:** Static assets are served directly from the **S3 Front Web** bucket via CloudFront.
3. **Dynamic Content:** Dynamic API requests pass through the **Internet Gateway** to the public **Internet ALB**.
4. **Load Balancing:** The ALB forwards the traffic down to the **Container Task Group** (ECS tasks) distributed across the NAT subnets in AZ A and AZ B.
5. **Database Interaction:** Container tasks read and write data to the **Amazon RDS Primary** database. Data is synchronously replicated to the **Standby** instance and asynchronously replicated to the **Read Replica** for reporting.
6. **Admin Access:** Internal admins/developers connect via the **OpenVPN** instance in the public subnet to securely manage internal resources.
7. **CI/CD Pipeline:** The **GitLab Runner** picks up code changes, builds new container images, pushes them to **Amazon ECR**, and updates the **ECS** tasks via a **VPC Endpoint**.
8. **Chatbot Flow:** 
   - User interactions with the chatbot route through ECS/ECR down to **AWS Lambda**.
   - Lambda fetches/saves session state in **DynamoDB**, queries contextual data from the **S3 Vector DB**, and passes the prompt to **Amazon Bedrock** to get an LLM response.