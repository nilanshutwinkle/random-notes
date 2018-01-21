# Amazon Web Services - Web Hosting & Cloud Computing

[Udemy](https://www.udemy.com/amazon-web-services-for-web-hosting-cloud-computing/)

## 101: What is the Cloud?

* **IaaS** (infrastructure), **PaaS** (platform), **SaaS** (software)
* **Rails** (verticals of services) and **tiers** (horizontals of same type)

## 102: Scalability and costs in the Cloud

* Think **operating expenditures**, not **capital expenditures** (upfront costs).
* Usually cheaper to use AWS services than building your own services on EC2 instances (but understand their limitations)
* Benefits: new services, economy of scale, autoscaling, regional servers, high availability

## 103: Cloud impacts on Architecture

* Leverage services wisely; buy rather than build
  - Know costs for each (e.g., storage and bandwidth)
  - EC2 probably main cost; minimize always-on
* Modularize heavily; use provided services wherever posible
* Know each service's limits
* Multi-AZ deployments for HA
* See AWS whitepapers for relevant architectures

## 104: Creating a cloud account with AWS

* Use email address that can be shared across organization

## 201: AWS value propositions

* EC2 charges are hourly, have data transfer costs, and other parameters

## 202: AWS Regions & Availability Zones

* **AZ**: single data center
  - Most services deploy to single AZ
  - HA achieved by deploying to multiple AZs
* **Region**: collection of AZs connected by high-bandwidth, low latency fiber
  - E.g., US East is default region
  - different regions can have different costs
* **Edge locations** push content close to users (often outside region)
* See "AWS Global Infrastructure" page

## 203: Intro to Service Families

* **EC2**: virtual servers
* **AutoScaling**
  - Can span multiple AZs
  - No additional cost
* **Elasticache**: caching via Redis or memcached
  - Memcached cluster
  - Useful for user sessions, caching DB queries
* **S3**: object storage
  - WORM: write once read many filesystem
  - Natively web accessible
* **EBS**: network attached storage
  - User-provisioned block storage
  - Attached to single EC2 instance
  - Can snapshot to S3
* **CloudFront**: CDN
  - Uses edge locations
  - Pull based (lazily added)
* **DynamoDB**: key-value (NoSQL) store
  - Specify read and write throughputs
  - Automatically replicate and reshard to multiple AZs
* **RDS**: fully manage SQL services
* **SQS**: extremely simple queues
  - Pull-based (requires polling)
* **SNS**: notification service for interally-bound msgs
  - Push-based via email, HTTP, SQS, SMS
* **SES**: email service for end-user emails
* **ELB**: elastic load balancers
  - Round-robin or sticky sessions
* **VPC**: user-defined private networks
  - No additional costs
  - Security groups/access control
* **Route 53**: distributed DNS service
* **CloudFormation**: templatize entire stacks of resources
  - Can version control
  - 200-300 predefined templates
* **CloudWatch**: monitor resources, billing
  - Control AutoScaling groups
  - Send notifications
  - Supports most AWS services
* **IAM**: Identity and Access Management
  - Controls actions, but not specific instances (w/ exceptions)

## 204: Roll Your Own vs AWS-Supplied Services

* Can easily install own services via EC2
  - Gain control
  - Can cost 4-15x more
  - Must additionally manage/admin
  - Steps:
    1. Spin up EC2 instance
    2. Install load balancer (e.g., HAProxy or NGINX)
    3. Configure software to run in EC2
    4. Configure DNS
* Only roll your own if AWS service limitations unacceptable
* When roll your own, account for:
  - HA (avoid SPOF)
  - DR (have backups)
  - Elasticity

## 205: Interfaces (web GUI, API, SDK)

* Web console missing functionality
* REST API, which CLI tools use
  - 100% feature support
* Lang-specific SDK
* Eclipse Plugin (instructor recommends)
* Instructor demo of IAM & policy generator

## 206: Intro to Authentication and Authorization

* Both cloud layer (AWS) and non-cloud layer (application, OS, server logins)
* **Master Account** is the keys to the kingdom
  - Basically, root level access
  - Put on a disk and store in a safe!
* **MFA** (multifactor authentication) is rotating codes, locks down individual API calls
* Master & IAM account access have different login URLs
* Use **bastion host**: single host accessible to outside world, other host accessible from it
* Launch EC2 instances into IAM Roles to avoid copying credentials everwhere
* Create & use "sshers" group to control access

## 301: EC2 instance types, key pairs, user-data

* Instance types are the "hardware footprint"
* Public/private key pairs control first-time access to new instance
* **user-data**: store config/scripts per instance
  - Useful for bootstrapping
* EC2 min 1hr charge, so avoid repeat restarting
* `ssh -i foo.pem`
* **EC2 Security Groups**: semi-stateful firewalls around instances
  - Control ports, source, TCP or UDP
  - **CIDR blocks**. E.g.,
    - `122.43.0.0/16` (64k addresses)
    - `122.43.65.0/24` (255 addresses)
    - `122.43.65.8/32` (1 address)
    - `0.0.0/0` (allows all addresses)
* CloudFormation's **cfn-init** for initializing on first boot (e.g., install packages, set hostname)

## 302: EC2 Disk instances

* Ephemeral ("instance") store vs EBS
* **Hypervisor** makes slices of hardware resources available to VMs
* **Ephemeral store**:
  - Cannot be shared
  - Fast (local to EC2)
  - Lifetime tied to instance
  - Sequential I/O best
* EBS:
  - Remote rack, but still fast
  - Lifetime independent
  - Best for random I/O
  - Snapshots
  - Good for boot volume
  - Can only be attached to one EC2 instance at a time

## 303: Spinning up your first EC2 server & SSHing in

* Amazon Linux AMI
* Linux t1.micro (free)
* `chmod 400 foo.pem`
* Best practice: `sudo yum update`
* `curl http://<ip>/latest/meta-data/`
* EBS volume will be ~$0.10/month
* When take down, don't forget to down down EBS dist!

## 304: EC2 Gotchas

* Don't change default group (no access)
* Use elastic IPs, not public/private DNS
* Use "Terminate on Delete"
* Use "Termination Protection" for production machines
* Tag resources so can manage
* Don't copy credentials into instances or AMIs; leverage IAM "EC2 Roles" or user-data
* Use CloudFormation templates
* Don't use EC2 when there's a service available
* Don't oversize your machine; drive it like you stole it
* Don't manually provision if you will scale beyond 5-10 servers. Use Chef, Puppet, or at least CloudFormation

## 305: Templatizing Servers w/ AMIs

* **Instance types** are hardware footprnts; hypervisor offers resources (disk, cpu, ram, network) to VMs
* **Amazon Machine Image** (**AMIs**) are software footprint (OS, packages, user software)
* Amazon AMIs (trusted) vs Community AMIs (untrusted)
* Marketplace pre-packaged appliances
* MyAMIs
  - Options: base, partially configured, fully configured
  - Stored in S3

## 306: EBS Snapshots, Attaching, Detaching

* Find AZ for EC2 (e.g., us-east-2c)
* Go to "Elastic Block Storage" > "Volumes"
* "Provision IOPs" means more throughput (we'll use "Standard")
* AWS should provide commands for formatting, mounting
* To remove EBS from EC2 instance, it's better to unmount from terminal than to use AWS Console:
  ```bash
  $ sudo umount /mnt/newdisk
  $ sudo umount /dev/sdf
  ```
  Then, select volume in AWS Console and "Detach Volume"
* To create AMI:
  1. Go to "Running Instances"
  2. Select instance, right-client and select "Create Image (EBS AMI)"
  3. Fill out form
  4. Go to "Images" > "AMIs" (just book volume)
  * Cleanup:
    1. "Images" > "AMIs" > select and "Deregister"
    2. "EBS" > "Snapshots" > select and "Delete"
    3. "EBS" > "Volumes" > select and delete
    4. "Network & Security" > "Security Groups" > select and "Delete Security Group"

## 307: Pricing Model for EC2

* On Demand: most expensive, no up-front fee
* Reserved: up-front fee, lower hourly
* Spot: cheapest, bust can be taken away
* Amazon applies on-demand automatically
* Can sell reservations on marketplace
* Spot use cases:
  - Batch jobs
  - Offline processing
  - Big data analytics
  - Test/dev
* Spot best practices:
  - Break work into smallest pieces possible
  - Return useful results ASAP
  - Minimize data in & out
* Tip: Can use reserved for base traffic, then use spot and on-demand for peak

## 308: Making an AMI

## 401: ELB intro

* Allows elasticity through horizontal scale
* Software load balancers to decouple web and app
* Can terminate SSL, SSL encrypt to back-end, and supports `X-Forwarded-For` (client IP forwarding)
* Deep integration w/ AutoScaling & CloudWatch (the "triangle services")
  - Can add more servers as needed
  - Can detach & remove unhealthy servers

## 402: ELB lab

* Create EC2 instance w/ setup pasted in user data:
  - `yum -y install httpd`
  - `service httpd start`
  - Create `var/www/html/index.html`
* Create new Security Group w/ ports 80, 22 open
* Create another EC2 instance
  - Different availability zone
  - Slightly different index.html
* Go to "Networking & Security" > "Load Balancers" > "Create Load Balancer"
  - Drop healthy threshold down to 2
* Note: outside AWS, tends to stick; inside, bounces more-or-less evenly. So test from EC2 instance.
* Cleaning up:
  - Delete ELB
  - Terminate EC2 instances
  - Delete security group

## 501: AutoScaling & CloudWatch

* CloudWatch alarms can fire AutoScaling policies and/or SNS notifications
* **"Triangle Services"**: AutoScaling, ELB, CloudWatch. Play nice together.
* Setup autoscaling:
  1. Create ELB
  2. Create EC2 instances in 2+ AZs
  3. Create AutoScaling group (including EC2 instances across AZs)
  4. Create AutoScaling policies pair (one up, one down)
  5. Create CloudWatch alarms to fire policies
* Policies, e.g.,
  - UP: add 2 instances
  - DOWN: remove 2 instances
* CloudWatch alarms, e.g.,
  - UP: ELB latency > 500ms
  - DOWN: ELB latency < 100ms
* There are no RAM alarms
* AutoScaling requires 3 pieces:
  1. Launch config (AMI, instance type)
  2. AutoScaling Group (AZs, max/min servers)
  3. AutoScaling Policy (the "buttons" for actors to push)
* Types of AutoScaling Policy
  - Fixed oversize
  - Demand-based
  - Schedule-based
* Cooldown (in seconds) is minimum time before honoring AutoScaling policy reqs
  - Can set independent values on UP & DOWN policies
  - In general, want fast scale up & slow scale down
* CloudWatch has:
  - Namespaces
  - Metrics (CPU util, disk reads, etc)
  - Statistics (avg, min, max, etc)
  - Units (%, ms, etc)
  - Periods
  - Alarms
* Must install CloudWatch agent in EC2 for metrics (its an EC2 launch checkbox)
* AutoScaling has no Web GUI (use CLI)
* CloudWatch can do billing alarms

## 601: Setting up CloudFormation

* Specify infrastructure as code (can version control)
* Enforce "one way to deploy"
* Like light versions of Chef, Puppet, or CFEngine
* 200-300 templates available to fast track development & exploration w/ AWS
* CloudFormer: creates template from running stack
* 7 sections:
  1. Version
  2. Description
  3. Parameters: fields you fill out when creating instances
  4. Mappings: specify abbreviated terms for things like instance types, AMI lists
  5. Resources: which resources to create. E.g., "S3Bucket", "S3User"
  6. Properties (resource specifics)
  7. Outputs: specify any outputs that scripts would use; e.g., website URL from ELB's "DNSName"
* At the time of video, instructor recommends use CF for creating stacks, but not for updating (as rules for what is bounced are complicated)

## 701: Available Storage Types - S3, RDS, DynamoDB

* S3:
  - Extremely durable, "eleven 9s"
  - Objects natively web-accessible (can host static websites)
  - Higher latency
  - Basically: read, write, delete, list
* RDS:
  - HA baked in (multi-AZ master/slave)
  - DR baked in w/ automated backups & snapshots
  - Upper limit on vertical scale
  - 3TB DB size limit
  - Only accessed via SQL
* DynamoDB:
  - Great for "Three Vs":
    1. variety
    2. velocity (SSD-backed, very fast)
    3. volume
  - Column family key-value store
  - Strongly consistent
  - HA baked in
  - Extremely cost effective
  - Two lookup key types
    1. Hash key (unique ID)
    2. Hash & ranged key (typically date)
  - Very limited querying
    - Get, Put, Update, BatchWrite, Query (on range), and Scan (slow)
  - No table size limit, but 64K row limit size
* Tip: pull "hot tables" out of RDS into DynamoDB

## 801: Provisioning an RDS

* RDS provides:
  - HA (tools provided)
  - DR (backups and snapshots)
  - Scaling (options provided)
  - Patch mgmt
* Just SQL access; no SSH
* Native master/slave HA
  - Slave is "hot standby" in another AZ
  - Slave incurs extra costs
  - Slave writes are synchronous (must write to slave first)
* Read Replica support
  - MySQL-only
  - requires app-specific logic

## 901: Intro to S3

* Buckets are globally-unique namespaces (like domains)
  - User must provision buckets in specific region
* Objects consist of key & value
  - Key is name of object (incl bucket)
  - Value is bytes of object
* Easy to DNS CNAME a "vanity" URL to bucket
  - **CNAMES** specify that domain name is alias for another domain
  - **A record** maps name to one or more IP addresses
* Types of access control
  - IAM policies
  - Bucket policies
  - ACLs
  - Query string authentication
* Objects have metadata; e.g., Content-Type header
* Glacier S3 is like standard S3, 1/10th cost, but queued (not real-time) retrieval
  - Great for backups

## 902: Advanced Features of S3

* Simple, static website hosting
  - "Index" & "Error" document support
* Object expiration
* Encryption
  - Encrypted at rest
  - Encrypted in transit
* Versioning
  - Each version is a complete copy
  - Cannot be turned off
* Logging
  - Access logs @ bucket level
* Direct from bucket upload
* Multipart file upload
  - Limited to SDK
  - Client "chunks" file into pieces
  - Client "closes" file
  - Each must be < 5GB
  - Total 5TB file limit
* BitTorrent support
  - Max 5GB file size

## 903: S3 hands on

* Note: can replace `s3.amazonaws.com/my-bucket/a.png` w/ `my-bucket.s3.amazonaws.com/a.png`
* Covered:
  - Creating buckets
  - Uploading through web
  - Making files readable by everyone
  - Encrypting * setting less replications
* Glacier is a separate service, though hosted via S3

## 904: s3cmd

* Many S3 tools
  - AWS console
  - Wide # 3rd party guis (CloudBerry)
  - Official s3 tool (it's okay...)
  - s3cmd (one of the best)
* To become root: `$ sudo su -`
* `$ tar -xvzf foo.tar.gz`
* Install from source using: `$ python setup.py install`
* `$ s3cmd --configure` saves to `/root/.s3cfg`
* s3cmd commands:
  - `mb` to make bucket
  - `rb` to remove bucket
  - `ls`
  - `put`
  - `sync`
  - `get`
  - `del` (alias for `rm`)
  - `cp`
  - `mv`
  - manage website, meta data, access, security, etc
* Don't create access keys for root account; create access keys for IAM users!

## 1001: Intro CloudFront

* Download vs streaming distributions
  - Streaming uses RTMP (or RTMPE for encrypted)
* Pull access: cached upon request @ specified edge location
* On demand or scheduled expiry
* Must create "distribution"
  - Select HTTP or streaming
  - Specify "origin" - any web-accessible server (private, EC2, S3)
* Easy to CNAME to vanity URL
* Charged per pull and invalidation

# 1101: Provisioning ElastiCache Instance

* In-memory caching mechanism
  - ElastiCache is a memcache cluster
  - Only available in single AZ
* Frequently used for user sessions
* No querying; just key-based retrieval
* Per hour node charge & bandwidth charges (free w/i AZ)

## 1201: Intro to VPC

* "AWS Classic" is the wild west  
  - No way to cordon off entire stack of resources
  - No control of networking
* VPC and VPC subnets
* Don't need security groups between machines in VPC
* Access to internet from VPC via gateway
* VPCs provide logical isolaiton of resources
* VPC subnets are like AZs
  - AutoScaling groups can span subnets
  - Minimum size is /28 (14 IP addr)
* Network Address Translation (NAT) allows machines to hide on private network and still access internet
* Only select resources can be launched in VPC (ELB, EC2, RDS, ElastiCache)
* Use cases
  - Burst internal capacity into AWS
  - Compliance w/ strict regulations (e.g., HIPPA)

## 1202: Advanced VPC

* E.g., web, db, computing resources
  - Web + db stacks across muliple AZs, compute resources across AZs
  - Horizontals w/i AutoScaling Groups (ASG) have same subnets
  - Attach internet gateway and virtual private gateway for corporate data center access
  - Specify IP-based rules for IG & VPG to control access
* Can lock outbound traffic from (say) web servers to single IP addr for updating packages
  - Furthermore, can disable & only re-enable programmatically once a week for updates

## 1301: Intro to SNS

* Send notices to internal assets
  - from/to application/users
* Useful for monitoring alerts, logging
* To setup:
  - Create topic (think mailbox)
  - Add subscribers
  - Subscribers must confirm
  - Send msgs to topic
* Console & API support
* HTTP/S, email, email-json, SMS, SQS
  - All but SQS incur costs

## 1302: SNS use cases & best practices

* Good RDS integration (send critical db events to dba)
* Used by CloudWatch for policies & alerts
* Tip: use 2nd SQS so workers can pull
  - Allows offline apps to later catch up

## Intro SES

* Simple Email Service
* Note SNS sends email, too, but:
  - Opt-in (confirm)
  - Plain text
  - No personalization
* CAN-SPAM compliance is up to you
  - AWS provides some tools (e.g., blocking spammy email)
  - SES doesn't provide "unsub" functionality (main thrust of CAN-SPAM)
* Best practices:
  - CAN-SPAM compliance
  - Use SPF, Sender ID, and DKIM
  - Proactively score email content
  - Monitor reputation
  - Send to high quality lists (validated, double opted in, scrubbed)
  - See Amazons best practices PDF
