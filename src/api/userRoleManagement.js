/**
 * src/api/userRoleManagement.js
 *
 * API for managing user roles.
 * Provides endpoints to create, read, update, and delete user roles.
 *
 * This module uses Express router and interacts with the userRoleManagementController
 * to perform business logic operations.
 */

const express = require('express');
const router = express.Router();

// Import the controller that handles user role management logic
const userRoleManagementController = require('../controllers/userRoleManagementController');

// Route to get all user roles
router.get('/', async (req, res) => {
  try {
    const roles = await userRoleManagementController.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Failed to retrieve roles.' });
  }
});

// Route to get a specific user role by ID
router.get('/:roleId', async (req, res) => {
  const { roleId } = req.params;
  try {
    const role = await userRoleManagementController.getRoleById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found.' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(`Error fetching role with ID ${roleId}:`, error);
    res.status(500).json({ message: 'Failed to retrieve role.' });
  }
});

// Route to create a new user role
router.post('/', async (req, res) => {
  const roleData = req.body;
  try {
    const newRole = await userRoleManagementController.createRole(roleData);
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(400).json({ message: 'Failed to create role.', error: error.message });
  }
});

// Route to update an existing user role
router.put('/:roleId', async (req, res) => {
  const { roleId } = req.params;
  const updateData = req.body;
  try {
    const updatedRole = await userRoleManagementController.updateRole(roleId, updateData);
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found to update.' });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    console.error(`Error updating role with ID ${roleId}:`, error);
    res.status(400).json({ message: 'Failed to update role.', error: error.message });
  }
});

// Route to delete a user role
router.delete('/:roleId', async (req, res) => {
  const { roleId } = req.params;
  try {
    const deleted = await userRoleManagementController.deleteRole(roleId);
    if (!deleted) {
      return res.status(404).json({ message: 'Role not found to delete.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting role with ID ${roleId}:`, error);
    res.status(500).json({ message: 'Failed to delete role.' });
  }
});

module.exports = router;
