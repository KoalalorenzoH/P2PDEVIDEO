/**
 * @file userRoleRoutes.js
 * @description API routes for user role management.
 * Defines endpoints to manage user roles such as creating, retrieving, updating, and deleting roles.
 * 
 * This module uses Express router and exports it for use in the main server application.
 */

const express = require('express');
const router = express.Router();

// Import userRoleManagementController to handle role management logic
const userRoleManagementController = require('../controllers/userRoleManagementController');

// Middleware for role validation and authorization can be added here if applicable

/**
 * @route GET /roles
 * @desc Get all user roles
 * @access Public or Protected based on middleware (to be added)
 */
router.get('/roles', userRoleManagementController.getAllRoles);

/**
 * @route GET /roles/:id
 * @desc Get a user role by ID
 * @access Public or Protected
 */
router.get('/roles/:id', userRoleManagementController.getRoleById);

/**
 * @route POST /roles
 * @desc Create a new user role
 * @access Protected (admin or role manager)
 */
router.post('/roles', userRoleManagementController.createRole);

/**
 * @route PUT /roles/:id
 * @desc Update an existing user role
 * @access Protected (admin or role manager)
 */
router.put('/roles/:id', userRoleManagementController.updateRole);

/**
 * @route DELETE /roles/:id
 * @desc Delete a user role
 * @access Protected (admin or role manager)
 */
router.delete('/roles/:id', userRoleManagementController.deleteRole);

module.exports = router;
