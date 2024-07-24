FROM gradle:8-jdk21 AS builder

WORKDIR /app
COPY build.gradle settings.gradle ./

RUN gradle dependencies --write-locks

# Copy the source code and build the application
COPY ./src ./src
RUN gradle clean build -x test

FROM openjdk:21-jdk-slim

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
EXPOSE 5005

ENTRYPOINT ["java", "-jar", "app.jar"]