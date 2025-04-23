// Import necessary modules
const User = require('../models/user'); // Assuming user model is defined here
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens

/**
 * @description Handles user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

/**
 * @description Handles user login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

/**
 * @description Retrieves user profile information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming middleware has populated req.user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };