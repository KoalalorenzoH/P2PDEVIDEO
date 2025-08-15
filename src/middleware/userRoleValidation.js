/**
 * Middleware for validating user role data in requests.
 * Ensures that required fields are present and valid.
 *
 * This middleware can be used in routes handling user role creation or updates.
 */

const { body, validationResult, param } = require('express-validator');

// Validation rules for creating or updating a user role
const validateUserRole = [
  body('roleName')
    .exists().withMessage('Role name is required')
    .isString().withMessage('Role name must be a string')
    .isLength({ min: 3, max: 50 }).withMessage('Role name must be between 3 and 50 characters'),

  body('permissions')
    .optional()
    .isArray().withMessage('Permissions must be an array of strings')
    .custom((permissions) => {
      return permissions.every(p => typeof p === 'string');
    }).withMessage('Each permission must be a string'),

  // Optional description field
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ max: 255 }).withMessage('Description cannot exceed 255 characters'),

  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
      });
    }
    next();
  }
];

// Validation rule for user role ID parameter
const validateUserRoleIdParam = [
  param('id')
    .exists().withMessage('Role ID parameter is required')
    .isMongoId().withMessage('Role ID must be a valid MongoDB ObjectId'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
      });
    }
    next();
  }
];

module.exports = {
  validateUserRole,
  validateUserRoleIdParam
};
