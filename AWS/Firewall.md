# AWS Network Firewall Integration

## Concept
- Centralized firewall to filter VPC inbound/outbound traffic
- Uses **GWLB** architecture and **GENEVE encapsulation** under the hood
    - Inspects raw packets while keeping original IP headers
    - Firewall endpoints are classified as Gateway Load Balancer Endpoints (`vpce-xxxx`)  
        &rightarrow; We should route toward this endpoint
- Only inspects traffic crossing the boundary; **VPC local routing completely bypasses it**

## Configure
- **IGW Ingress Routing:** Route public/protected subnets directly to the Firewall Endpoint
- **Stateful Rule Group:** Define rule actions (`Alert`, `Pass`, `Drop`) based on proto/port
- **Default Action:** Configure policy behavior for traffic that doesn't match any explicit rules

## Firewall + CloudWatch Practice Troubleshooting
- CloudWatch Alert Logs not populated after shifting to Custom Rules
    - Cause: Catch-all `IP ANY ANY -> Pass` rule suppressed `Alert` actions due to Suricata's default `Action Order` priority
    - Resolution: Removed the explicit `Pass` rule and delegated traffic forwarding to the policy's **Default Action**
- Issue 2: Rules failed to catch targeted Web (HTTP) and OpenVPN traffic
    - Cause: Misconfigured Port Mapping. Server listening ports (`80`, `1194`) were incorrectly set as **Source Port** instead of **Destination Port**
    - Resolution: Changed to **Source Port: ANY** and **Destination Port: 80 / 1194**
- Issue 3: ALB Inbound Web requests were missing in logs
    - Cause: ALB terminates the initial client TCP session as a reverse proxy. Strict "Application Layer Only Alert" skipped log generation during the proxy handoff
    - Resolution: Adjusted policy alert settings to a broader scope (e.g., `ALERT_ALL`) to log initial TCP SYN handshakes

## Thoughts
- AWS Network Firewall UI abstracts complex Suricata engines; subtle settings like rule order or alert scopes drastically change logging results  
    &rightarrow; I still don't know much about Suricata. If some troubleshooting issue is related to it, I need to record that experience in this page
- Visualizing the exact packet path (Client -> GWLBE -> ALB -> EC2) is crucial for cloud security debugging