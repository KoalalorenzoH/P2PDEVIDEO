# User Role Management API Documentation

## Overview
The User Role Management API provides endpoints to manage user roles within the P2PDEVIDEO decentralized encrypted peer-to-peer video network. These endpoints enable administrators and authorized users to create, read, update, and delete roles and assign roles to users. The API supports role-based access control (RBAC) to enforce permissions and access rights.

## Base URL
```
/api/user-roles
```

## Authentication
All endpoints require authentication via OAuth 2.0 or token-based authentication middleware. Requests without valid authentication tokens will be rejected with a 401 Unauthorized response.

## Endpoints

### 1. Get All Roles
Retrieve a list of all user roles.

- **URL:** `/api/user-roles`
- **Method:** GET
- **Permissions Required:** `admin` or `role_manager`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
  ```json
  [
    {
      "id": "roleId1",
      "name": "admin",
      "description": "Administrator with full access"
    },
    {
      "id": "roleId2",
      "name": "viewer",
      "description": "General user with view permissions"
    }
  ]
  ```

### 2. Get Role by ID
Retrieve details of a specific role by its ID.

- **URL:** `/api/user-roles/:roleId`
- **Method:** GET
- **Permissions Required:** `admin` or `role_manager`
- **URL Parameters:**
  - `roleId` (string) - The unique identifier of the role
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
  ```json
  {
    "id": "roleId1",
    "name": "admin",
    "description": "Administrator with full access"
  }
  ```
- **Error Responses:**
  - **Code:** 404 Not Found
  - **Content:** `{ "error": "Role not found" }`

### 3. Create a New Role
Create a new user role.

- **URL:** `/api/user-roles`
- **Method:** POST
- **Permissions Required:** `admin`
- **Request Body:**
  ```json
  {
    "name": "editor",
    "description": "User with editing permissions"
  }
  ```
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
  ```json
  {
    "id": "newRoleId",
    "name": "editor",
    "description": "User with editing permissions"
  }
  ```
- **Error Responses:**
  - **Code:** 400 Bad Request
  - **Content:** `{ "error": "Role name already exists" }`

### 4. Update an Existing Role
Update details of an existing role.

- **URL:** `/api/user-roles/:roleId`
- **Method:** PUT
- **Permissions Required:** `admin`
- **URL Parameters:**
  - `roleId` (string) - The unique identifier of the role
- **Request Body:**
  ```json
  {
    "name": "editor",
    "description": "User with content editing permissions"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
  ```json
  {
    "id": "roleId",
    "name": "editor",
    "description": "User with content editing permissions"
  }
  ```
- **Error Responses:**
  - **Code:** 404 Not Found
  - **Content:** `{ "error": "Role not found" }`

### 5. Delete a Role
Delete a user role by ID.

- **URL:** `/api/user-roles/:roleId`
- **Method:** DELETE
- **Permissions Required:** `admin`
- **URL Parameters:**
  - `roleId` (string) - The unique identifier of the role
- **Success Response:**
  - **Code:** 204 No Content
- **Error Responses:**
  - **Code:** 404 Not Found
  - **Content:** `{ "error": "Role not found" }`

### 6. Assign Role to User
Assign a specific role to a user.

- **URL:** `/api/user-roles/assign`
- **Method:** POST
- **Permissions Required:** `admin` or `role_manager`
- **Request Body:**
  ```json
  {
    "userId": "userId123",
    "roleId": "roleId1"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{ "message": "Role assigned successfully" }`
- **Error Responses:**
  - **Code:** 400 Bad Request
  - **Content:** `{ "error": "User or role not found" }`

### 7. Remove Role from User
Remove a specific role from a user.

- **URL:** `/api/user-roles/remove`
- **Method:** POST
- **Permissions Required:** `admin` or `role_manager`
- **Request Body:**
  ```json
  {
    "userId": "userId123",
    "roleId": "roleId1"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{ "message": "Role removed successfully" }`
- **Error Responses:**
  - **Code:** 400 Bad Request
  - **Content:** `{ "error": "User or role not found" }`

## Error Handling
All error responses include a JSON object with an `error` field describing the issue.

## Notes
- Role names must be unique.
- Only users with appropriate permissions (`admin` or `role_manager`) can access or modify roles.
- Role assignment endpoints support multi-role users.

---

This API documentation refers to the implementation in `src/api/userRoleManagementRoutes.js` and related controllers.
