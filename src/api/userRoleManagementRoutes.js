'use strict';

/**
 * Module dependencies.
 * Defines API routes for user role management.
 */

const express = require('express');
const router = express.Router();

const userRoleManagementController = require('../controllers/userRoleManagementController');

/**
 * @route GET /user-roles
 * @description Get a list of all user roles
 * @access Public or protected depending on auth implementation
 */
router.get('/user-roles', userRoleManagementController.getAllUserRoles);

/**
 * @route GET /user-roles/:id
 * @description Get a user role by ID
 * @access Public or protected depending on auth implementation
 */
router.get('/user-roles/:id', userRoleManagementController.getUserRoleById);

/**
 * @route POST /user-roles
 * @description Create a new user role
 * @access Protected - requires proper authorization
 */
router.post('/user-roles', userRoleManagementController.createUserRole);

/**
 * @route PUT /user-roles/:id
 * @description Update an existing user role by ID
 * @access Protected - requires proper authorization
 */
router.put('/user-roles/:id', userRoleManagementController.updateUserRole);

/**
 * @route DELETE /user-roles/:id
 * @description Delete a user role by ID
 * @access Protected - requires proper authorization
 */
router.delete('/user-roles/:id', userRoleManagementController.deleteUserRole);

module.exports = router;
