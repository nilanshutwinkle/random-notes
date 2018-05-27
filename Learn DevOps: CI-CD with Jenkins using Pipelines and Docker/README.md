# Learn DevOps: CI/CD with Jenkins using Pipelines and Docker

Notes from the [Udemy course](https://www.udemy.com/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker), along with supplemental related information.

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
```bash
$ docker images                         # list images
$ docker pull nginx:1.14.0-alpine       # fetch image
$ docker run --name nginx-bescom  -v /Users/bryan/Developer/bryanesmith.com/www/public_html:/usr/share/nginx/html:ro -p 8080:80 -d nginx  # -d runs in background
$ docker logs nginx-bescom              # troubleshoot any issues with container
$ docker exec -ti nginx-bescom /bin/sh  # open shell to container
$ docker ps                             # show running contains
$ docker ps -a                          # show all containers, including stopped
$ docker stop nginx-bescom              # stop container
$ docker rm nginx-bescom                # remove container
$ docker rmi nginx                      # remove image
```

## Run Jenkins in a Docker container
* Installing Jenkins via [instructor's script](https://raw.githubusercontent.com/wardviaene/jenkins-course/master/scripts/install_jenkins.sh)
* One-time setup to run Jenkins:
```bash
sudo mkdir /Users/jenkins               # OS X see below
sudo chown -R $(whoami) /Users/jenkins  # docker container will run as current user
```
* Running Jenkins on `http://localhost:9000`:
```bash
docker run -p 9000:8080 -p 50000:50000 -v /Users/jenkins:/var/jenkins_home -d --name jenkins jenkins
```
* In OS X, mountable directories are whitelisted; you will get errors if you choose something that is not supported, e.g., `/var/jenkins`. See: Preferences > File Sharing
