/**
 * User Role Management API
 *
 * This module defines the API endpoints for managing user roles.
 * It provides routes for creating, reading, updating, and deleting user roles.
 *
 * The API uses Express router and controllers to handle the business logic.
 */

const express = require('express');
const router = express.Router();

// Import the UserRoleManagementController
const userRoleManagementController = require('../controllers/userRoleManagementController');

// Middleware for authentication and authorization can be added here
// For example: const authMiddleware = require('../middleware/authMiddleware');
// router.use(authMiddleware.verifyToken);

/**
 * @route   GET /user-roles
 * @desc    Get all user roles
 * @access  Protected (authentication and authorization middleware should be applied)
 */
router.get('/user-roles', userRoleManagementController.getAllRoles);

/**
 * @route   GET /user-roles/:id
 * @desc    Get a single user role by ID
 * @access  Protected
 */
router.get('/user-roles/:id', userRoleManagementController.getRoleById);

/**
 * @route   POST /user-roles
 * @desc    Create a new user role
 * @access  Protected
 */
router.post('/user-roles', userRoleManagementController.createRole);

/**
 * @route   PUT /user-roles/:id
 * @desc    Update an existing user role by ID
 * @access  Protected
 */
router.put('/user-roles/:id', userRoleManagementController.updateRole);

/**
 * @route   DELETE /user-roles/:id
 * @desc    Delete a user role by ID
 * @access  Protected
 */
router.delete('/user-roles/:id', userRoleManagementController.deleteRole);

module.exports = router;
