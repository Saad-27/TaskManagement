# Task Management Application

This project is a Task Management Application that allows users to manage tasks and projects. It includes several microservices, each responsible for different functionalities.

## Microservices

### 1. Frontend
- **Framework**: React
- **Description**: The frontend of the application, built with Create React App.
- **Port**: 3000
- **Dockerfile**: `frontend/Dockerfile`
- **Key Components**:
  - `TaskForm.js`: Handles task creation and updates.
  - `ProjectForm.js`: Handles project creation.
  - `AnalyticsDashboard.js`: Displays analytics data.

### 2. Node Backend
- **Framework**: Express.js
- **Description**: Handles task-related operations.
- **Port**: 5000
- **Dockerfile**: `node-backend/Dockerfile`
- **Database**: MongoDB
  
- **Framework**: Express
- **Description**: Handles task-related operations.
- **Port**: 8000
- **Dockerfile**: `backend/Dockerfile`
- **Database**: PostgreSQL

### 3. Project Service
- **Framework**: Spring Boot
- **Description**: Manages projects.
- **Port**: 8080
- **Dockerfile**: `project-service/Dockerfile`
- **Database**: H2 (in-memory)

### 4. Notification Service
- **Framework**: Gin (Go)
- **Description**: Sends notifications for task updates, deadlines, or reminders.
- **Port**: 8082
- **Dockerfile**: `notification-service/Dockerfile`

### 5. Analytics Service
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
   ```

2. **Build and run the services**:
   ```sh
   docker-compose up --build
   ```
3. **Access the application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Node Backend: [http://localhost:5000](http://localhost:5000)
   - Project Service: [http://localhost:8080](http://localhost:8080)
   - Notification Service: [http://localhost:8082](http://localhost:8082)
   - Analytics Service: [http://localhost:4567](http://localhost:4567)

## Important Notes

- Ensure Docker and Docker Compose are installed on your machine.
- The frontend communicates with the backend services using Axios.
- The Notification Service uses Gin to handle HTTP requests and send notifications.
- The Analytics Service uses Sinatra to handle HTTP requests and interacts with PostgreSQL.
