const User = require('../models/user');
const { generateToken, verifyToken } = require('../utils/auth');

/**
 * @module userController
 * @description Handles user-related business logic for the API.
 */

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed.', details: error.message });
    }
};

/**
 * Authenticates a user and returns a token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.', details: error.message });
    }
};

/**
 * Retrieves user profile information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getUserProfile = async (req, res) => {
    const userId = req.user._id; // Assume user ID is set in req.user by auth middleware
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user profile.', details: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };