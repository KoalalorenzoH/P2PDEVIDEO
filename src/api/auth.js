const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route POST /api/auth/login
 * @desc Login an existing user
 * @access Public
 */
router.post('/login', async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;