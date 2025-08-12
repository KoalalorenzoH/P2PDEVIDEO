/**
 * userRoleValidation.js
 * 
 * Validation logic for user role data input.
 * Ensures that user role data conforms to required schema and constraints.
 *
 * This module exports validation functions for user role creation and updates.
 *
 * Author: P2PDEVIDEO Team
 * Date: 2024
 */

/**
 * Validates the role name.
 * Role name must be a non-empty string and match allowed pattern.
 *
 * @param {string} roleName - The role name to validate.
 * @returns {boolean} Returns true if valid, false otherwise.
 */
function isValidRoleName(roleName) {
  if (typeof roleName !== 'string') return false;
  const trimmed = roleName.trim();
  if (trimmed.length === 0) return false;
  // Allow only alphanumeric and spaces, hyphens, underscores
  const roleNamePattern = /^[a-zA-Z0-9 _-]+$/;
  return roleNamePattern.test(trimmed);
}

/**
 * Validates the description of the role.
 * Description is optional but if provided must be a string with max length 256.
 *
 * @param {string} description - The description to validate.
 * @returns {boolean} Returns true if valid, false otherwise.
 */
function isValidDescription(description) {
  if (description === undefined || description === null) return true; // optional
  if (typeof description !== 'string') return false;
  return description.length <= 256;
}

/**
 * Validates permissions array.
 * Permissions must be an array of non-empty strings.
 *
 * @param {Array<string>} permissions - Array of permission strings.
 * @returns {boolean} Returns true if valid, false otherwise.
 */
function isValidPermissions(permissions) {
  if (!Array.isArray(permissions)) return false;
  if (permissions.length === 0) return false; // must have at least one permission
  return permissions.every(p => typeof p === 'string' && p.trim().length > 0);
}

/**
 * Validates the user role data object for creation or update.
 * Expected fields: roleName, description (optional), permissions
 *
 * @param {Object} roleData - The user role data to validate.
 * @param {string} roleData.roleName - The role name.
 * @param {string} [roleData.description] - Optional description.
 * @param {Array<string>} roleData.permissions - Array of permissions.
 * @returns {Object} Validation result with isValid boolean and errors array.
 */
function validateUserRoleData(roleData) {
  const errors = [];

  if (!roleData || typeof roleData !== 'object') {
    errors.push('Role data must be an object.');
    return { isValid: false, errors };
  }

  if (!isValidRoleName(roleData.roleName)) {
    errors.push('Invalid or missing roleName. It must be a non-empty string with allowed characters.');
  }

  if (!isValidDescription(roleData.description)) {
    errors.push('Description must be a string with max length 256 characters if provided.');
  }

  if (!isValidPermissions(roleData.permissions)) {
    errors.push('Permissions must be a non-empty array of non-empty strings.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  isValidRoleName,
  isValidDescription,
  isValidPermissions,
  validateUserRoleData
};
