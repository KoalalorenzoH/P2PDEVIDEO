// userRoutes.js

const express = require('express');
const router = express.Router();

// Import user controller functions
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');

/**
 * @route POST /api/users/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', registerUser);

/**
 * @route POST /api/users/login
 * @desc Login user
 * @access Public
 */
router.post('/login', loginUser);

/**
 * @route GET /api/users/profile
 * @desc Get user profile
 * @access Private
 */
router.get('/profile', getUserProfile);

/**
 * @route PUT /api/users/profile
 * @desc Update user profile
 * @access Private
 */
router.put('/profile', updateUserProfile);

module.exports = router;