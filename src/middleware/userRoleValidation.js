/**
 * Middleware for validating user role data in requests.
 * Ensures the required fields are present and valid.
 *
 * This middleware is intended to be used in routes that create or update user roles.
 */

const { body, validationResult } = require('express-validator');

// Validation rules for creating or updating a user role
const validateUserRole = [
  body('roleName')
    .trim()
    .notEmpty().withMessage('Role name is required')
    .isString().withMessage('Role name must be a string')
    .isLength({ min: 3, max: 50 }).withMessage('Role name must be between 3 and 50 characters'),

  body('permissions')
    .isArray().withMessage('Permissions must be an array')
    .custom((permissions) => {
      // Each permission should be a non-empty string
      if (!permissions.every(p => typeof p === 'string' && p.trim().length > 0)) {
        throw new Error('Each permission must be a non-empty string');
      }
      return true;
    }),

  // Optional description field
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ max: 255 }).withMessage('Description can have a maximum of 255 characters'),

  // Middleware to check validation results and return errors if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateUserRole
};
