const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

/**
 * @route GET /api/user/profile
 * @description Retrieve the user profile
 * @access Private
 */
router.get('/profile', userProfileController.getUserProfile);

/**
 * @route PUT /api/user/profile
 * @description Update the user profile
 * @access Private
 */
router.put('/profile', userProfileController.updateUserProfile);

/**
 * @route DELETE /api/user/profile
 * @description Delete the user profile
 * @access Private
 */
router.delete('/profile', userProfileController.deleteUserProfile);

module.exports = router;