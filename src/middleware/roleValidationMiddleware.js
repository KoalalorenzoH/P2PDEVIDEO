/**
 * Middleware for validating user role requests.
 * Uses validation functions from src/utils/roleValidation.js.
 *
 * This middleware checks the request body for required fields and validates
 * user role data before allowing the request to proceed.
 *
 * Responds with HTTP 400 Bad Request if validation fails.
 */

const { validateRoleData } = require('../utils/roleValidation');

/**
 * Middleware function to validate role data in the request body.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function roleValidationMiddleware(req, res, next) {
  try {
    const roleData = req.body;

    // Validate role data using utility function
    const { valid, errors } = validateRoleData(roleData);

    if (!valid) {
      // Return 400 Bad Request with validation errors
      return res.status(400).json({
        success: false,
        message: 'Role validation failed',
        errors,
      });
    }

    // Validation passed, proceed to next middleware or controller
    next();
  } catch (error) {
    // Unexpected error
    console.error('Error in roleValidationMiddleware:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during role validation',
    });
  }
}

module.exports = roleValidationMiddleware;
