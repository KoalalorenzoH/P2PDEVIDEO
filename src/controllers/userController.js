// src/controllers/userController.js

const User = require('../models/user'); // Importing User model

/**
 * UserController class to handle user management business logic.
 */
class UserController {
    /**
     * Registers a new user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Returns a promise that resolves to void.
     */
    async register(req, res) {
        const { username, password, email } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists.' });
            }
            const newUser = new User({ username, password, email });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error.' });
        }
    }

    /**
     * Logs in a user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Returns a promise that resolves to void.
     */
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }
            // Token generation logic can be added here
            res.status(200).json({ message: 'Login successful.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error.' });
        }
    }

    /**
     * Updates user profile.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} - Returns a promise that resolves to void.
     */
    async updateProfile(req, res) {
        const { userId } = req.params;
        const { username, email } = req.body;
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.status(200).json({ message: 'Profile updated successfully.', user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error.' });
        }
    }
}

module.exports = new UserController(); // Exporting instance of UserController
