/**
 * Middleware for user role authorization and validation
 *
 * This middleware validates the roles provided in the request body,
 * checks if the user has the necessary roles for the requested operation,
 * and ensures proper authorization.
 *
 * Dependencies:
 * - src/utils/userRoleValidation.js
 *
 * Usage:
 * Attach these middlewares to routes that require user role validation
 * or authorization.
 */

const { validateUserRoleData, isValidRole } = require('../utils/userRoleValidation');

/**
 * Middleware to validate roles array in request body.
 *
 * Checks if roles is an array and each role is valid.
 * Responds with 400 Bad Request if validation fails.
 */
function validateRolesMiddleware(req, res, next) {
  const { roles } = req.body;
  if (!Array.isArray(roles)) {
    return res.status(400).json({ error: 'Roles must be an array.' });
  }
  for (const role of roles) {
    if (!isValidRole(role)) {
      return res.status(400).json({ error: `Invalid role: ${role}` });
    }
  }
  next();
}

/**
 * Middleware to check if the current authenticated user has required roles.
 *
 * @param {Array<string>} requiredRoles - Roles required to access the route
 * @returns {Function} Express middleware function
 */
function authorizeRoles(requiredRoles = []) {
  return (req, res, next) => {
    const userRoles = req.user && req.user.roles;
    if (!userRoles || !Array.isArray(userRoles)) {
      return res.status(403).json({ error: 'User roles not found or invalid.' });
    }
    const hasRole = requiredRoles.some(role => userRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ error: 'User does not have required roles.' });
    }
    next();
  };
}

module.exports = {
  validateRolesMiddleware,
  authorizeRoles
};
