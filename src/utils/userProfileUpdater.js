// src/utils/userProfileUpdater.js

const { validateUserProfile } = require('./userValidator');

/**
 * Updates a user's profile with the provided data.
 * @param {Object} userProfile - An object containing the user's profile data.
 * @returns {Object} - Returns the updated user profile.
 * @throws {Error} - Throws an error if validation fails or if the update fails.
 */
function updateUserProfile(userProfile) {
    // Validate the input user profile data
    const validationErrors = validateUserProfile(userProfile);
    if (validationErrors.length > 0) {
        throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    }

    // Simulate updating the user profile in a database
    // This is a placeholder for actual database update logic
    const updatedProfile = { ...userProfile, updatedAt: new Date() };

    // Here we would typically save the updated profile to the database
    // For now, we just return the updated profile
    return updatedProfile;
}

module.exports = {
    updateUserProfile
};
