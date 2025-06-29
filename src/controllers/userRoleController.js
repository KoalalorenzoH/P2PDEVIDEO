// userRoleController.js

const UserRole = require('../models/userRole');  // Assuming userRole model exists

/**
 * Controller for managing user roles.
 */
class UserRoleController {
    /**
     * Create a new user role.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async createRole(req, res) {
        try {
            const { name, permissions } = req.body;
            const newRole = new UserRole({ name, permissions });
            await newRole.save();
            return res.status(201).json({ message: 'Role created successfully', role: newRole });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating role', error: error.message });
        }
    }

    /**
     * Get all user roles.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async getAllRoles(req, res) {
        try {
            const roles = await UserRole.find();
            return res.status(200).json(roles);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching roles', error: error.message });
        }
    }

    /**
     * Get a specific user role by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async getRoleById(req, res) {
        const { id } = req.params;
        try {
            const role = await UserRole.findById(id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            return res.status(200).json(role);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching role', error: error.message });
        }
    }

    /**
     * Update a user role.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async updateRole(req, res) {
        const { id } = req.params;
        try {
            const updatedRole = await UserRole.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            return res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating role', error: error.message });
        }
    }

    /**
     * Delete a user role.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    static async deleteRole(req, res) {
        const { id } = req.params;
        try {
            const deletedRole = await UserRole.findByIdAndDelete(id);
            if (!deletedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            return res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting role', error: error.message });
        }
    }
}

module.exports = UserRoleController;