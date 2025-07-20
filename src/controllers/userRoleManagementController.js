/**
 * Controller for managing user roles.
 * Handles CRUD operations and role assignments.
 */

const UserRole = require('../models/userRole');
const Role = require('../models/roleModel');

/**
 * Get all user roles.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllUserRoles(req, res) {
  try {
    const userRoles = await UserRole.find().populate('role user');
    res.status(200).json(userRoles);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    res.status(500).json({ message: 'Failed to fetch user roles' });
  }
}

/**
 * Get a user role by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getUserRoleById(req, res) {
  const { id } = req.params;
  try {
    const userRole = await UserRole.findById(id).populate('role user');
    if (!userRole) {
      return res.status(404).json({ message: 'User role not found' });
    }
    res.status(200).json(userRole);
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ message: 'Failed to fetch user role' });
  }
}

/**
 * Create a new user role assignment.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createUserRole(req, res) {
  const { userId, roleId } = req.body;

  if (!userId || !roleId) {
    return res.status(400).json({ message: 'userId and roleId are required' });
  }

  try {
    // Check if the role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Check if the user role assignment already exists
    const existingUserRole = await UserRole.findOne({ user: userId, role: roleId });
    if (existingUserRole) {
      return res.status(409).json({ message: 'User role assignment already exists' });
    }

    const newUserRole = new UserRole({ user: userId, role: roleId });
    await newUserRole.save();

    res.status(201).json(newUserRole);
  } catch (error) {
    console.error('Error creating user role:', error);
    res.status(500).json({ message: 'Failed to create user role' });
  }
}

/**
 * Update an existing user role assignment.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateUserRole(req, res) {
  const { id } = req.params;
  const { userId, roleId } = req.body;

  if (!userId || !roleId) {
    return res.status(400).json({ message: 'userId and roleId are required' });
  }

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const userRole = await UserRole.findById(id);
    if (!userRole) {
      return res.status(404).json({ message: 'User role not found' });
    }

    userRole.user = userId;
    userRole.role = roleId;
    await userRole.save();

    res.status(200).json(userRole);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
}

/**
 * Delete a user role assignment.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteUserRole(req, res) {
  const { id } = req.params;
  try {
    const userRole = await UserRole.findById(id);
    if (!userRole) {
      return res.status(404).json({ message: 'User role not found' });
    }
    await userRole.remove();
    res.status(200).json({ message: 'User role deleted successfully' });
  } catch (error) {
    console.error('Error deleting user role:', error);
    res.status(500).json({ message: 'Failed to delete user role' });
  }
}

module.exports = {
  getAllUserRoles,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole
};
