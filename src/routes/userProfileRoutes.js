// userProfileRoutes.js
// Routes for managing user profiles

const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

/**
 * @route GET /api/profiles/:id
 * @desc Get user profile by ID
 * @access Public
 */
router.get('/:id', userProfileController.getUserProfile);

/**
 * @route POST /api/profiles
 * @desc Create a new user profile
 * @access Private
 */
router.post('/', userProfileController.createUserProfile);

/**
 * @route PUT /api/profiles/:id
 * @desc Update user profile by ID
 * @access Private
 */
router.put('/:id', userProfileController.updateUserProfile);

/**
 * @route DELETE /api/profiles/:id
 * @desc Delete user profile by ID
 * @access Private
 */
router.delete('/:id', userProfileController.deleteUserProfile);

module.exports = router;