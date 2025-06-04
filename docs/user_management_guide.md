# User Management Guide

## Overview
This guide provides detailed information about the user management features implemented in the P2PDEVIDEO application. User management includes functionalities such as registration, login, authentication, and user profiling. This document will help developers understand how to use and extend these features.

## Features
### 1. User Registration
- **Endpoint**: `/api/register`
- **Method**: POST
- **Description**: Allows new users to create an account by providing their email, password, and optional profile information.
- **Request Body**:
  ```json
  {
      "email": "user@example.com",
      "password": "securePassword",
      "profileInfo": {"displayName": "User Name"}
  }
  ```
- **Response**:
  - `201 Created`: User successfully registered.
  - `400 Bad Request`: Validation error.

### 2. User Login
- **Endpoint**: `/api/login`
- **Method**: POST
- **Description**: Authenticates a user and returns a token for session management.
- **Request Body**:
  ```json
  {
      "email": "user@example.com",
      "password": "securePassword"
  }
  ```
- **Response**:
  - `200 OK`: Returns an authentication token.
  - `401 Unauthorized`: Invalid credentials.

### 3. User Profile Management
- **Endpoint**: `/api/user/profile`
- **Method**: GET/PUT
- **Description**: Retrieves or updates user profile information.
- **Response**:
  - `200 OK`: Returns user profile data.
  - `204 No Content`: User profile successfully updated.

### 4. Role Management
- **Description**: Users can have multiple roles (e.g., admin, viewer). Role-based access control is implemented to restrict access to certain features based on user roles.

## Middleware
The application uses middleware for authentication, ensuring that only logged-in users can access certain endpoints. The middleware checks for a valid token in the request headers.

## Security Considerations
- Passwords are hashed before storage using bcrypt.
- Tokens are generated using JSON Web Tokens (JWT) for secure session management.

## Conclusion
This guide serves as a foundational document for understanding user management in the P2PDEVIDEO application. Developers can refer to this guide to implement or extend user management features as needed. For further information, please refer to the codebase and API documentation.