# CodeCraftHub - User Management Service

This repository contains the backend User Management Service for the CodeCraftHub personalized learning platform. This service handles user registration, login, and profile management, and is designed to be deployed using Docker.

**This project was developed as the final project for the IBM course "Generative AI: Elevate Your Software Development Career".**

## Technologies Used

* Node.js (Express.js)
* MongoDB
* JWT for authentication
* Docker
* Docker Compose

## Getting Started

Follow these steps to set up and run the User Management Service using Docker Compose.

### Prerequisites

* Docker Desktop (or Docker Engine and Docker Compose) installed on your system.
* Git installed.

### Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Kxtss/CodeCraftHub.git](https://github.com/Kxtss/CodeCraftHub.git)
    cd CodeCraftHub/user-management-service
    ```

2.  **Environment Variables:**
    Create a `.env` file in the `user-service/` directory with the following content. **This file should NOT be committed to Git.**

    ```
    # user-service/.env
    MONGODB_URI=mongodb://root:YOUR_MONGODB_PASSWORD@172.21.XX.XX:27017 # Your Skills Network Labs MongoDB URI or a local URI
    JWT_SECRET=YOUR_SECURE_JWT_SECRET # Use a strong, random string
    PORT=5000
    ```
    * **Important:** If using Docker Compose for MongoDB, the `MONGODB_URI` will be handled by `docker-compose.yml` and point to the `mongo` service name. The `.env` might primarily be for local non-Docker development or other secrets. For Docker Compose, `JWT_SECRET` is defined directly in `docker-compose.yml`.

3.  **Run with Docker Compose:**
    Navigate to the `user-management-service/` directory (where `docker-compose.yml` is located) and run:

    ```bash
    docker-compose up --build
    ```
    This command will:
    * Build the Docker image for the `user-service` based on its `Dockerfile`.
    * Start the `user-service` container.
    * Start the `mongo` (MongoDB) database container.
    * Map port `5000` from the `user-service` container to port `5000` on your host machine.

    You should see output indicating that MongoDB is connected and the server is running on port 5000.

## API Endpoints

Once the services are running, you can test the API endpoints using `curl` or Postman. The base URL for the API will be `http://localhost:5000`.

### 1. Register User

* **Method**: `POST`
* **URL**: `/api/users/register`
* **Headers**: `Content-Type: application/json`
* **Body**:
    ```json
    {
        "username": "test_user",
        "email": "test@example.com",
        "password": "securepassword123"
    }
    ```
* **`curl` Example**:
    ```bash
    curl -X POST \
      http://localhost:5000/api/users/register \
      -H 'Content-Type: application/json' \
      -d '{
        "username": "test_user",
        "email": "test@example.com",
        "password": "securepassword123"
      }'
    ```

### 2. Login User

* **Method**: `POST`
* **URL**: `/api/users/login`
* **Headers**: `Content-Type: application/json`
* **Body**:
    ```json
    {
        "email": "test@example.com",
        "password": "securepassword123"
    }
    ```
* **`curl` Example**:
    ```bash
    curl -X POST \
      http://localhost:5000/api/users/login \
      -H 'Content-Type: application/json' \
      -d '{
        "email": "test@example.com",
        "password": "securepassword123"
      }'
    ```
    * **Note**: Copy the `token` from the response for the next step.

### 3. Get User Profile

* **Method**: `GET`
* **URL**: `/api/users/profile`
* **Headers**:
    * `Content-Type: application/json`
    * `x-auth-token: YOUR_JWT_TOKEN`
* **`curl` Example**:
    ```bash
    curl -X GET \
      http://localhost:5000/api/users/profile \
      -H 'Content-Type: application/json' \
      -H 'x-auth-token: <PASTE_YOUR_JWT_TOKEN_HERE>'
    ```

## Stopping Services

To stop the running Docker containers:

```bash
docker-compose down