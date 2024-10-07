# Time Tracker

Track the time you spend on task. Create tasks and categorize them.

The app is distributed as a desktop app for windows (other platforms are not supported yet). 
Alternatively you can run the app in your browser via a docker container.

## Getting Started

With every release new artifacts are build and published. This includes an installer for windows that is attached to the release and a docker image which is pushed to [docker hub](https://hub.docker.com/repository/docker/hnnsb/time-tracker/general).
You can start the app as a docker container, and it will be available on `localhost:<PORT>` with the following commands.
Choose a port that is not conflicting with any other service on your machine.

```sh
docker pull hnnsb/time-tracker:latest
docker run -p <PORT>:80 hnnsb/time-tracker:latest
```