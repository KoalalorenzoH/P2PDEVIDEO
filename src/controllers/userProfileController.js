// userProfileController.js

const UserProfile = require('../models/user'); // Import the user model

/**
 * @description Controller for managing user profiles
 */

/**
 * @function getUserProfile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} User profile data
 */
const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Extract user ID from request parameters
        const userProfile = await UserProfile.findById(userId); // Fetch user profile from database

        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' }); // Handle user not found
        }

        return res.status(200).json(userProfile); // Return user profile data
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Server error' }); // Handle server error
    }
};

/**
 * @function updateUserProfile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} Updated user profile data
 */
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Extract user ID from request parameters
        const updates = req.body; // Get updates from request body

        const updatedProfile = await UserProfile.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }); // Update user profile in database

        if (!updatedProfile) {
            return res.status(404).json({ message: 'User profile not found' }); // Handle user not found
        }

        return res.status(200).json(updatedProfile); // Return updated profile data
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Server error' }); // Handle server error
    }
};

// Export the controller functions
module.exports = {
    getUserProfile,
    updateUserProfile
};