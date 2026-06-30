# ACL(Access Control List)  

## Concept
- Make Access-List in L4 device
- Access-List can be listed in inbound/outbound Access-Group of each interface
- Two types of ACL &rightarrow; Standard ACL/Extended ACL
    - Standard ACL checks Src IP only
    - Extended ACL checks Src IP, Dst IP, Protocol and Port
- ACL rules are either **permit or deny**
- ACL tries to match target packet line-by-line, **top-from-bottom**
    &rightarrow; If the packet matches the rule, that packet will be immediately permit or deny
- Rule "Deny ip any any" is automatically added the bottom of Access-List

## Configure
- Make Access-List with name or ID, choose standard or extended
- Rule should be like(Extended ACL)
  {Permit/Deny} {ip/icmp/tcp/...} {src IP} {dst IP} {Additional Info upon Protocol}
-  List Access-List in Access-Group of interfaces
    &rightarrow; Must choose inbound or outbound

## Thought
- ACL is really important when we use this security tool in **Cloud environment**
- Extended ACL is especially useful since it **fillters packets by Protocol** also
- Since Access-List is reusable, well-configured Access-List can be powerful tool to Cloud/Network Engineer