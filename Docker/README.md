# Docker

## Background
* Virtual machines have hypervisor, and each VM contains its own OS; containers share underlying OS
* Containers have less isolation than VMs
* Often us VMs for provisioning hosts, and containers for provisioning apps
* **dockerhub**: public Docker registry. [hub.docker.com](https://hub.docker.com/).
* **Image** used to create 1+ **containers**.

## Commands

### Image/container lifecycle

1. Fetch image
     ```sh
     docker pull ubuntu
     ```
2. Create container (run image)
    ```sh
    docker run -d ubuntu sleep 60
    ```
3. Either stop container, or it exits.
    ```sh
    docker stop <container-id>
    ```
4. Remove container
    ```sh
    docker rm <container-id>
    ```
5. Remove image
    ```sh
    docker rmi <image-id>
    ```

### General

| Command                   | Desc          |
| :------------------------ |:------------- |
| `docker version`          | Version and related metadata for client and server |

### Containers

| Command                   | Desc          |
| :------------------------ |:------------- |
| `docker run docker/whalesay cowsay boo` | Fetches image and runs it. Image is stored locally. (Defaults to `latest` tag.)|
| `docker run redis:4.0`    | Run with a tag |
| `docker run -it kodekloud/simple-prompt-docker` | `-i` for interactive mode (maps stdin), `-t` for psuedoterminal |
| `docker run --entrypoint sleep myapp 5` | Run while overriding the entry point. |
| `docker inspect forlorn_foo` | Dumps container info in JSON format |
| `docker ps`               | List running containers |
| `docker ps -a`            | List all containers, including stopped |
| `docker stop forlorn_foo` | Stop a running container |
| `docker rm forlorn_foo`   | Remove a container |

### Images

| Command                   | Desc          |
| :------------------------ |:------------- |
| `docker images`           | Lists locally-stored images |
| `docker rmi brittle_bar`  | Removes locally-stored image |
| `docker pull jenkins`     | Fetches an image without running it. |

### Running commands on running container

```sh
$ docker run -d ubuntu sleep 10
0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
$ docker exec 01234 cat /etc/hosts
```

Runs command `cat /etc/hosts` on docker container `01234`.

### Attaching a detached container

```sh
$ docker run -d ubuntu sleep 10
0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
$ docker logs 01234    # view stdout
$ docker attach 01234
```

The detached (background) container process is now attached (foregrounded) in terminal.

### Port mapping

* If there's a web app running in a container on port 8080, two options for accessing the app:
    - If you are on the Docker host, you can use the docker container's private IP. (E.g., `http://172.17.0.1:8080`)
    - Map port 8080 in the container to an open port on the Docker host (e.g., 9000), and access using the docker host's IP (e.g., `http://192.168.1.1:9000`)

```sh
docker run -p 9000:8080 kloudkode/simple-webapp
docker run -p 9001:8080 kloudkode/simple-webapp
```

### Volume mapping

```sh
docker run -v /opt/datadir:/var/lib/mysql mysql
```

### Environment variables

```sh
docker run -e FOO=BAR some-image
docker inspect 01234    # variables listed in /Config/Env
```

### Creating an image

1. Create a Dockerfile:
    ```
    FROM ubuntu

    RUN apt-get update
    RUN apt-get install python

    RUN pip install flask
    RUN pip install flask-mysql

    COPY . /opt/source-code

    ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
    ```
2. Create local Docker image:
    ```sh
    docker build -t myuser/myapp .
    # or: docker build Dockerfile -t myuser/myapp
    ```
3. Make available on Dockerhub:
    ```sh
    docker push myuser/myapp
    ```

## Dockerfile

* Instruction-Argument pairs (E.g., `FROM Ubuntu`)
* **Layered architecture**: each instruction is a separate layer
    - Each layer is cached
    - To view all of the layers and their associated size:
      ```
      docker history myuser/myapp
      ```

### Instructions

| Instruction      | Example          | Description      |
| :--------------- | :--------------- | :--------------- |
| `CMD`            | `CMD ["sleep", "5"]` | The default command or arguments. |
| &nbsp;           | `CMD sleep 5`     | &nbsp; |
| `ENTRYPOINT`     | `ENTRYPOINT["sleep"]` | Command. Takes arguments from run command. |

## Networking

* Three types:
    1. **bridge** (default): all containers share private network on host.
        - Creates internal **bridge network**, usually with IP address like `172.17.#.#`.
        - To share services on container with outside world, map ports with host.
    2. **none**: isolated network.
    3. **host**: uses the host network.
        - No need to map ports.
* Specify the network type:
  ```
  docker run ubuntu --network=none
  ```
* Can manually create bridge network:
  ```
  docker network create --driver bridge --subnet 182.18.0.0/16 custom-isolated-network
  docker network ls
  ```
* Can inspect network details with `docker inspect <container-name>`
* Docker has built-in DNS server (at `127.0.0.11`), so containers can resolve IPs when using container names:
  ```
  mysql.connect('mysql')
  ```
