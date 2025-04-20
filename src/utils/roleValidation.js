/**
 * Utility functions for validating user roles.
 *
 * @module roleValidation
 */

/**
 * Checks if the provided role is valid.
 *
 * @param {string} role - The user role to validate.
 * @returns {boolean} - Returns true if the role is valid, otherwise false.
 */
const isValidRole = (role) => {
    const validRoles = ['admin', 'user', 'moderator']; // Define valid roles
    return validRoles.includes(role);
};

/**
 * Checks if the user has permission to perform an action based on their role.
 *
 * @param {string} role - The user's role.
 * @param {string} action - The action to validate permission for.
 * @returns {boolean} - Returns true if the user has permission, otherwise false.
 */
const hasPermission = (role, action) => {
    const rolePermissions = {
        admin: ['create', 'read', 'update', 'delete'],
        user: ['read'],
        moderator: ['read', 'update'],
    };
    return rolePermissions[role] ? rolePermissions[role].includes(action) : false;
};

module.exports = {
    isValidRole,
    hasPermission,
};