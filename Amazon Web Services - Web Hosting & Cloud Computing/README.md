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
