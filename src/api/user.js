const express = require('express');
const User = require('../models/user');
const { authenticate, authorize } = require('../utils/auth');

const router = express.Router();

/**
 * @route POST /api/users/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
});

/**
 * @route POST /api/users/login
 * @desc Login user and return token
 * @access Public
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !user.verifyPassword(password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = user.generateAuthToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

/**
 * @route GET /api/users/profile
 * @desc Get user profile
 * @access Private
 */
router.get('/profile', authenticate, async (req, res) => {
    try {
        const userProfile = await User.findById(req.user.id);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

module.exports = router;