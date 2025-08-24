/**
 * User Role Management Routes
 *
 * This module defines the API routes for managing user roles.
 * It connects HTTP endpoints to the userRoleManagementController methods.
 *
 * Routes:
 *  GET    /user-roles          - List all user roles
 *  GET    /user-roles/:id      - Get a specific user role by ID
 *  POST   /user-roles          - Create a new user role
 *  PUT    /user-roles/:id      - Update an existing user role
 *  DELETE /user-roles/:id      - Delete a user role
 *
 * Middleware for authentication and authorization can be applied here as needed.
 */

const express = require('express');
const router = express.Router();

const userRoleManagementController = require('../controllers/userRoleManagementController');

// Route to get all user roles
router.get('/user-roles', userRoleManagementController.getAllUserRoles);

// Route to get a user role by ID
router.get('/user-roles/:id', userRoleManagementController.getUserRoleById);

// Route to create a new user role
router.post('/user-roles', userRoleManagementController.createUserRole);

// Route to update an existing user role
router.put('/user-roles/:id', userRoleManagementController.updateUserRole);

// Route to delete a user role
router.delete('/user-roles/:id', userRoleManagementController.deleteUserRole);

module.exports = router;
