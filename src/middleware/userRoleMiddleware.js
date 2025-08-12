/**
 * Middleware for user role authorization and validation
 *
 * This middleware validates the user's roles based on the request
 * and ensures that the user has the necessary permissions to proceed.
 * It uses utility functions from src/utils/userRoleValidation.js to
 * perform the validation logic.
 *
 * @module middleware/userRoleMiddleware
 */

const { validateUserRoles, hasRequiredRole } = require('../utils/userRoleValidation');

/**
 * Middleware to validate user roles present in the request user object.
 *
 * @param {Array<string>} requiredRoles - Roles required to access the route
 * @returns {function} Express middleware function
 */
function userRoleMiddleware(requiredRoles = []) {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found in request' });
      }

      if (!user.roles || !Array.isArray(user.roles)) {
        return res.status(403).json({ message: 'Forbidden: User roles are not defined properly' });
      }

      // Validate roles using utility function
      const validRoles = validateUserRoles(user.roles);
      if (!validRoles) {
        return res.status(403).json({ message: 'Forbidden: Invalid user roles' });
      }

      // Check if user has at least one of the required roles
      if (requiredRoles.length > 0 && !hasRequiredRole(user.roles, requiredRoles)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role permissions' });
      }

      // Roles validated and authorized
      next();
    } catch (error) {
      console.error('Error in userRoleMiddleware:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = {
  userRoleMiddleware
};
