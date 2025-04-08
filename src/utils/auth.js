// auth.js - Utility functions for authentication and authorization

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Generates a JSON Web Token for a given user ID.
 * @param {string} userId - The ID of the user.
 * @returns {string} - The generated JWT.
 */
const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

/**
 * Hashes a plain text password.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
const comparePasswords = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

module.exports = {
    generateToken,
    hashPassword,
    comparePasswords
};