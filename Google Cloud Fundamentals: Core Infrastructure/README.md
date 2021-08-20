# Google Cloud Fundamentals: Core Infrastructure

## Introducing Google Cloud Platform
* 4 kinds of services: Compute, Storage, Big Data, Machine Learning
* This course will focus on compute, storage, and networking
* GCP locations are split into:
    - **Zone** (e.g., europe-west2-a)
    - **Region**: collections of zones with fast interconnections (e.g., europe-west2)
    - **Multi-Region**
* As of today (2021/08/18), total of 27 regions and 82 zones
    - View [cloud.google.com](https://cloud.google.com/) for more details
* GCP uses open interfaces to avoid vendor lock-in
    - e.g., **Cloud Bigtable** (Apache HBase API), **Cloud Dataproc** (Hadoop as managed service)
* Four ways to manage GCP spend:
    - **Budgets & Alerts** (fixed limits, or metric like % of prev month's spending)
    - **Billing export**
    - **Reports** (visual monitoring)
    - **Quotas** (rate quotas, allocation quotas)

## Getting Started with Google Cloud Platform

### Module Introduction

* **Projects**: main way to group to related resources, usually around related business
* Interfacing with GCP:
    - **Cloud Platform Console**
    - Cloud SDK and **Cloud Shell** (command-line launched in web browser from Console)
    - REST-based API: for custom applications
    - **Cloud Console Mobile App** (can build dashboards)
* Responsibility of user decreases from On-premises to IaaS to PaaS to Managed Services.

### The Google Cloud Platform resource hierarchy

* Resources are in Objects, and Projects are (optionally) organized into **Folders**, which are in Folders, in **Organization** nodes
* Projects are managed and billed separately
* Projects have IDs (globally unique, assigned by you), names, number (globally unique, assigned by GCP)
* Children resources transitively inherit IAM policies from parents
* Special roles for Organization nodes:
    - Organization Admin
    - Project Creator

### Identity and Access Management (IAM)

* IAM policy says "Who" "can do what" "on which resource":
    - Who: Google account, service account, Google group, Cloud Identity or G Suite domain
* Three types of role in IAM
    - **Primitive**: often too broad, especially when sensitive data involved. impact all resources in a project. Includes predefined roles:
        - **Owner**
        - **Editor**
        - **Viewer**
        - **Billing Administrator**
    - **Predefined**: offer more fine-grained controls on particular GCP service
    - **Custom**: enable you to define precise set of permissions.
        - Can only be used at Project or Organizational levels; not Folders.
* **Service Accounts**: provide identities used to control server-to-server interactions
* Policies are a union of those applied on resource itself and those inherited from higher levels in the hierarchy

### Interacting with Google Cloud Platform

* Many APIs are disabled by default
* **APIs Explorer**: APIs available, with supported versions, and built-in documentation
* Two kinds of libraries:
    - Cloud Client Libraries: recommended, community-owned, idiomatic
    - Google API Client Libraries: generated, open source

### Cloud Marketplace (formerly Cloud Launcher)

* **Cloud Marketplace** is a solution marketplace; some offered by Google, some by third-party vendors

### Demonstration, lab activity, and quiz

* **QWIKLABS**

## Virtual Machines in the Cloud

### Module Introduction

* **Compute Engine**: GCP IaaS that allows you to run virtual machines on Google's global infrastructure

### Virtual Private Cloud (VPC) Network

* Can either:
    - Create your own private VPC
    - Use default VPC
* Google Cloud VPCs are global; subnets are regional

### Compute Engine

* Can create instances of Compute Engine using Google Cloud Console or the **gcloud** command-line tool
* Pick predefined types (which combine memory and CPU requirements), or make custom VM
* GPUs available
* Two types of permanent disk: standard or SSD
* Use can use local SSD for high performance, ephemeral storage (ensure you use permanent disk for data you need to retain)
* Define a startup script, and other metadata
* Disk snapshots supported
* **Preemptible VMs**: like AWS EC2 spot instances, save money by allowing Google to terminate your instance if resources needed elsewhere
* Can scale up or out
* **Autoscaling**: automatically adding or removing Google Compute Engine resources based on load

### Important VPC capabilities

* **Routing Tables**: forwarding traffic from one Compute Engine instance to another within the same VPC network
* VPCs contain **firewalls** for restricting access to Compute Engine instances, both for incoming and outgoing traffic
    - Can define tags for resources that apply firewall rules; e.g., "web_server" tag to enable traffic over HTTPs port
* **Shared VPCs**: enable you to share VPC across multiple projects
* **VPC Peering**: enable you to interconnect networks across VPCs and projects
* **Cloud Load Balancing**: a global service that connects user to application using the closest point-of-presence
    - Key technology when scaling out
    - No pre-warming required
* Different load balancing options:
    - Global HTTPS
    - Global SSL Proxy
    - Global TCP Proxy
    - Regional: load balancing any traffic over any ports
    - Regional Internal: load balancing of traffic within a VPC
* **Cloud DNS**: GCP's managed DNS service, supporting CLI, Console, or API
* **Cloud CDN**: Google's globally distributed edge caches
* Google supports many interconnect options, including VPN (over internet), direct peering (private connection w/o), carrier peering, dedicated interconnect (private connections w/ SLA)

### Demonstration, lab activity, and quiz

```
# display a list of all the zones in specific region
gcloud compute zones list | grep us-central1

# set default zone
gcloud config set compute/zone us-central1-b

# create compute instance
gcloud compute instances create "my-vm-2" \
--machine-type "n1-standard-1" \
--image-project "debian-cloud" \
--image-family "debian-10" \
--subnet "default"

# connect to another VM in another region
ssh my-vm-1.us-central1-a

# setup a webserver w/ static page
sudo apt-get install nginx-light -y
sudo vim /var/www/html/index.nginx-debian.html
```

## Storage in the Cloud

### Cloud Storage

### Cloud Bigtable

### Cloud SQL and Cloud Spanner

### Cloud Datastore

### Comparing Storage Options

### Demonstration, lab activity, and quiz

## Containers in the Cloud

### Containers, Kubernetes, and Kubernetes Engine

### Lab: Demonstration, activity, and quiz

## Applications in the Cloud

### Module introduction; introduction to App Engine

### App Engine Standard Environment

### App Engine Flexible Environment

### Cloud Endpoints and Apigee Edge

### Demonstration, lab activity, and quiz

## Developing, Deploying and Monitoring in the Cloud

### Development in the Cloud

### Deployment: Infrastructure as code

### Monitoring: Proactive instrumentation

### Demonstration, lab activity, and quiz

## Big Data and Machine Learning in the Cloud

### Module introduction

### Google Cloud Big Data Platform

### Google Cloud Machine Learning Platform

### Demonstration, lab activity, and quiz

## Summary and Review

### Course review

### Next Steps
