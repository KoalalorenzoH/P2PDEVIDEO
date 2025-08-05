/**
 * userRoleValidation.js
 *
 * Validation logic for user role data input.
 * Ensures user role objects conform to expected structure and constraints.
 *
 * This module exports functions to validate user role creation and update data.
 */

/**
 * Validates the structure and content of a user role object for creation.
 * @param {Object} roleData - The user role data to validate.
 * @param {string} roleData.name - The name of the role. Required, non-empty string.
 * @param {string} [roleData.description] - Optional description of the role.
 * @param {Array<string>} [roleData.permissions] - Optional array of permissions as strings.
 * @returns {Object} - An object with isValid (boolean) and errors (array of string).
 */
function validateUserRoleCreation(roleData) {
  const errors = [];

  if (!roleData || typeof roleData !== 'object') {
    errors.push('Role data must be an object.');
    return { isValid: false, errors };
  }

  // Validate name
  if (!roleData.name || typeof roleData.name !== 'string' || roleData.name.trim() === '') {
    errors.push('Role name is required and must be a non-empty string.');
  }

  // Validate description if provided
  if (roleData.description !== undefined && typeof roleData.description !== 'string') {
    errors.push('Role description must be a string if provided.');
  }

  // Validate permissions if provided
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
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates the structure and content of a user role object for update.
 * Allows partial updates; validates only provided fields.
 * @param {Object} updateData - The user role update data to validate.
 * @param {string} [updateData.name] - The name of the role, if updating. Must be non-empty string.
 * @param {string} [updateData.description] - Optional description of the role.
 * @param {Array<string>} [updateData.permissions] - Optional array of permissions.
 * @returns {Object} - An object with isValid (boolean) and errors (array of string).
 */
function validateUserRoleUpdate(updateData) {
  const errors = [];

  if (!updateData || typeof updateData !== 'object') {
    errors.push('Update data must be an object.');
    return { isValid: false, errors };
  }

  // Validate name if provided
  if ('name' in updateData) {
    if (typeof updateData.name !== 'string' || updateData.name.trim() === '') {
      errors.push('Role name must be a non-empty string if provided.');
    }
  }

  // Validate description if provided
  if ('description' in updateData) {
    if (typeof updateData.description !== 'string') {
      errors.push('Role description must be a string if provided.');
    }
  }

  // Validate permissions if provided
  if ('permissions' in updateData) {
    if (!Array.isArray(updateData.permissions)) {
      errors.push('Permissions must be an array of strings if provided.');
    } else {
      const invalidPermissions = updateData.permissions.filter(
        perm => typeof perm !== 'string' || perm.trim() === ''
      );
      if (invalidPermissions.length > 0) {
        errors.push('All permissions must be non-empty strings.');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateUserRoleCreation,
  validateUserRoleUpdate
};
