# Step 1: Build stage (using maven wrapper)
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy project files
COPY . .

# Run maven wrapper to build jar
RUN ./mvnw clean package -DskipTests

# Step 2: Runtime stage
FROM eclipse-temurin:21-jdk-slim

WORKDIR /app

# Copy only the final jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose default Spring Boot port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
