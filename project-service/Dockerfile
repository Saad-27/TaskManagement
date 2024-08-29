FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the project JAR file
COPY target/project-service-0.0.1-SNAPSHOT.jar /app/project-service.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "project-service.jar"]