# Learn DevOps: CI/CD with Jenkins using Pipelines and Docker

Notes from the [Udemy course](https://www.udemy.com/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker), along with supplemental related information.

## Notes
* I'm using OS X, and have adjusted many commands to work better with my OS

## Docker
* **Container** is a running instance of an **image**
* **Docker engine** has the ability to run containers
  - Runs a Linux VM in the background
  - Containers share resources; same kernel, though they appear isolated
* Fetch images on [Docker Hub](https://hub.docker.com/)
* **jessie** dists more feature rich, **alpine** smaller footprint and more secure
* Cannot change parameters of existing container, even if stopped
* Don't put data in container; map data into containers with **volumes**
* Useful commands:

| Command        | Desc           |
| :------------- |:-------------|
| `docker images` | list images |
| `docker pull nginx:1.14.0-alpine` | fetch image |
| `docker run ...` | |
| `docker logs <container-name>` | troubleshoot any issues with container |
| `docker exec -ti <container-name> /bin/sh` | open shell to container |
| `docker ps` | show running contains |
| `docker ps -a ` | show all containers, including stopped |
| `docker stop <container-name>` | stop container |
| `docker rm <container-name>` | remove container |
| `docker rmi <image-name>` | remove image |

* Sample `run` commands:
```bash
docker run --name nginx-bescom  -v /Users/bryan/Developer/bryanesmith.com/www/public_html:/usr/share/nginx/html:ro -p 8080:80 -d nginx
```

* Useful `run` parameters:

| Argument       | Desc           |
| :------------- | :------------- |
| `--add-host <hostname>:<ip>` | Adds entry to `/etc/hosts` |
| `-d` | Runs in background |
| `--restart always` | Will restart container on reboot |
| `--name foo` | Specify a friendly name for the container |
| `-p <host-port>:<container-port>` | Maps host port to a container port |
| `-v <host-path>:<container-path>` | Mounts host directory in container |

## Run Jenkins in a Docker container
* Installing Jenkins via [instructor's script](https://raw.githubusercontent.com/wardviaene/jenkins-course/master/scripts/install_jenkins.sh)
* One-time setup to run Jenkins:
```bash
sudo mkdir /Users/jenkins               # OS X see below
sudo chown -R $(whoami) /Users/jenkins  # docker container will run as current user
docker pull jenkins/jenkins:lts         # latest long-term support image
```
* Running Jenkins on `http://localhost:9000`:
```bash
docker run -p 9000:8080 -p 50000:50000 -v /Users/jenkins:/var/jenkins_home -d --name jenkins --restart always jenkins/jenkins:lts
```
* In OS X, mountable directories are whitelisted; you will get errors if you choose something that is not supported, e.g., `/var/jenkins`. See: Preferences > File Sharing

## Creating a job manually using Freestyle project
1. Click "New item"
2. Add a name and select "Freestyle project"
3. Setup Git over SSH (see Misc section below)
4. Under build, add a build shell step

## Misc

### Setup Git over SSH
1. Connect to Jenkins host:
```bash
docker exec -ti jenkins /bin/sh
```
2. Create a new SSH key on the Jenkins host:
```
ssh-keygen
```
3. Add the SSH public key to GitHub or the server hosting the Git repo over SSH.
    - If using your own server, SSH in and add public certificate to `~/.ssh/authorized_keys`
4. In Jenkins, under project settings > Source Code Management, select Git
    a. Set "Repository URL"
    b. Next to Credentials, press "Add" button next to
        i. From "Kind" dropdown, select "SSH Username with private key"
        ii. For "Username", specify the account username into which you'll SSH
        iii. For "Private Key", select "From the Jenkins master ~/.ssh"
        iv. Click add
    c. For "Credentials", select the credentials you just added from the dropdown
