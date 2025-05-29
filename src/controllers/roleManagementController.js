// src/controllers/roleManagementController.js

const Role = require('../models/roleModel');

/**
 * Role Management Controller
 * Handles all operations related to role management.
 */
class RoleManagementController {
    /**
     * Create a new role.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async createRole(req, res) {
        try {
            const { name, permissions } = req.body;
            if (!name || !permissions) {
                return res.status(400).json({ message: 'Role name and permissions are required.' });
            }

            const newRole = new Role({ name, permissions });
            await newRole.save();
            return res.status(201).json({ message: 'Role created successfully.', role: newRole });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    /**
     * Get all roles.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async getAllRoles(req, res) {
        try {
            const roles = await Role.find();
            return res.status(200).json(roles);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    /**
     * Update an existing role.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async updateRole(req, res) {
        try {
            const { roleId } = req.params;
            const updates = req.body;
            const updatedRole = await Role.findByIdAndUpdate(roleId, updates, { new: true });

            if (!updatedRole) {
                return res.status(404).json({ message: 'Role not found.' });
            }
            return res.status(200).json({ message: 'Role updated successfully.', role: updatedRole });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    /**
     * Delete a role.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async deleteRole(req, res) {
        try {
            const { roleId } = req.params;
            const deletedRole = await Role.findByIdAndDelete(roleId);

            if (!deletedRole) {
                return res.status(404).json({ message: 'Role not found.' });
            }
            return res.status(200).json({ message: 'Role deleted successfully.' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = RoleManagementController;