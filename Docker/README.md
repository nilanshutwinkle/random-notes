# Docker

## Background
* Virtual machines have hypervisor, and each VM contains its own OS; containers share underlying OS
* Containers have less isolation than VMs
* Often us VMs for provisioning hosts, and containers for provisioning apps
* **dockerhub**: public Docker registry. [hub.docker.com](https://hub.docker.com/).
* **Image** used to create 1+ **containers**.

## Commands

### Containers

| Command                   | Desc          |
| :------------------------ |:------------- |
| `docker run docker/whalesay cowsay boo` | Fetches image and runs it. Image is stored locally. |
| `docker ps`               | List running containers |
| `docker ps -a`            | List all containers, including stopped |
| `docker stop forlorn_foo` | Stop a running container |

### Images

| Command                   | Desc          |
| :------------------------ |:------------- |
| `docker images`           | Lists locally-stored images |
| `docker rm brittle_bar`   | Removes locally-stored image |
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
$ docker attach 01234
```

The detached (background) container process is now attached (foregrounded) in terminal.
