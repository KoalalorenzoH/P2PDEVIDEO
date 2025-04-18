// userController.js

const User = require('../models/user'); // Import User model

/**
 * User Controller for handling user-related requests and logic.
 */

/**
 * Register a new user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Create new user
        const newUser = new User({ username, password }); // Hash password in User model
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * Login user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await User.findOne({ username });
        if (!user || !user.verifyPassword(password)) { // Assume verifyPassword is a method in User model
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate and return token (pseudo code)
        const token = user.generateAuthToken(); // Assume generateAuthToken is a method in User model
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    registerUser,
    loginUser
};