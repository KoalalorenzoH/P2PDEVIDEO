// userRoleController.js

const UserRole = require('../models/userRole'); // Import the userRole model

/**
 * User Role Controller to manage user roles in the system.
 */
class UserRoleController {
    /**
     * Create a new user role.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {void}
     */
    static async createRole(req, res) {
        try {
            const { name, permissions } = req.body;
            const newRole = new UserRole({ name, permissions });
            await newRole.save();
            res.status(201).json({ message: 'Role created successfully', role: newRole });
        } catch (error) {
            res.status(500).json({ message: 'Error creating role', error: error.message });
        }
    }

    /**
     * Get all user roles.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {void}
     */
    static async getAllRoles(req, res) {
        try {
            const roles = await UserRole.find();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles', error: error.message });
        }
    }

    /**
     * Update a user role by ID.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {void}
     */
    static async updateRole(req, res) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const updatedRole = await UserRole.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
        } catch (error) {
            res.status(500).json({ message: 'Error updating role', error: error.message });
        }
    }

    /**
     * Delete a user role by ID.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {void}
     */
    static async deleteRole(req, res) {
        const { id } = req.params;
        try {
            const deletedRole = await UserRole.findByIdAndDelete(id);
            if (!deletedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role deleted successfully', role: deletedRole });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting role', error: error.message });
        }
    }
}

module.exports = UserRoleController;