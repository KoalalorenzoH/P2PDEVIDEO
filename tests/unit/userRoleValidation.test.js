// tests/unit/userRoleValidation.test.js

/**
 * Unit tests for user role validation logic
 * Depends on src/middleware/userValidation.js
 */

const { validateUserRole } = require('../../src/middleware/userValidation');

// Mock data for roles
const validRoles = ['admin', 'editor', 'viewer'];
const invalidRoles = ['superuser', '', null, undefined, 123, {}, []];

// Mock user objects for validation
const userWithValidRole = (role) => ({ role });
const userWithoutRole = {};

describe('User Role Validation Middleware', () => {
  describe('validateUserRole function', () => {
    it('should return true for valid roles', () => {
      validRoles.forEach(role => {
        const user = userWithValidRole(role);
        const result = validateUserRole(user, validRoles);
        expect(result).toBe(true);
      });
    });

    it('should return false for invalid roles', () => {
      invalidRoles.forEach(role => {
        const user = userWithValidRole(role);
        const result = validateUserRole(user, validRoles);
        expect(result).toBe(false);
      });
    });

    it('should return false if user object has no role property', () => {
      const result = validateUserRole(userWithoutRole, validRoles);
      expect(result).toBe(false);
    });

    it('should return false if validRoles array is empty or not an array', () => {
      const user = userWithValidRole('admin');
      expect(validateUserRole(user, [])).toBe(false);
      expect(validateUserRole(user, null)).toBe(false);
      expect(validateUserRole(user, undefined)).toBe(false);
      expect(validateUserRole(user, 'notarray')).toBe(false);
    });
  });
});
