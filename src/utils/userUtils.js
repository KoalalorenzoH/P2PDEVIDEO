// userUtils.js

/**
 * Utility functions for user operations.
 * This module contains helper functions that can be used across
 * the user management features of the P2PDEVIDEO project.
 * @module userUtils
 */

/**
 * Generate a random user ID.
 * @returns {string} A unique user ID.
 */
function generateUserId() {
    return 'user-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Validate user data against specific criteria.
 * @param {Object} userData - The user data to validate.
 * @returns {boolean} True if valid, otherwise false.
 */
function validateUserData(userData) {
    const { username, email } = userData;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return usernameRegex.test(username) && emailRegex.test(email);
}

/**
 * Validates user data for registration.
 * @param {Object} userData - The user data to validate.
 * @returns {Object} - Returns an object containing the validation result and error messages if any.
 */
function validateUserRegistration(userData) {
    const errors = {};
    const { username, password, email } = userData;

    if (!username || username.length < 3) {
        errors.username = 'Username must be at least 3 characters long.';
    }
    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
    }
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errors.email = 'Email is not valid.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Format user data for presentation.
 * @param {Object} user - The user data object.
 * @returns {Object} Formatted user data.
 */
function formatUserData(user) {
    return {
        id: user.id,
        name: user.username,
        email: user.email,
        roles: user.roles ? user.roles.join(', ') : 'No roles assigned'
    };
}

/**
 * Hashes a password using a secure hashing algorithm.
 * @param {string} password - The password to hash.
 * @returns {string} - The hashed password.
 */
function hashPassword(password) {
    // Placeholder for hashing functionality (to be implemented using a library like bcrypt)
    return `hashed_${password}`; // This is a mock implementation.
}

/**
 * Generates a random token for user sessions.
 * @returns {string} - A randomly generated token.
 */
function generateRandomToken() {
    return require('crypto').randomBytes(32).toString('hex');
}

module.exports = {
    generateUserId,
    validateUserData,
    validateUserRegistration,
    formatUserData,
    hashPassword,
    generateRandomToken
};
