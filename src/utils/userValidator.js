/**
 * userValidator.js
 *
 * Validation utilities for user data, providing functions to check
 * the validity of user input during registration and profile updates.
 *
 * @module utils/userValidator
 */

/**
 * Validates user registration data.
 *
 * @param {Object} userData - The user data to validate.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Array} - An array of validation error messages, if any.
 */
function validateUserRegistration(userData) {
    const errors = [];

    // Check if username is provided
    if (!userData.username || userData.username.length < 3) {
        errors.push('Username must be at least 3 characters long.');
    }

    // Check if email is valid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!userData.email || !emailRegex.test(userData.email)) {
        errors.push('Invalid email format.');
    }

    // Check if password is provided
    if (!userData.password || userData.password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    return errors;
}

/**
 * Validates user profile update data.
 *
 * @param {Object} profileData - The profile data to validate.
 * @param {string} profileData.username - The username of the user.
 * @param {string} profileData.email - The email of the user.
 * @returns {Array} - An array of validation error messages, if any.
 */
function validateUserProfileUpdate(profileData) {
    const errors = [];

    // Check if email is valid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (profileData.email && !emailRegex.test(profileData.email)) {
        errors.push('Invalid email format.');
    }

    return errors;
}

module.exports = {
    validateUserRegistration,
    validateUserProfileUpdate
};