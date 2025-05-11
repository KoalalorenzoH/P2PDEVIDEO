// src/utils/userUtils.js

/**
 * Utility functions for user operations.
 * This module contains helper functions that can be used across
 * the user management features of the P2PDEVIDEO project.
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
 * Format user data for presentation.
 * @param {Object} user - The user data object.
 * @returns {Object} Formatted user data.
 */
function formatUserData(user) {
    return {
        id: user.id,
        name: user.username,
        email: user.email,
        roles: user.roles.join(', ')
    };
}

module.exports = {
    generateUserId,
    validateUserData,
    formatUserData,
};
