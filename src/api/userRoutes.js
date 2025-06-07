// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Public
 */
router.get('/', userController.getAllUsers);

/**
 * @route POST /api/users/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', userController.registerUser);

/**
 * @route POST /api/users/login
 * @desc Login a user
 * @access Public
 */
router.post('/login', userController.loginUser);

/**
 * @route GET /api/users/:id
 * @desc Get user profile by ID
 * @access Private
 */
router.get('/:id', userController.getUserProfile);

/**
 * @route PUT /api/users/:id
 * @desc Update user profile
 * @access Private
 */
router.put('/:id', userController.updateUserProfile);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user
 * @access Private
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
