/**
 * Validation utilities for user-related operations.
 *
 * This module contains functions to validate user input during
 * registration and profile updates, ensuring that the data meets
 * specified criteria.
 *
 * @module userValidation
 */

/**
 * Validates user registration data.
 *
 * @param {Object} userData - The user data to validate.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user.
 * @returns {Object} An object containing validation errors, if any.
 */
function validateRegistration(userData) {
    const errors = {};

    // Check for username
    if (!userData.username || userData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters long.';
    }

    // Check for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailRegex.test(userData.email)) {
        errors.email = 'Invalid email address.';
    }

    // Check for password
    if (!userData.password || userData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
    }

    return errors;
}

/**
 * Validates user profile update data.
 *
 * @param {Object} profileData - The profile data to validate.
 * @param {string} profileData.username - The username of the user.
 * @param {string} profileData.email - The email address of the user.
 * @returns {Object} An object containing validation errors, if any.
 */
function validateProfileUpdate(profileData) {
    const errors = {};

    // Check for username
    if (profileData.username && profileData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters long.';
    }

    // Check for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (profileData.email && !emailRegex.test(profileData.email)) {
        errors.email = 'Invalid email address.';
    }

    return errors;
}

module.exports = {
    validateRegistration,
    validateProfileUpdate
};
