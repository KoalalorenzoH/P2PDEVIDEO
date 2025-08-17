/**
 * Authentication and Role-based Authorization Middleware
 * 
 * This middleware module provides two key functionalities:
 * 1. authenticateToken: Middleware to verify JWT token and authenticate user.
 * 2. authorizeRoles: Middleware to check if authenticated user has required roles.
 *
 * These middleware functions are intended to be used in Express.js routes to protect endpoints.
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

// SECRET or key to verify JWT tokens, should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

/**
 * Middleware to authenticate user by verifying JWT token.
 *
 * The token is expected to be sent in the Authorization header as Bearer token.
 * If valid, attaches user information to req.user and calls next(), otherwise returns 401 Unauthorized.
 */
async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing from Authorization header' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      // decoded should contain user id or other identifying info
      const userId = decoded.id;
      if (!userId) {
        return res.status(401).json({ message: 'Token payload invalid' });
      }

      // Fetch user from database
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user; // attach user to request object
      next();
    });
  } catch (error) {
    console.error('Error authenticating token:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Middleware to authorize user based on roles.
 *
 * @param {...string} roles - Allowed roles for the route
 * @returns Middleware function
 *
 * Usage: authorizeRoles('admin', 'moderator')
 * Checks if req.user exists and has at least one of the specified roles.
 * Returns 403 Forbidden if unauthorized.
 */
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Assuming user roles are stored as array of strings in user.roles
    const userRoles = req.user.roles || [];
    const hasRole = roles.some(role => userRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};
