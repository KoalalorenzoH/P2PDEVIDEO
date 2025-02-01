const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');

/**
 * @route GET /api/roles
 * @desc Get all user roles
 * @access Public
 */
router.get('/', userRoleController.getAllRoles);

/**
 * @route POST /api/roles
 * @desc Create a new user role
 * @access Admin
 */
router.post('/', userRoleController.createRole);

/**
 * @route PUT /api/roles/:id
 * @desc Update an existing user role
 * @access Admin
 */
router.put('/:id', userRoleController.updateRole);

/**
 * @route DELETE /api/roles/:id
 * @desc Delete a user role
 * @access Admin
 */
router.delete('/:id', userRoleController.deleteRole);

module.exports = router;
