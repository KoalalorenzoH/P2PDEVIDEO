/**
 * src/api/userRoleManagement.js
 *
 * API endpoints for managing user roles.
 * Provides CRUD operations for user roles management.
 *
 * This module uses Express router to define API routes.
 */

const express = require('express');
const router = express.Router();

// Assuming a userRoleController with the required methods exists
const userRoleController = require('../controllers/userRoleController');

// Middleware for authentication and authorization can be added here
// For example: const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/user-roles
 * @desc    Get all user roles
 * @access  Protected (Admin, or authorized roles)
 */
router.get('/', /* authenticate, authorizeRoles(['admin']), */ userRoleController.getAllRoles);

/**
 * @route   GET /api/user-roles/:id
 * @desc    Get a single user role by ID
 * @access  Protected
 */
router.get('/:id', /* authenticate, authorizeRoles(['admin']), */ userRoleController.getRoleById);

/**
 * @route   POST /api/user-roles
 * @desc    Create a new user role
 * @access  Protected (Admin)
 */
router.post('/', /* authenticate, authorizeRoles(['admin']), */ userRoleController.createRole);

/**
 * @route   PUT /api/user-roles/:id
 * @desc    Update an existing user role
 * @access  Protected (Admin)
 */
router.put('/:id', /* authenticate, authorizeRoles(['admin']), */ userRoleController.updateRole);

/**
 * @route   DELETE /api/user-roles/:id
 * @desc    Delete a user role
 * @access  Protected (Admin)
 */
router.delete('/:id', /* authenticate, authorizeRoles(['admin']), */ userRoleController.deleteRole);

module.exports = router;
