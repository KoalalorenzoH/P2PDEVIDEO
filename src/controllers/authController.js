// authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Assuming userModel is used for user data

/**
 * Handles user authentication logic.
 */
class AuthController {
    /**
     * Authenticates a user and returns a JWT token.
     * @param {Object} req - Request object containing user credentials.
     * @param {Object} res - Response object.
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    /**
     * Logout user by invalidating the token (in this case, just a placeholder, as token invalidation requires a different strategy).
     * @param {Object} req - Request object.
     * @param {Object} res - Response object.
     */
    logout(req, res) {
        // Placeholder for logout logic, typically handled on client side.
        return res.json({ message: 'Logged out successfully' });
    }
}

module.exports = new AuthController();
