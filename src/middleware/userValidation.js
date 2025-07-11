// Middleware for validating user data

const { body, validationResult } = require('express-validator');

// Validation rules for user data
const userValidationRules = () => {
    return [
        body('username')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long'),
        body('email')
            .isEmail()
            .withMessage('Must be a valid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
    ];
};

// Middleware function to check for validation errors
const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    userValidationRules,
    validateUser
};
