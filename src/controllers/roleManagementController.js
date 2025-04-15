// roleManagementController.js

const RoleModel = require('../models/roleModel');

/**
 * Controller for handling role management logic.
 */
class RoleManagementController {
    /**
     * Create a new role.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async createRole(req, res) {
        try {
            const { roleName } = req.body;
            const newRole = new RoleModel({ name: roleName });
            await newRole.save();
            res.status(201).json({ message: 'Role created successfully', role: newRole });
        } catch (error) {
            res.status(500).json({ message: 'Error creating role', error: error.message });
        }
    }

    /**
     * Get all roles.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getAllRoles(req, res) {
        try {
            const roles = await RoleModel.find();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles', error: error.message });
        }
    }

    /**
     * Update a role by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async updateRole(req, res) {
        try {
            const { id } = req.params;
            const { roleName } = req.body;
            const updatedRole = await RoleModel.findByIdAndUpdate(id, { name: roleName }, { new: true });
            if (!updatedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
        } catch (error) {
            res.status(500).json({ message: 'Error updating role', error: error.message });
        }
    }

    /**
     * Delete a role by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async deleteRole(req, res) {
        try {
            const { id } = req.params;
            const deletedRole = await RoleModel.findByIdAndDelete(id);
            if (!deletedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting role', error: error.message });
        }
    }
}

module.exports = new RoleManagementController();