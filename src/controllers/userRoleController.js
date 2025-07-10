const UserRole = require('../models/userRole');

/**
 * UserRoleController - A controller for managing user roles.
 */
class UserRoleController {
    /**
     * Create a new user role.
     * @param {Object} req - The request object containing role data.
     * @param {Object} res - The response object.
     */
    async createRole(req, res) {
        try {
            const { name, permissions } = req.body;
            const newRole = new UserRole({ name, permissions });
            await newRole.save();
            res.status(201).json({ message: 'Role created successfully', role: newRole });
        } catch (error) {
            res.status(400).json({ message: 'Error creating role', error: error.message });
        }
    }

    /**
     * Get all user roles.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getAllRoles(req, res) {
        try {
            const roles = await UserRole.find();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching roles', error: error.message });
        }
    }

    /**
     * Get a user role by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async getRoleById(req, res) {
        try {
            const role = await UserRole.findById(req.params.id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching role', error: error.message });
        }
    }

    /**
     * Update a user role by ID.
     * @param {Object} req - The request object containing updated role data.
     * @param {Object} res - The response object.
     */
    async updateRole(req, res) {
        try {
            const updatedRole = await UserRole.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
        } catch (error) {
            res.status(400).json({ message: 'Error updating role', error: error.message });
        }
    }

    /**
     * Delete a user role by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    async deleteRole(req, res) {
        try {
            const deletedRole = await UserRole.findByIdAndDelete(req.params.id);
            if (!deletedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting role', error: error.message });
        }
    }
}

module.exports = new UserRoleController();