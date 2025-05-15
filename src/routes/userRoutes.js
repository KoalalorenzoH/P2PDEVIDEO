// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user registration
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

// Route for getting user profile
router.get('/:userId/profile', userController.getProfile);

// Route for updating user profile
router.put('/:userId/profile', userController.updateProfile);

// Route for deleting user account
router.delete('/:userId', userController.deleteAccount);

module.exports = router;
