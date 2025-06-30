# Authentication Documentation

## Overview
This document provides a comprehensive guide to the authentication processes utilized in the P2PDEVIDEO application. It covers user registration, login, and token-based authentication mechanisms.

## User Registration
### API Endpoint
- **POST** `/api/auth/register`

### Request Body
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
### Description
Users can register by providing a username, email, and password. The server will validate the inputs and create a new user account if the validation passes.

### Responses
- **201 Created**: User registered successfully.
- **400 Bad Request**: Validation errors (e.g., missing fields, invalid email).

## User Login
### API Endpoint
- **POST** `/api/auth/login`

### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```
### Description
Users can log in using their email and password. Upon successful login, a JWT token will be issued.

### Responses
- **200 OK**: Login successful. Returns a JWT token.
- **401 Unauthorized**: Invalid credentials.

## Token-Based Authentication
### Overview
The application uses JSON Web Tokens (JWT) for authenticating users. Upon successful login, a JWT is issued which must be included in the headers of protected API requests.

### Example of Authorization Header
```
Authorization: Bearer <token>
```

### Token Validation
The server validates the token on each request to protected routes. Invalid or expired tokens will result in a **401 Unauthorized** response.

## Conclusion
This document outlines the authentication processes in P2PDEVIDEO. For further information, please refer to the API documentation or contact the development team.