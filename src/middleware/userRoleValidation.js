/**
 * Middleware for validating user role data in requests.
 * Ensures that the role data is present and valid before proceeding.
 */

const { body, param, validationResult } = require('express-validator');

// Validation rules for creating or updating user roles
const validateUserRole = [
  body('roleName')
    .exists().withMessage('Role name is required')
    .isString().withMessage('Role name must be a string')
    .isLength({ min: 3, max: 50 }).withMessage('Role name must be between 3 and 50 characters'),

  body('permissions')
    .exists().withMessage('Permissions are required')
    .isArray().withMessage('Permissions must be an array')
    .custom((permissions) => {
      if (permissions.length === 0) {
        throw new Error('Permissions array cannot be empty');
      }
      // Optional: further validation on permissions content can be added here
      return true;
    }),

  // Optional description field
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters'),

  // Middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation for role ID param in routes (e.g., for update or delete operations)
const validateRoleIdParam = [
  param('roleId')
    .exists().withMessage('Role ID parameter is required')
    .isMongoId().withMessage('Role ID must be a valid MongoDB ObjectId'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateUserRole,
  validateRoleIdParam
};
