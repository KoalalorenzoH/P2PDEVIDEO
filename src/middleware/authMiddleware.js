/**
 * Middleware for authentication and role-based authorization
 * 
 * This module provides middleware functions to verify authentication tokens
 * and enforce role-based access control in the Express.js application.
 * 
 * It assumes the use of JWT for token-based authentication.
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

// Secret or key for JWT verification - ideally should come from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

/**
 * Middleware to authenticate the user by validating JWT token.
 * Extracts token from Authorization header and verifies it.
 * Attaches user info to req.user on success.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Expecting Bearer token
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    // Verify JWT token
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      // Attach user info to request
      // Assuming decoded contains user id (e.g., decoded.id)
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
}

/**
 * Middleware to authorize user based on roles.
 * 
 * @param {...string} allowedRoles - List of roles allowed to access the route
 * @returns {Function} Middleware function
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      }

      const userRoles = req.user.roles || [];
      const hasRole = userRoles.some(role => allowedRoles.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({ message: 'Internal server error during authorization' });
    }
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};
