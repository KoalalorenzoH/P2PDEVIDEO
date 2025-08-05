/**
 * Authentication and Authorization Middleware
 *
 * This middleware handles token-based authentication using JWT and role-based authorization.
 * It verifies the JWT token provided in the Authorization header and extracts user information.
 * It also provides a middleware function to enforce role-based access control.
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Assuming a config file that contains secrets

/**
 * Middleware to verify JWT token and authenticate user.
 *
 * Expects Authorization header with Bearer token.
 * Attaches user info to req.user on success.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

/**
 * Middleware to authorize user based on roles.
 *
 * Usage: authorizeRoles('admin', 'moderator')
 *
 * @param  {...string} roles - Allowed roles
 * @returns {Function} Middleware function
 */
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'User role information missing' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};
