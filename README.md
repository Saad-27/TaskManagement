# Task Management Application

This project is a Task Management Application that allows users to manage tasks and projects. It includes several microservices, each responsible for different functionalities.

## Microservices Overview

### 1. Frontend
- **Framework**: React
- **Description**: The frontend of the application, built with Create React App.
- **Port**: 3000
- **Dockerfile**: `frontend/Dockerfile`
- **Key Components**:
  - `TaskForm.js`: Handles task creation and updates.
  - `ProjectForm.js`: Handles project creation.
  - `AnalyticsDashboard.js`: Displays analytics data.

### 2. Node Backend (Express)
- **Framework**: Express.js
- **Description**: Handles task-related operations.
- **Port**: 5000
- **Dockerfile**: `node-backend/Dockerfile`
- **Database**: MongoDB

### 3. Django Backend (User Management)
- **Framework**: Django REST Framework
- **Description**: Manages user registration, authentication, and profile management.
- **Port**: 8000
- **Dockerfile**: `django-backend/Dockerfile`
- **Database**: PostgreSQL (or any database you choose)

### 4. Project Service
- **Framework**: Spring Boot
- **Description**: Manages projects.
- **Port**: 8080
- **Dockerfile**: `project-service/Dockerfile`
- **Database**: H2 (in-memory)

### 5. Notification Service
- **Framework**: Gin (Go)
- **Description**: Sends notifications for task updates, deadlines, or reminders.
- **Port**: 8082
- **Dockerfile**: `notification-service/Dockerfile`

### 6. Analytics Service
- **Framework**: Sinatra (Ruby)
- **Description**: Tracks and generates reports on task and project metrics.
- **Port**: 4567
- **Dockerfile**: `analytics-service/Dockerfile`
- **Database**: PostgreSQL

## Docker Compose

The `docker-compose.yml` file orchestrates the different services and their respective databases.

## Running the Application

1. **Clone the repository**:
   ```sh
   git clone "https://github.com/Saad-27/TaskManagementApp"
   cd TaskManagementApp
