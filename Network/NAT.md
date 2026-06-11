# NAT(Network Address Translation)
## Concept
- Translating Public IP <-> Private IP
- Hide private network(Only Public IP is revealed to the Internet)

## PAT(Port NAT)
- In NAT, many IP of network devices in the subnet translated in to a single Public IP
    -> Put port number to distinguish various Public IPs
- Inside / Outside: Logical location of the device
    - Inside -> The device in the subnet
    - Outside -> The device out of the subnet
- Local / Global: From where IP is seen
    - Local -> How Private space looks this IP
    - Global -> How Public space looks this Ip
- PAT translation table
    Inside Global / Inside Local / Outside Global / Outside Local

## Thoughts
- Since Public IP is scarce(IPv4), we must use NAT
- If you want to see how our subnet IPs are translated in PAT env, we have to see Inside Global and Inside Local
- Could be combined with DMZ method