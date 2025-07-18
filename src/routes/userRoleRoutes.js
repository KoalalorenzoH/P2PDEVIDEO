/**
 * @file userRoleRoutes.js
 * @description API routes for user role management
 * @module routes/userRoleRoutes
 */

const express = require('express');
const router = express.Router();

// Import userRoleController to handle role management logic
const userRoleController = require('../controllers/userRoleController');

/**
 * @route GET /user-roles
 * @desc Get all user roles
 * @access Public or protected based on future middleware
 */
router.get('/', userRoleController.getAllRoles);

/**
 * @route GET /user-roles/:id
 * @desc Get user role by ID
 * @access Public or protected based on future middleware
 */
router.get('/:id', userRoleController.getRoleById);

/**
 * @route POST /user-roles
 * @desc Create a new user role
 * @access Protected - requires authentication and authorization
 */
router.post('/', userRoleController.createRole);

/**
 * @route PUT /user-roles/:id
 * @desc Update an existing user role
 * @access Protected - requires authentication and authorization
 */
router.put('/:id', userRoleController.updateRole);

/**
 * @route DELETE /user-roles/:id
 * @desc Delete a user role
 * @access Protected - requires authentication and authorization
 */
router.delete('/:id', userRoleController.deleteRole);

module.exports = router;
