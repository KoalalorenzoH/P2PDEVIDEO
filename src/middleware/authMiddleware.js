/**
 * Authentication and Authorization Middleware
 * 
 * This middleware verifies the presence and validity of JWT tokens
 * in the Authorization header of incoming requests.
 * It also provides role-based access control by checking the user's roles.
 * 
 * Usage:
 * 1. Use `authenticateToken` to protect routes that require authentication.
 * 2. Use `authorizeRoles` to restrict access to users with specific roles.
 */

const jwt = require('jsonwebtoken');
const { getUserById } = require('../utils/userUtils');

// Secret key for JWT verification
// In production, use environment variable for secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Middleware to authenticate JWT token from Authorization header.
 * If valid, attaches user object to request.
 * If invalid or missing, responds with 401 Unauthorized.
 */
async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1]; // Expected format: "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Token missing from authorization header' });
    }

    // Verify token
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      // Attach user info to request
      const userId = decoded.id;
      try {
        const user = await getUserById(userId);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
      } catch (dbErr) {
        console.error('Error fetching user during authentication:', dbErr);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Middleware to authorize user based on roles.
 * Usage: pass one or more roles as arguments.
 * Allows access if user has at least one of the required roles.
 * 
 * @param  {...string} roles
 * @returns Middleware function
 */
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userRoles = req.user.roles || [];
    const hasRole = roles.some(role => userRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles,
};
