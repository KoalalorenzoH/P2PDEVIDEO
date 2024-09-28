// src/utils/userUtils.js

/**
 * Utility functions for user operations.
 * This file contains functions that assist with user-related operations such as validation, formatting, and more.
 */

/**
 * Format a user's name to a standard format.
 * @param {string} name - The user's name.
 * @returns {string} - Formatted name.
 */
function formatUserName(name) {
    if (typeof name !== 'string') {
        throw new TypeError('Expected a string');
    }
    return name.trim().replace(/\s+/g, ' ').replace(/^(\w)|\s+(\w)/g, (match) => match.toUpperCase());
}

/**
 * Validate email format.
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function isValidEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}

/**
 * Generate a random user ID.
 * @returns {string} - A random UUID.
 */
function generateUserId() {
    return 'user-' + Math.random().toString(36).substr(2, 9);
}

module.exports = {
    formatUserName,
    isValidEmail,
    generateUserId,
};