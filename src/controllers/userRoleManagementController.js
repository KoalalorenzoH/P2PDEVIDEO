/**
 * Controller for managing user roles.
 * Provides CRUD operations for user roles.
 */

const RoleModel = require('../models/roleModel');

/**
 * Get all user roles.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllRoles(req, res) {
  try {
    const roles = await RoleModel.find({});
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch roles' });
  }
}

/**
 * Get a user role by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getRoleById(req, res) {
  try {
    const { id } = req.params;
    const role = await RoleModel.findById(id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error('Error fetching role by ID:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch role' });
  }
}

/**
 * Create a new user role.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createRole(req, res) {
  try {
    const { name, permissions, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Role name is required' });
    }

    // Check if role with same name exists
    const existingRole = await RoleModel.findOne({ name });
    if (existingRole) {
      return res.status(409).json({ success: false, message: 'Role name already exists' });
    }

    const newRole = new RoleModel({ name, permissions, description });
    const savedRole = await newRole.save();
    res.status(201).json({ success: true, data: savedRole });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ success: false, message: 'Failed to create role' });
  }
}

/**
 * Update an existing user role.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedRole = await RoleModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }

    res.status(200).json({ success: true, data: updatedRole });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ success: false, message: 'Failed to update role' });
  }
}

/**
 * Delete a user role.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const deletedRole = await RoleModel.findByIdAndDelete(id);
    if (!deletedRole) {
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
