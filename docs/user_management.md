# User Management Documentation

## Overview
The User Management feature is a crucial component of the P2PDEVIDEO application, providing functionalities for user registration, authentication, and profile management. This document outlines the various aspects of user management, including how to use the API endpoints and the expected behaviors.

## Features
- **User Registration**: Allows new users to create an account with the application.
- **User Authentication**: Supports login functionality using OAuth 2.0.
- **User Profile Management**: Enables users to view and update their profiles.
- **Role Management**: Implements role-based access control for different user roles.

## API Endpoints

### 1. User Registration
- **Endpoint**: `POST /api/users/register`
- **Request Body**:
  ```json
  {
      "username": "string",
      "email": "string",
      "password": "string"
  }
  ```
- **Response**:
  - **201 Created**: User successfully registered.
  - **400 Bad Request**: Validation errors or user already exists.

### 2. User Authentication
- **Endpoint**: `POST /api/users/login`
- **Request Body**:
  ```json
  {
      "email": "string",
      "password": "string"
  }
  ```
- **Response**:
  - **200 OK**: Returns a JWT token for authenticated sessions.
  - **401 Unauthorized**: Invalid credentials.

### 3. User Profile Management
- **Endpoint**: `GET /api/users/profile`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - **200 OK**: Returns user profile details.

### 4. Update User Profile
- **Endpoint**: `PUT /api/users/profile`
- **Request Body**:
  ```json
  {
      "username": "string",
      "email": "string"
  }
  ```
- **Response**:
  - **200 OK**: Successfully updated user profile.
  - **400 Bad Request**: Validation errors.

## Error Handling
The API follows standard HTTP status codes to indicate the success or failure of requests. Common error responses include:
- **400 Bad Request**: Input validation errors.
- **401 Unauthorized**: Access token is missing or invalid.
- **404 Not Found**: Resource not found.

## Conclusion
This documentation serves as a guide for developers and users to understand the user management features of the P2PDEVIDEO application. For further assistance, refer to the source code in `src/controllers/userController.js` for implementation details.
