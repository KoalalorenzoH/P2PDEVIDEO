"use strict";

/**
 * userRoleValidation.js
 *
 * Validation logic for user role data in P2PDEVIDEO project.
 * Ensures that user role data complies with required structure and constraints.
 *
 * This module exports functions to validate user role creation and updates.
 */

/**
 * Validate if a given value is a non-empty string.
 * @param {any} value - The value to validate.
 * @returns {boolean} True if value is a non-empty string, otherwise false.
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validate user role data for creation or update.
 * Checks required fields and data types.
 *
 * @param {Object} roleData - The user role data object to validate.
 * @param {string} roleData.name - The name of the role.
 * @param {string} [roleData.description] - Optional description of the role.
 * @param {Array<string>} [roleData.permissions] - Optional array of permission strings.
 * @returns {Object} An object with 'valid' boolean and 'errors' array.
 */
function validateUserRole(roleData) {
  const errors = [];

  if (!roleData || typeof roleData !== 'object') {
    errors.push('Role data must be an object.');
    return { valid: false, errors };
  }

  // Validate 'name' field
  if (!isNonEmptyString(roleData.name)) {
    errors.push('Role name is required and must be a non-empty string.');
  }

  // Validate 'description' field if present
  if (roleData.description !== undefined) {
    if (typeof roleData.description !== 'string') {
      errors.push('Role description must be a string if provided.');
    }
  }

  // Validate 'permissions' field if present
  if (roleData.permissions !== undefined) {
    if (!Array.isArray(roleData.permissions)) {
      errors.push('Permissions must be an array of strings if provided.');
    } else {
      const invalidPermissions = roleData.permissions.filter(
        perm => typeof perm !== 'string' || perm.trim() === ''
      );
      if (invalidPermissions.length > 0) {
        errors.push('All permissions must be non-empty strings.');
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateUserRole
};
