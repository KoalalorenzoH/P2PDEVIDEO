/**
 * roleValidation.js
 * 
 * Utility functions for validating user roles in the application.
 * This module provides functions to ensure that users have the appropriate roles
 * to access certain resources or perform specific actions.
 * 
 * @module utils/roleValidation
 */

/**
 * Checks if the user has the required role.
 * 
 * @param {string} userRole - The role of the user.
 * @param {string} requiredRole - The role required to access a resource.
 * @returns {boolean} True if the user has the required role, false otherwise.
 */
function hasRequiredRole(userRole, requiredRole) {
    return userRole === requiredRole;
}

/**
 * Checks if the user has one of the required roles.
 * 
 * @param {string} userRole - The role of the user.
 * @param {Array<string>} requiredRoles - An array of roles that are allowed.
 * @returns {boolean} True if the user has one of the required roles, false otherwise.
 */
function hasAnyRequiredRole(userRole, requiredRoles) {
    return requiredRoles.includes(userRole);
}

/**
 * Middleware to validate if the user has the required role for accessing a resource.
 * 
 * @param {Array<string>} requiredRoles - An array of roles that are allowed.
 * @returns {Function} Middleware function that validates the user's role.
 */
function roleValidationMiddleware(requiredRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;  // Assuming user role is stored in req.user
        if (hasAnyRequiredRole(userRole, requiredRoles)) {
            return next(); // User has the required role
        }
        return res.status(403).json({ message: 'Access denied: insufficient permissions.' }); // Forbidden
    };
}

module.exports = {
    hasRequiredRole,
    hasAnyRequiredRole,
    roleValidationMiddleware
};