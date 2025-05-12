// userRoleController.js

const UserRole = require('../models/userRole'); // Assuming there is a UserRole model
const User = require('../models/user'); // Assuming there is a User model

/**
 * Controller for managing user roles
 */
class UserRoleController {
    /**
     * Create a new user role
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async createRole(req, res) {
        try {
            const { name, permissions } = req.body; // Destructure name and permissions from the request body
            const newRole = new UserRole({ name, permissions });
            await newRole.save();
            return res.status(201).json({ message: 'User role created successfully', role: newRole });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating user role', error: error.message });
        }
    }

    /**
     * Get all user roles
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async getAllRoles(req, res) {
        try {
            const roles = await UserRole.find();
            return res.status(200).json(roles);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching user roles', error: error.message });
        }
    }

    /**
     * Update a user role
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async updateRole(req, res) {
        const { id } = req.params; // Get role ID from URL parameters
        const updates = req.body; // Get updates from request body
        try {
            const updatedRole = await UserRole.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            return res.status(200).json({ message: 'User role updated successfully', role: updatedRole });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user role', error: error.message });
        }
    }

    /**
     * Delete a user role
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async deleteRole(req, res) {
        const { id } = req.params; // Get role ID from URL parameters
        try {
            const deletedRole = await UserRole.findByIdAndDelete(id);
            if (!deletedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            return res.status(200).json({ message: 'User role deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting user role', error: error.message });
        }
    }
}

module.exports = UserRoleController;