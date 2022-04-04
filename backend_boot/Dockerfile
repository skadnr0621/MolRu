# build-stage
FROM openjdk:11-jdk as build-stage
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew clean build

# production-stage
FROM openjdk:11-jdk as production-stage
ARG JAR_FILE=build/libs/molru-0.0.1-SNAPSHOT.jar
COPY --from=build-stage ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=prod" ,"-jar","/app.jar"]
