'use strict';

/**
 * Validation logic for user profile data.
 * @module userProfileValidation
 */

const { body, validationResult } = require('express-validator');

/**
 * Validation rules for user profile updates.
 * @returns {Array} Validation rules array.
 */
const validateUserProfile = () => {
    return [
        body('name')
            .isString().withMessage('Name must be a string.')
            .isLength({ min: 1 }).withMessage('Name is required.'),
        body('email')
            .isEmail().withMessage('Invalid email format.')
            .normalizeEmail(),
        body('age')
            .optional()
            .isInt({ min: 0 }).withMessage('Age must be a positive integer.'),
        body('bio')
            .optional()
            .isString().withMessage('Bio must be a string.')
            .isLength({ max: 500 }).withMessage('Bio must not exceed 500 characters.'),
    ];
};

/**
 * Middleware to validate user profile data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const validateUserProfileData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserProfile,
    validateUserProfileData,
};
