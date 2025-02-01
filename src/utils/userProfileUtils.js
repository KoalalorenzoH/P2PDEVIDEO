// Utility functions for user profile operations

/**
 * Validates user profile data.
 * @param {Object} profileData - The user profile data to validate.
 * @returns {Boolean} - Returns true if valid, false otherwise.
 */
function validateProfileData(profileData) {
    const { name, email, age } = profileData;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    if (!name || typeof name !== 'string') {
        console.error('Invalid name');
        return false;
    }
    if (!email || !emailRegex.test(email)) {
        console.error('Invalid email');
        return false;
    }
    if (age && (typeof age !== 'number' || age < 0)) {
        console.error('Invalid age');
        return false;
    }
    return true;
}

/**
 * Formats user profile data for display.
 * @param {Object} profileData - The user profile data to format.
 * @returns {String} - Returns formatted profile data as a string.
 */
function formatProfileData(profileData) {
    return `Name: ${profileData.name}\nEmail: ${profileData.email}\nAge: ${profileData.age || 'N/A'}`;
}

/**
 * Updates user profile with new data.
 * @param {Object} currentProfile - The current user profile data.
 * @param {Object} newProfileData - The new data to update the profile with.
 * @returns {Object} - Returns the updated profile.
 */
function updateProfile(currentProfile, newProfileData) {
    return { ...currentProfile, ...newProfileData };
}

module.exports = {
    validateProfileData,
    formatProfileData,
    updateProfile
};
