// src/utils/auth.js

/**
 * Utility functions for authentication processes.
 * This module provides functions to handle JWT generation,
 * token validation, and password hashing.
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

/**
 * Generate a JSON Web Token (JWT) for a given user ID.
 *
 * @param {string} userId - The ID of the user.
 * @returns {string} - The generated JWT.
 */
function generateToken(userId) {
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    return token;
}

/**
 * Hash a password using bcrypt.
 *
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
}

/**
 * Validate a password against a hashed password.
 *
 * @param {string} password - The plain password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - True if the password matches, false otherwise.
 */
async function validatePassword(password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}

/**
 * Middleware to authenticate a JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    generateToken,
    hashPassword,
    validatePassword,
    authenticateToken,
};