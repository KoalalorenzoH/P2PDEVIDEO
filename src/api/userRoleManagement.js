/**
 * src/api/userRoleManagement.js
 *
 * API for managing user roles
 *
 * Provides endpoints to create, read, update, and delete user roles.
 *
 * This API serves as the interface between client requests and the userRoleManagementController,
 * adhering to RESTful design principles.
 */

const express = require('express');
const router = express.Router();

// Import the controller that handles the business logic for user role management
const userRoleManagementController = require('../controllers/userRoleManagementController');

// Middleware for authentication and authorization can be added here if needed
// For example, to protect routes, import and use auth middleware
// const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route GET /api/user-roles
 * @desc Get all user roles
 * @access Public or Protected (depending on middleware usage)
 */
router.get('/', userRoleManagementController.getAllRoles);

/**
 * @route GET /api/user-roles/:id
 * @desc Get a single user role by ID
 * @access Public or Protected
 */
router.get('/:id', userRoleManagementController.getRoleById);

/**
 * @route POST /api/user-roles
 * @desc Create a new user role
 * @access Protected
 */
router.post('/', userRoleManagementController.createRole);

/**
 * @route PUT /api/user-roles/:id
 * @desc Update an existing user role
 * @access Protected
 */
router.put('/:id', userRoleManagementController.updateRole);

/**
 * @route DELETE /api/user-roles/:id
 * @desc Delete a user role
 * @access Protected
 */
router.delete('/:id', userRoleManagementController.deleteRole);

module.exports = router;
