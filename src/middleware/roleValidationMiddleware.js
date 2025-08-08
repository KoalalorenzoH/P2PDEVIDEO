/**
 * Middleware for validating user role requests
 *
 * This middleware uses the role validation utility functions to validate
 * incoming requests related to user role management.
 * It ensures that the request payloads conform to expected formats and constraints.
 *
 * If validation fails, it responds with HTTP 400 and error details.
 * Otherwise, it passes control to the next middleware or route handler.
 */

const { validateRoleData, validateRoleId } = require('../utils/roleValidation');

/**
 * Middleware to validate role creation or update data in request body
 */
function validateRoleRequest(req, res, next) {
  const { error } = validateRoleData(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid role data',
      details: error.details
    });
  }
  next();
}

/**
 * Middleware to validate role ID parameter in request params
 */
function validateRoleIdParam(req, res, next) {
  const { roleId } = req.params;
  const { error } = validateRoleId(roleId);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid role ID',
      details: error.details
    });
  }
  next();
}

module.exports = {
  validateRoleRequest,
  validateRoleIdParam
};
