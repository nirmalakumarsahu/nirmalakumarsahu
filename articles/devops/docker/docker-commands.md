# Docker Complete Commands Guide

[Articles](https://nirmalakumarsahu.in/devops.html) | [My Profile](https://nirmalakumarsahu.in)

[![Docker](https://img.shields.io/badge/Docker-Containerization-blue?logo=docker)](https://www.docker.com/) [![Containerization](https://img.shields.io/badge/Containerization-Software%20Packaging-blue?logo=docker)](https://www.docker.com/)

[![DevOps](https://img.shields.io/badge/DevOps-Culture-blue?logo=dev.to)](https://en.wikipedia.org/wiki/DevOps)

---

## Index

- [Basic Docker Commands](#-basic-docker-commands)
- [Docker Image Commands](#-docker-image-commands)
- [Docker Container Commands](#-docker-container-commands)
- [Docker Network Commands](#-docker-network-commands)
- [Docker Volume Commands](#-docker-volume-commands)
- [Docker Compose Commands](#-docker-compose-commands)
- [Docker Swarm Commands](#-docker-swarm-commands)
- [Conclusion](#-conclusion)

---

## 🔧 Basic Docker Commands

| Command                 | Flags                                          | Description                                                                                               | Example                            |
| ----------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `docker info`           | –                                              | Displays system-wide information about Docker, including running containers, images, storage driver, etc. | `docker info`                      |
| `docker version`        | –                                              | Shows the version details of the Docker client and server (engine).                                       | `docker version`                   |
| `docker login`          | `--username`, `--password`, `--password-stdin` | Authenticates to a Docker registry (e.g., Docker Hub or private registry).                                | `docker login --username user123`  |
| `docker logout`         | –                                              | Logs out from a Docker registry.                                                                          | `docker logout`                    |
| `docker help <command>` | –                                              | Displays help and available options for a specific Docker command.                                        | `docker help run`                  |
| `docker system df`      | –                                              | Displays disk usage by Docker (containers, images, volumes, and build cache).                             | `docker system df`                 |
| `docker system prune`   | `-a`, `--volumes`                              | Removes all unused containers, networks, images, and optionally volumes to free space.                    | `docker system prune -a --volumes` |

### [🔝 Back to Top](#index)

---

## 📦 Docker Image Commands

| Command                             | Flags                                 | Description                                                            | Example                                 |
| ----------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------- |
| `docker images`                     | `-a`, `--digests`, `--no-trunc`       | Lists all locally stored Docker images.                                | `docker images -a`                      |
| `docker pull <image>`               | `--all-tags`, `--platform`            | Downloads an image or a repository from a registry.                    | `docker pull nginx:latest`              |
| `docker build -t <name:tag> <path>` | `--file`, `--no-cache`, `--build-arg` | Builds a Docker image from a Dockerfile located at a specified path.   | `docker build -t myapp:1.0 .`           |
| `docker tag <source> <target>`      | –                                     | Tags an existing image with a new name and optionally a new tag.       | `docker tag myapp:1.0 myrepo/myapp:1.0` |
| `docker push <image:tag>`           | `--disable-content-trust`             | Uploads a tagged image to a Docker registry.                           | `docker push myrepo/myapp:1.0`          |
| `docker rmi <image>`                | `-f`, `--no-prune`                    | Deletes one or more local Docker images.                               | `docker rmi myapp:1.0`                  |
| `docker image prune`                | `-a`, `--force`, `--filter`           | Removes dangling or unused images.                                     | `docker image prune -a --force`         |
| `docker inspect <image>`            | `--format`                            | Displays detailed low-level information about an image in JSON format. | `docker inspect myapp:1.0`              |
| `docker history <image>`            | `--no-trunc`, `--quiet`               | Shows the history of an image’s layers and commands.                   | `docker history myapp:1.0`              |

### [🔝 Back to Top](#index)

---

## 📦 Docker Container Commands

| Command                               | Flags                                                 | Description                                                               | Example                                    |
|---------------------------------------|-------------------------------------------------------|---------------------------------------------------------------------------|--------------------------------------------|
| `docker ps`                           | `-a`, `-q`, `--no-trunc`                              | Lists running containers or all containers with their status and details. | `docker ps -a`                             |
| `docker run <image>`                  | `-d`, `-p`, `--name`, `-v`, `--rm`, `-e`, `--network` | Creates and starts a container from an image with specified options.      | `docker run -d -p 80:80 --name sping-boot-db` |
| `docker start <container>`            | `-a`, `-i`                                            | Starts one or more stopped containers.                                    | `docker start webserver`                   |
| `docker stop <container>`             | `-t`                                                  | Gracefully stops a running container after a timeout.                     | `docker stop webserver`                    |
| `docker restart <container>`          | –                                                     | Restarts a container by stopping and starting it again.                   | `docker restart webserver`                 |
| `docker rm <container>`               | `-f`, `-v`                                            | Deletes one or more containers. Optionally removes volumes.               | `docker rm -f webserver`                   |
| `docker exec -it <container> <cmd>`   | `-i`, `-t`                                            | Runs a command inside a running container with an interactive terminal.   | `docker exec -it webserver /bin/bash`      |
| `docker logs <container>`             | `-f`, `--tail`, `--since`, `--timestamps`             | Displays log output from a running or stopped container.                  | `docker logs -f webserver`                 |
| `docker inspect <container>`          | `--format`                                            | Shows detailed configuration and status of a container in JSON.           | `docker inspect webserver`                 |
| `docker export <container>`           | –                                                     | Exports a container’s filesystem as a tar archive.                        | `docker export webserver > webserver.tar`  |
| `docker commit <container> <image>`   | `-a`, `-m`, `--change`                                | Creates a new image from the container’s current state.                   | `docker commit webserver myapp:1.1`        |
| `docker rename <old> <new>`           | -                                                     | Rename a container.                                                       | `docker rename spring-boot spring-boot-3`  |
| `docker cp <container>:<src> <dest>`  | -                                                     | Copy files from container to host.                                        | `docker cp webserver:/var/logs ./logs`      |
| `docker stats`                       | -                                                     | Show real-time usage stats for containers.                                | `docker stats`                                 |
| `docker top <container>`              | -                                                     | Show running processes in container.                                      | `docker top webserver`                        |

### [🔝 Back to Top](#index)

---

## 🌐 Docker Network Commands

| Command                         | Flags                               | Description                                    | Example                                           |
| ------------------------------- |-------------------------------------| ---------------------------------------------- | ------------------------------------------------- |
| `docker network ls`             | –                                   | Lists all Docker networks.                     | `docker network ls`                               |
| `docker network create <name>`  | `--driver`, `--subnet`, `--gateway` | Creates a new Docker network.                  | `docker network create --driver bridge mynetwork` |
| `docker network rm <name>`      | –                                   | Deletes one or more networks.                  | `docker network rm mynetwork`                     |
| `docker network inspect <name>` | –                                   | Displays detailed info about a Docker network. | `docker network inspect mynetwork`                |
| `docker network prune`          | –                                   | Removes all unused networks.                   | `docker network prune`                            |
| `docker network connect <net> <container>`  | -                                   | Connect container to a network.    | `docker network connect mynetwork webserver` |
| `docker network disconnect <net> <container>` | -                                   | Disconnect container from a network. | `docker network disconnect mynetwork webserver` |

### [🔝 Back to Top](#index)

---

## 📁 Docker Volume Commands

| Command                         | Flags       | Description                                                 | Example                          |
| ------------------------------- | ----------- | ----------------------------------------------------------- | -------------------------------- |
| `docker volume ls`              | –           | Lists all Docker volumes.                                   | `docker volume ls`               |
| `docker volume create <name>`   | –           | Creates a new volume.                                       | `docker volume create myvolume`  |
| `docker volume inspect <name>`  | –           | Displays detailed info about a specific volume.             | `docker volume inspect myvolume` |
| `docker volume rm <name>`       | –           | Deletes one or more volumes.                                | `docker volume rm myvolume`      |
| `docker system prune --volumes` | `--volumes` | Removes all unused volumes (along with other pruned items). | `docker system prune --volumes`  |

### [🔝 Back to Top](#index)

---

## ⚙️ Docker Compose Commands

| Command                    | Flags                               | Description                                                                     | Example                    |
| -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- | -------------------------- |
| `docker-compose --version` | –                                   | Shows the installed Docker Compose version.                                     | `docker-compose --version` |
| `docker-compose up`        | `-d`, `--build`, `--force-recreate` | Builds, (re)creates, and starts all containers defined in `docker-compose.yml`. | `docker-compose up -d`     |
| `docker-compose down`      | `-v`, `--rmi`, `--remove-orphans`   | Stops and removes all services defined in `docker-compose.yml`.                 | `docker-compose down -v`   |
| `docker-compose ps`        | –                                   | Lists containers managed by Compose.                                            | `docker-compose ps`        |
| `docker-compose images`    | –                                   | Lists images used by services.                                                  | `docker-compose images`    |
| `docker-compose stop`      | –                                   | Stops running services without removing containers.                             | `docker-compose stop`      |
| `docker-compose start`     | –                                   | Starts existing stopped services.                                               | `docker-compose start`     |
| `docker-compose restart`   | –                                   | Restarts services.                                                              | `docker-compose restart`   |
| `docker-compose logs`      | `-f`, `--tail`, `--timestamps`       | Displays logs from all services.                                                | `docker-compose logs -f`   |
| `docker-compose exec <svc> <cmd>` | –                                   | Executes a command in a running service container.                              | `docker-compose exec web bash` |
| `docker-compose run <svc> <cmd>`  | `--rm`, `-p`                        | Runs a command in a new container for a service.                               | `docker-compose run web bash` |
| `docker-compose config`     | `--services`, `--volumes`            | Validates and displays the Compose file.                                       | `docker-compose config`     |
| `docker-compose pull`       | `--ignore-pull-failures`             | Pulls service images from the registry.                                        | `docker-compose pull`       |
| `docker-compose push`       | `--ignore-push-failures`             | Pushes service images to the registry.                                         | `docker-compose push`       |
| `docker-compose scale <svc>=<num>` | –                                   | Scales a service to a specified number of replicas.                            | `docker-compose scale web=3` |
| `docker-compose rm`         | `-f`, `-s`                            | Removes stopped service containers.                                           | `docker-compose rm -f`      |
| `docker-compose top`        | –                                   | Displays the running processes in containers.                                  | `docker-compose top`        |

### [🔝 Back to Top](#index)

---

## 🐝 Docker Swarm Commands

| Command                                                    | Flags          | Description                                                       | Example                                           |
| ---------------------------------------------------------- | -------------- | ----------------------------------------------------------------- | ------------------------------------------------- |
| `docker swarm init`                                        | –              | Initializes a new Swarm and makes the current node a manager.     | `docker swarm init`                               |
| `docker swarm join --token <token>`                        | –              | Adds a new node (manager/worker) to the Swarm using a join token. | `docker swarm join --token SWMTKN-1-...`          |
| `docker swarm join-token worker`                           | –              | Displays the command to add a worker node.                        | `docker swarm join-token worker`                  |
| `docker service create --name <name> -p 8080:8080 <image>` | `--name`, `-p` | Deploys a service to the Swarm.                                   | `docker service create --name web -p 80:80 nginx` |
| `docker service scale <service>=<replicas>`                | –              | Scales a service up or down to the desired number of replicas.    | `docker service scale web=3`                      |
| `docker service ls`                                        | –              | Lists all services running in the Swarm.                          | `docker service ls`                               |
| `docker service rm <name>`                                 | –              | Removes a specific service.                                       | `docker service rm web`                           |
| `docker swarm leave`                                       | `--force`      | Leaves the Swarm (manager or worker node).                        | `docker swarm leave --force`                      |
| `docker node ls`                                           | –              | Lists all nodes in the Swarm.                                     | `docker node ls`                                  |
| `docker node promote <node>`                               | –              | Promotes a worker node to a manager.                              | `docker node promote worker1`                     |
| `docker node demote <node>`                                | –              | Demotes a manager node to a worker.                               | `docker node demote manager1`                    |
| `docker node update --availability <availability> <node>` | –              | Updates the availability of a node (active, pause, drain).         | `docker node update --availability drain worker1` |
| `docker stack deploy -c <file.yml> <stack>`                | –              | Deploys a stack of services defined in a Compose file.             | `docker stack deploy -c docker-compose.yml mystack` |

### [🔝 Back to Top](#index)

---

## 📝 Conclusion

- Docker is a powerful tool for containerization, and mastering its commands can significantly enhance your development and deployment workflows. This guide provides a comprehensive overview of the most commonly used Docker commands, helping you to efficiently manage images, containers, networks, and volumes.
- For more detailed information, refer to the official [Docker documentation](https://docs.docker.com/).

### 🔗 References
- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Swarm Documentation](https://docs.docker.com/engine/swarm/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)

### [🔝 Back to Top](#index)

### [Read More ➡️](https://nirmalakumarsahu.in/devops.html)

---
