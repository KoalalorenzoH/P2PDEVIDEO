/**
 * Authentication and Authorization Middleware
 *
 * Provides middleware functions to verify user authentication
 * and enforce role-based access control.
 *
 * This middleware assumes JWT token based authentication.
 * It expects the token to be provided in the Authorization header as 'Bearer <token>'.
 */

const jwt = require('jsonwebtoken');
const { getUserById } = require('../utils/userUtils');

// Secret key for JWT verification (should be set in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

/**
 * Middleware to verify JWT token and authenticate user.
 * Attaches the user object to req.user if valid.
 *
 * If token is missing or invalid, responds with 401 Unauthorized.
 */
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Assuming decoded token contains userId
    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Middleware to enforce role-based access control.
 *
 * @param {...string} allowedRoles - Roles permitted to access the route
 * @returns {function} Middleware function
 *
 * If user role is not in allowedRoles, responds with 403 Forbidden.
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles,
};
