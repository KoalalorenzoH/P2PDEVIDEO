/**
 * Utility functions for user operations.
 * @module userUtils
 */

/**
 * Validate user data against a set of rules.
 * @param {Object} userData - The user data to validate.
 * @returns {Object} - An object containing validation errors, if any.
 */
function validateUserData(userData) {
    const errors = {};

    if (!userData.username || userData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters long.';
    }
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        errors.email = 'Email is invalid.';
    }
    if (!userData.password || userData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
    }

    return errors;
}

/**
 * Hash a user's password using a secure hashing algorithm.
 * @param {string} password - The password to hash.
 * @returns {string} - The hashed password.
 */
function hashUserPassword(password) {
    // Ideally, you would use a library like bcrypt to hash passwords.
    // For demonstration, this will return a placeholder string.
    return 'hashed_' + password;
}

/**
 * Generate a unique identifier for a user.
 * @returns {string} - A unique user ID.
 */
function generateUserId() {
    return 'user_' + Date.now(); // Simple example, consider using UUID in production.
}

module.exports = {
    validateUserData,
    hashUserPassword,
    generateUserId,
};