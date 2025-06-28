// userProfileMiddleware.js
// Middleware for validating user profile requests

const { validateUserProfile } = require('../utils/userValidation');

/**
 * Middleware function to validate user profile requests.
 * This function checks for necessary fields and validates them.
 * If validation fails, it sends an error response.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const userProfileMiddleware = (req, res, next) => {
    const { error } = validateUserProfile(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

module.exports = userProfileMiddleware;