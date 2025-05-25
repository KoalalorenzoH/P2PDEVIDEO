# User Management Features Documentation

## Overview
The User Management module is a crucial part of the P2PDEVIDEO application. It handles user registration, authentication, and profile management, supporting both verified and anonymous modes. This documentation outlines the features, implementation details, and usage of the User Management system.

## Features
- **User Registration**: Users can create accounts either as verified or anonymous users.
- **User Authentication**: The system uses OAuth 2.0 for secure authentication.
- **User Profiling**: Users can manage their profiles, including role management and parental controls.

## API Endpoints
### Register User
- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "username": "string",
      "password": "string",
      "email": "string"
  }
  ```
- **Response**:
  - `201 Created` on successful registration.
  - `400 Bad Request` if input validation fails.

### Login User
- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "username": "string",
      "password": "string"
  }
  ```
- **Response**:
  - `200 OK` with user info and token on successful login.
  - `401 Unauthorized` if credentials are invalid.

### Get User Profile
- **Endpoint**: `/api/user/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer {token}`
- **Response**:
  - `200 OK` with user profile data.

## Implementation Details
The User Management system is implemented in the following components:
- **Controllers**: Business logic for handling user requests (`userController.js`, `userRoleController.js`).
- **Models**: Data schemas for users and roles (`user.js`, `userModel.js`).
- **Routes**: Define endpoints for user management (`userRoutes.js`, `userRole.js`).

## Security Measures
- Passwords are hashed before storage using a secure hashing algorithm.
- Token-based authentication is used for session management.
- Role-based access control is implemented to manage user permissions.

## Future Enhancements
- Integration of parental controls for user accounts.
- Improved user interface for profile management.
- Additional endpoints for enhanced user interaction.

## Conclusion
The User Management system in P2PDEVIDEO is designed to provide a secure and flexible way to manage user accounts, ensuring a robust and user-friendly experience.