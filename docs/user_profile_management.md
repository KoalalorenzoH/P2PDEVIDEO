# User Profile Management

## Overview
User Profile Management is a crucial feature of the P2PDEVIDEO application, allowing users to manage their profiles effectively. This documentation outlines the functionalities, API endpoints, and usage of the user profile management system.

## Features
- **Profile Creation**: Users can create a new profile.
- **Profile Retrieval**: Users can view their profile information.
- **Profile Update**: Users can update their profile information, including username, email, and other personal details.
- **Profile Deletion**: Users can delete their profile if needed.
  
## API Endpoints

### 1. Create User Profile
- **Endpoint**: `POST /api/user/profile`
- **Description**: Creates a new user profile.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "bio": "string"
  }
  ```
- **Responses**:
  - `201 Created` - Profile created successfully.
  - `400 Bad Request` - Validation error.

### 2. Retrieve User Profile
- **Endpoint**: `GET /api/user/profile`
- **Description**: Retrieves the current user's profile information.
- **Responses**:
  - `200 OK` - Successful retrieval of profile data.
  - `404 Not Found` - Profile does not exist.

### 3. Update User Profile
- **Endpoint**: `PUT /api/user/profile`
- **Description**: Updates the current user's profile information.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "bio": "string"
  }
  ```
- **Responses**:
  - `200 OK` - Profile updated successfully.
  - `400 Bad Request` - Validation error.

### 4. Delete User Profile
- **Endpoint**: `DELETE /api/user/profile`
- **Description**: Deletes the current user's profile.
- **Responses**:
  - `204 No Content` - Profile deleted successfully.
  - `404 Not Found` - Profile does not exist.

## Validation
Ensure that all inputs are validated on both client and server sides to prevent any invalid data from being processed.

## Conclusion
The user profile management system is designed to provide users with a seamless experience in managing their personal information. Proper API handling and validation are vital to maintaining the integrity of the user data.