"use strict";

/**
 * Controller for managing user role functionalities.
 * Handles creating, retrieving, updating, and deleting user roles.
 */

const RoleModel = require("../models/roleModel");

/**
 * Create a new user role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createUserRole(req, res) {
  try {
    const { name, permissions, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Role name is required" });
    }

    // Check if role already exists
    const existingRole = await RoleModel.findOne({ name });
    if (existingRole) {
      return res.status(409).json({ error: "Role already exists" });
    }

    const role = new RoleModel({ name, permissions, description });
    await role.save();

    return res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Retrieve all user roles
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllUserRoles(req, res) {
  try {
    const roles = await RoleModel.find({});
    return res.status(200).json({ roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Retrieve a user role by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getUserRoleById(req, res) {
  try {
    const { id } = req.params;
    const role = await RoleModel.findById(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    return res.status(200).json({ role });
  } catch (error) {
    console.error("Error fetching role by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Update a user role by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateUserRole(req, res) {
  try {
    const { id } = req.params;
    const { name, permissions, description } = req.body;

    const role = await RoleModel.findById(id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    if (name) role.name = name;
    if (permissions) role.permissions = permissions;
    if (description) role.description = description;

    await role.save();

    return res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    console.error("Error updating role:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Delete a user role by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteUserRole(req, res) {
  try {
    const { id } = req.params;
    const role = await RoleModel.findByIdAndDelete(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
};
