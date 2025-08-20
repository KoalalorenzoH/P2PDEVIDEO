/**
 * src/api/userRoleManagement.js
 *
 * API handlers for managing user roles.
 *
 * Provides CRUD operations for user roles and role assignment.
 *
 * This module exports functions to handle requests related to user role management,
 * interacting with the userRoleManagementController for business logic.
 */

const express = require('express');
const router = express.Router();

const userRoleManagementController = require('../controllers/userRoleManagementController');

/**
 * GET /user-roles
 * Retrieve a list of all user roles.
 */
router.get('/user-roles', async (req, res) => {
  try {
    const roles = await userRoleManagementController.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    res.status(500).json({ message: 'Failed to retrieve user roles' });
  }
});

/**
 * GET /user-roles/:id
 * Retrieve a user role by ID.
 */
router.get('/user-roles/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await userRoleManagementController.getRoleById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'User role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ message: 'Failed to retrieve user role' });
  }
});

/**
 * POST /user-roles
 * Create a new user role.
 */
router.post('/user-roles', async (req, res) => {
  try {
    const roleData = req.body;
    const newRole = await userRoleManagementController.createRole(roleData);
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error creating user role:', error);
    res.status(500).json({ message: 'Failed to create user role' });
  }
});

/**
 * PUT /user-roles/:id
 * Update an existing user role by ID.
 */
router.put('/user-roles/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const updateData = req.body;
    const updatedRole = await userRoleManagementController.updateRole(roleId, updateData);
    if (!updatedRole) {
      return res.status(404).json({ message: 'User role not found' });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

/**
 * DELETE /user-roles/:id
 * Delete a user role by ID.
 */
router.delete('/user-roles/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const deleted = await userRoleManagementController.deleteRole(roleId);
    if (!deleted) {
      return res.status(404).json({ message: 'User role not found' });
    }
    res.status(200).json({ message: 'User role deleted successfully' });
  } catch (error) {
    console.error('Error deleting user role:', error);
    res.status(500).json({ message: 'Failed to delete user role' });
  }
});

module.exports = router;
