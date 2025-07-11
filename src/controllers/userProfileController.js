// userProfileController.js

const UserProfile = require('../models/user'); // Import user model

/**
 * UserProfileController handles requests related to user profiles.
 */
class UserProfileController {
    /**
     * Get user profile by ID
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async getUserProfile(req, res) {
        try {
            const userId = req.params.id; // Extract user ID from request parameters
            const userProfile = await UserProfile.findById(userId); // Fetch user profile from the database

            if (!userProfile) {
                return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
            }

            return res.status(200).json(userProfile); // Respond with user profile data
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message }); // Handle server errors
        }
    }

    /**
     * Update user profile by ID
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async updateUserProfile(req, res) {
        try {
            const userId = req.params.id; // Extract user ID from request parameters
            const updatedProfile = await UserProfile.findByIdAndUpdate(userId, req.body, { new: true }); // Update user profile in the database

            if (!updatedProfile) {
                return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
            }

            return res.status(200).json(updatedProfile); // Respond with updated profile data
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message }); // Handle server errors
        }
    }

    /**
     * Delete user profile by ID
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async deleteUserProfile(req, res) {
        try {
            const userId = req.params.id; // Extract user ID from request parameters
            const deletedProfile = await UserProfile.findByIdAndDelete(userId); // Delete user profile from the database

            if (!deletedProfile) {
                return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
            }

            return res.status(200).json({ message: 'User profile deleted successfully' }); // Respond with success message
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message }); // Handle server errors
        }
    }
}

module.exports = UserProfileController; // Export the controller