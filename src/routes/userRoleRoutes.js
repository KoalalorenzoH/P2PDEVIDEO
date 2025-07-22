/**
 * @fileoverview API routes for user role management
 * Implements routes for creating, reading, updating, and deleting user roles.
 * 
 * This module uses Express router to define RESTful endpoints for user role management.
 */

const express = require('express');
const router = express.Router();

// Import userRoleManagementController to handle business logic
const userRoleManagementController = require('../controllers/userRoleManagementController');

/**
 * @route   GET /user-roles
 * @desc    Get list of all user roles
 * @access  Public or protected based on implementation
 */
router.get('/', userRoleManagementController.getAllUserRoles);

/**
 * @route   GET /user-roles/:id
 * @desc    Get a user role by ID
 * @access  Public or protected based on implementation
 */
router.get('/:id', userRoleManagementController.getUserRoleById);

/**
 * @route   POST /user-roles
 * @desc    Create a new user role
 * @access  Protected (admin or authorized users)
 */
router.post('/', userRoleManagementController.createUserRole);

/**
 * @route   PUT /user-roles/:id
 * @desc    Update an existing user role by ID
 * @access  Protected (admin or authorized users)
 */
router.put('/:id', userRoleManagementController.updateUserRole);

/**
 * @route   DELETE /user-roles/:id
 * @desc    Delete a user role by ID
 * @access  Protected (admin or authorized users)
 */
router.delete('/:id', userRoleManagementController.deleteUserRole);

module.exports = router;
