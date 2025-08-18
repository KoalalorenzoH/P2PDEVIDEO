/**
 * Utility functions for token generation and verification.
 *
 * This module provides functions to generate and verify JWT tokens.
 * It uses the jsonwebtoken library and supports token signing and verification
 * with a secret key, token expiration, and error handling.
 *
 * @module utils/tokenUtils
 */

const jwt = require('jsonwebtoken');

// Secret key for signing tokens - should be set as environment variable for security
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Default token expiration time
const DEFAULT_EXPIRATION = '1h';

/**
 * Generate a JWT token for a given payload.
 *
 * @param {Object} payload - The payload data to encode in the token.
 * @param {string|number} [expiresIn=DEFAULT_EXPIRATION] - Token expiration time (e.g., '1h', '2d').
 * @returns {string} Signed JWT token.
 * @throws {Error} Throws error if token signing fails.
 */
function generateToken(payload, expiresIn = DEFAULT_EXPIRATION) {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
}

/**
 * Verify a JWT token and return the decoded payload.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {Object} Decoded token payload.
 * @throws {Error} Throws error if token verification fails or token is invalid.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
