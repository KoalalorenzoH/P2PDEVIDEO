/**
 * Controller for managing user role functionalities.
 *
 * This controller handles CRUD operations for user roles,
 * including creation, retrieval, update, and deletion of roles.
 * It ensures roles are properly managed and validated.
 */

const Role = require('../models/roleModel');

/**
 * Create a new user role.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createRole(req, res) {
  try {
    const { name, permissions, description } = req.body;

    if (!name || !permissions) {
      return res.status(400).json({ error: 'Role name and permissions are required.' });
    }

    // Check if role with the same name already exists
    const existingRole = await Role.findOne({ name: name.trim() });
    if (existingRole) {
      return res.status(409).json({ error: 'Role with this name already exists.' });
    }

    const role = new Role({
      name: name.trim(),
      permissions,
      description: description ? description.trim() : ''
    });

    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get all user roles.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllRoles(req, res) {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get a specific user role by ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getRoleById(req, res) {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.status(200).json({ role });
  } catch (error) {
    console.error('Error fetching role by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Update a user role by ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { name, permissions, description } = req.body;

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    if (name) role.name = name.trim();
    if (permissions) role.permissions = permissions;
    if (description !== undefined) role.description = description.trim();

    await role.save();
    res.status(200).json({ message: 'Role updated successfully', role });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Delete a user role by ID.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
