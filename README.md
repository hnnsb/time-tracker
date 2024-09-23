# Time Tracker Project

## Description

This project is a time tracker that allows users to track their time spent on different tasks. The user can add, edit,
and delete tasks

## Build

The app is build as a docker image, that consists of an nginx server that hosts the web app. All persistence is saved to
the local storage of the browser.

## Distribution

With every release a the artifacts are build and published with it. Alternatively a docker image is built and pushed to 
[docker hub](https://hub.docker.com/repository/docker/hnnsb/time-tracker/general).
You can start the app as a docker container, and it will be available on `localhost:<PORT>` with the following commands.
Choose a port that is not conflicting with any other service on your machine.

```sh
docker pull hnnsb/time-tracker-offline:latest
docker run -p <PORT>:80 hnnsb/time-tracker-offline:latest
```

Ports that are often occupied are:

- 80: HTTP (web servers)
- 443: HTTPS (web servers)
- 3000: Node.js / Express.js, React (Create React App), Ruby on Rails (Puma server)
- 8080: Node.js / Express.js, Vue.js (Vue CLI), PHP (alternative for built-in server), Docker containers
- 4200: Angular (Angular CLI)
- 8000: Django (Python), PHP (Built-in server), Laravel (PHP)
- 5000: Flask (Python)
- 3306: MySQL (Database)
- 5432: PostgreSQL (Database)
- 27017: MongoDB (Database)
- 6379: Redis (Database)
- 9200: Elasticsearch
- 5672: RabbitMQ
