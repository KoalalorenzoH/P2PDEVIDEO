// userUtils.js

/**
 * Utility functions for user operations.
 * @module userUtils
 */

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
    if (!email || !/
        ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
        /.test(email)) {
        errors.email = 'Email is not valid.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
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
    validateUserRegistration,
    hashPassword,
    generateRandomToken
};