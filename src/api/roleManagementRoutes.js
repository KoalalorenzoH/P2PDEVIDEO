const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');

/**
 * @route GET /api/roles
 * @description Get all user roles
 * @access Public
 */
router.get('/', userRoleController.getAllRoles);

/**
 * @route POST /api/roles
 * @description Create a new user role
 * @access Admin
 */
router.post('/', userRoleController.createRole);

/**
 * @route PUT /api/roles/:id
 * @description Update an existing user role
 * @access Admin
 */
router.put('/:id', userRoleController.updateRole);

/**
 * @route DELETE /api/roles/:id
 * @description Delete a user role
 * @access Admin
 */
router.delete('/:id', userRoleController.deleteRole);

module.exports = router;