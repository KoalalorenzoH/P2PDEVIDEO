/**
 * Middleware for validating user role requests.
 * Ensures that the request body contains valid role data before proceeding.
 */

const { validateRoleData } = require('../utils/roleValidation');

/**
 * Middleware function to validate user role data in the request.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function roleValidationMiddleware(req, res, next) {
  const { body } = req;

  // Validate the role data using utility function
  const { isValid, errors } = validateRoleData(body);

  if (!isValid) {
    // If validation fails, respond with 400 Bad Request and error details
    return res.status(400).json({
      success: false,
      message: 'Invalid role data',
      errors
    });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
}

module.exports = roleValidationMiddleware;
