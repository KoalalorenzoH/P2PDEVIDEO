// userProfileRoutes.js
// Routes for managing user profiles

const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

/**
 * @route GET /api/user-profiles/:id
 * @description Get user profile by ID
 * @param {string} id - User profile ID
 * @returns {object} 200 - User profile object
 * @returns {object} 404 - User profile not found
 */
router.get('/:id', userProfileController.getUserProfile);

/**
 * @route POST /api/user-profiles
 * @description Create a new user profile
 * @body {string} name - Name of the user
 * @body {string} email - Email of the user
 * @returns {object} 201 - Created user profile object
 * @returns {object} 400 - Invalid input
 */
router.post('/', userProfileController.createUserProfile);

/**
 * @route PUT /api/user-profiles/:id
 * @description Update user profile by ID
 * @param {string} id - User profile ID
 * @body {string} name - Name of the user
 * @body {string} email - Email of the user
 * @returns {object} 200 - Updated user profile object
 * @returns {object} 404 - User profile not found
 * @returns {object} 400 - Invalid input
 */
router.put('/:id', userProfileController.updateUserProfile);

/**
 * @route DELETE /api/user-profiles/:id
 * @description Delete user profile by ID
 * @param {string} id - User profile ID
 * @returns {object} 204 - No content
 * @returns {object} 404 - User profile not found
 */
router.delete('/:id', userProfileController.deleteUserProfile);

module.exports = router;