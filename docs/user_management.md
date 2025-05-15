# User Management Documentation

## Overview

The User Management feature in the P2PDEVIDEO project allows users to register, log in, and manage their profiles. This documentation provides an overview of the user management functionalities, including registration, authentication, and profile management.

## Features

### 1. User Registration
- Users can create an account by providing necessary information such as email, password, and username.
- The registration process includes email verification to ensure the validity of the user's email address.

### 2. User Login
- Users can log in using their registered email and password.
- The application supports secure authentication mechanisms to protect user credentials.

### 3. User Profile Management
- Users can update their profiles, including changing passwords and updating personal information.
- Role-based access control is implemented to manage user permissions effectively.

## API Endpoints

### User API (`src/api/user.js`)
- **POST /api/register**: Registers a new user.
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "password": "password",
      "username": "username"
    }
    ```
  - **Response**: 201 Created or appropriate error message.

- **POST /api/login**: Authenticates a user and returns a token.
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```
  - **Response**: 200 OK with user details and token or appropriate error message.

- **PUT /api/user/profile**: Updates user profile information.
  - **Request Body**: 
    ```json
    {
      "username": "new_username",
      "password": "new_password"
    }
    ```
  - **Response**: 200 OK or appropriate error message.

## Security Considerations
- User passwords are stored securely using hashing algorithms.
- Implement OAuth 2.0 for secure token-based authentication.

## Conclusion

This documentation outlines the key functionalities of the User Management feature. For detailed implementation, refer to the `src/api/user.js` file which contains the actual API logic.

For any issues or further enhancements, feel free to contribute to the project repository or reach out to the development team.