// userValidator.js

/**
 * Validation utilities for user model.
 * This file contains functions that validate user input data,
 * ensuring that it meets specified criteria before being processed.
 */

/**
 * Validates user registration data.
 * @param {Object} userData - The user data to validate.
 * @returns {Object} - An object containing validation results.
 */
function validateRegistrationData(userData) {
    const errors = {};

    // Check if username is provided
    if (!userData.username || userData.username.trim() === '') {
        errors.username = 'Username is required.';
    }

    // Check if email is provided and valid
    if (!userData.email || !/
    ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
        errors.email = 'A valid email is required.';
    }

    // Check if password is provided and meets length requirements
    if (!userData.password || userData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Validates user profile update data.
 * @param {Object} profileData - The profile data to validate.
 * @returns {Object} - An object containing validation results.
 */
function validateProfileUpdateData(profileData) {
    const errors = {};

    // Check if name is provided
    if (!profileData.name || profileData.name.trim() === '') {
        errors.name = 'Name is required.';
    }

    // Check if email is valid
    if (profileData.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profileData.email)) {
        errors.email = 'A valid email is required.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

module.exports = {
    validateRegistrationData,
    validateProfileUpdateData
};