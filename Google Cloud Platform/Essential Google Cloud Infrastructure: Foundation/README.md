# Essential Google Cloud Infrastructure: Foundation

## Week 1

### Understand how to navigate the course

#### Course Introduction

#### Welcome to Essential Cloud Infrastructure: Foundation

### Overview

#### Module Overview

### Using Google Cloud

#### Using Google Cloud

* Four ways to interact with GCP
    1. Google Cloud Platform Console
    2. Cloud Shell and Cloud SDK
    3. REST-based API
    4. Cloud Mobile App

#### Lab Intro: Console and Cloud Shell

#### Getting Started with Google Cloud Platform and Qwiklabs

#### Lab: Working with GCP Cloud Console and Cloud Shell

* Cloud shell provides the following:
    - Temporary Compute Engine VM
    - Command-line access to the instance via a browser
    - 5 GB of persistent disk storage ($HOME dir)
    - Pre-installed Cloud SDK and other tools
    - **gcloud**: for working with Compute Engine and many Google Cloud services
    - **gsutil**: for working with Cloud Storage
    - **kubectl**: for working with Google Kubernetes Engine and Kubernetes
    - **bq**: for working with BigQuery
    - Language support for Java, Go, Python, Node.js, PHP, and Ruby
    - Web preview functionality
    - Built-in authorization for access to resources and instances
* After 1 hour of inactivity, the Cloud Shell instance is recycled. Only the /home directory persists. Any changes made to the system configuration, including environment variables, are lost between sessions.

```
gsutil mb gs://xncjrtlpx2
gsutil cp v.gif gs://xncjrtlpx2

gcloud compute regions list  # list available regions

# storing envvars in config file
mkdir infraclass
touch infraclass/config
INFRACLASS_REGION=us-east4
echo INFRACLASS_REGION=$INFRACLASS_REGION >> ~/infraclass/config
INFRACLASS_PROJECT_ID=qwiklabs-gcp-04-8f89d0dbdea8
echo INFRACLASS_PROJECT_ID=$INFRACLASS_PROJECT_ID >> ~/infraclass/config
source infraclass/config
echo $INFRACLASS_PROJECT_ID

# vim .profile and add line:
#   source infraclass/config
```

#### Lab Review: Console and Cloud Shell

#### Lab Intro: Infrastructure Preview

#### Lab: Infrastructure Preview

* Marketplace: "Jenkins Certified by Bitnami"

#### Lab Review: Infrastructure Preview

#### Demo: Projects

* Resources can only be created and used within Projects
* Project shutdown takes 30 days (in case you change your mind)

```
gcloud config list | grep project  # get current project
gcloud config set project some-project-id
```

### Review

#### Module Quiz

#### Module Review

### Overview

### Virtual Private Cloud

### Common network designs

### Review

## Week 2
