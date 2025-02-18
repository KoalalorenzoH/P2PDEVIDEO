// userProfileValidation.js

/**
 * Validation logic for user profile operations.
 * This module contains functions to validate user profile data
 * during creation and update operations.
 */

const { body, validationResult } = require('express-validator');

/**
 * Validate user profile creation inputs.
 * @returns {Array} Array of validation rules.
 */
const validateUserProfileCreation = () => {
    return [
        body('username')
            .isString()
            .notEmpty()
            .withMessage('Username is required.'),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email address.'),
        body('age')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Age must be a positive integer.'),
        body('bio')
            .optional()
            .isString()
            .isLength({ max: 500 })
            .withMessage('Bio must be less than 500 characters.')
    ];
};

/**
 * Validate user profile update inputs.
 * @returns {Array} Array of validation rules.
 */
const validateUserProfileUpdate = () => {
    return [
        body('username')
            .optional()
            .isString()
            .notEmpty()
            .withMessage('Username cannot be empty if provided.'),
        body('email')
            .optional()
            .isEmail()
            .withMessage('Please provide a valid email address if provided.'),
        body('age')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Age must be a positive integer if provided.'),
        body('bio')
            .optional()
            .isString()
            .isLength({ max: 500 })
            .withMessage('Bio must be less than 500 characters if provided.')
    ];
};

/**
 * Middleware to handle validation errors.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserProfileCreation,
    validateUserProfileUpdate,
    handleValidationErrors
};
