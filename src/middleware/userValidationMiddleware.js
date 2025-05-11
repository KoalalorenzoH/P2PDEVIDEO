// userValidationMiddleware.js

const { validateUserData } = require('../utils/userValidation');

/**
 * Middleware for validating user data on requests.
 * This middleware checks the request body for user data and ensures it meets the specified validation criteria.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const userValidationMiddleware = (req, res, next) => {
    // Validate user data from the request body
    const { error } = validateUserData(req.body);

    if (error) {
        // Validation failed, respond with a 400 status code and error message
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // Validation succeeded, proceed to the next middleware
    next();
};

module.exports = userValidationMiddleware;