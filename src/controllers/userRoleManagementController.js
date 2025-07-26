/**
 * Controller for managing user roles
 * Provides CRUD operations for user roles
 */

const Role = require('../models/roleModel');

/**
 * Get all roles
 * @param {Object} req
 * @param {Object} res
 */
async function getAllRoles(req, res) {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve roles' });
  }
}

/**
 * Get a role by ID
 * @param {Object} req
 * @param {Object} res
 */
async function getRoleById(req, res) {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error('Error fetching role by ID:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve role' });
  }
}

/**
 * Create a new role
 * @param {Object} req
 * @param {Object} res
 */
async function createRole(req, res) {
  try {
    const { name, description, permissions } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Role name is required' });
    }
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(409).json({ success: false, message: 'Role name already exists' });
    }
    const role = new Role({ name, description, permissions });
    await role.save();
    res.status(201).json({ success: true, data: role });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ success: false, message: 'Failed to create role' });
  }
}

/**
 * Update an existing role
 * @param {Object} req
 * @param {Object} res
 */
async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const role = await Role.findByIdAndUpdate(id, updates, { new: true });
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ success: false, message: 'Failed to update role' });
  }
}

/**
 * Delete a role by ID
 * @param {Object} req
 * @param {Object} res
 */
async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ success: false, message: 'Failed to delete role' });
  }
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
