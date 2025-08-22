/**
 * Middleware for role-based access control enhancements
 *
 * This middleware validates if the authenticated user has the required roles
 * to access certain resources or endpoints.
 * It depends on the authentication middleware to have already verified the user and
 * attached the user object to the request.
 *
 * Usage:
 * app.use('/admin', authMiddleware, roleMiddleware(['admin']), adminRoutes);
 *
 * @module roleMiddleware
 */

const createError = require('http-errors');
const authMiddleware = require('./authMiddleware');

/**
 * Role-based access control middleware factory.
 *
 * @param {string[]} requiredRoles - Array of roles required to access the resource
 * @returns {Function} Express middleware function
 */
function roleMiddleware(requiredRoles = []) {
  return async (req, res, next) => {
    try {
      // Ensure user is authenticated first
      await authMiddleware(req, res, async () => {
        const user = req.user;
        if (!user) {
          return next(createError(401, 'User not authenticated'));
        }

        // Check if user has at least one of the required roles
        const userRoles = user.roles || [];
        const hasRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRole) {
          return next(createError(403, 'Access denied: insufficient permissions'));
        }

        // User has required role, proceed
        next();
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = roleMiddleware;
