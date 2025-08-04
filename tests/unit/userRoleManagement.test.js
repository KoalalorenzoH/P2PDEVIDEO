// tests/unit/userRoleManagement.test.js
// Unit tests for user role management functionality

import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import * as userRoleManagement from '../../src/controllers/userRoleManagement.js';

// Mock data and utilities
const mockRoles = [
  { id: 'role1', name: 'admin', permissions: ['read', 'write', 'delete'] },
  { id: 'role2', name: 'user', permissions: ['read'] },
];

// We will mock database or external calls inside userRoleManagement if any
// For this example, we assume userRoleManagement exports functions like:
// getAllRoles, getRoleById, createRole, updateRole, deleteRole

// Mock implementations for demonstration purposes
let rolesDB = [...mockRoles];

vi.mock('../../src/models/userRole.js', () => {
  return {
    find: vi.fn(() => Promise.resolve(rolesDB)),
    findById: vi.fn((id) => Promise.resolve(rolesDB.find(r => r.id === id) || null)),
    create: vi.fn((role) => {
      rolesDB.push(role);
      return Promise.resolve(role);
    }),
    findByIdAndUpdate: vi.fn((id, update) => {
      const index = rolesDB.findIndex(r => r.id === id);
      if (index === -1) return Promise.resolve(null);
      rolesDB[index] = { ...rolesDB[index], ...update };
      return Promise.resolve(rolesDB[index]);
    }),
    findByIdAndDelete: vi.fn((id) => {
      const index = rolesDB.findIndex(r => r.id === id);
      if (index === -1) return Promise.resolve(null);
      const deleted = rolesDB.splice(index, 1);
      return Promise.resolve(deleted[0]);
    }),
  };
});

// Reset rolesDB before each test
beforeEach(() => {
  rolesDB = [...mockRoles];
});

describe('User Role Management Controller', () => {
  describe('getAllRoles', () => {
    it('should return all user roles', async () => {
      const roles = await userRoleManagement.getAllRoles();
      expect(roles).toEqual(mockRoles);
    });
  });

  describe('getRoleById', () => {
    it('should return a role by its id', async () => {
      const role = await userRoleManagement.getRoleById('role1');
      expect(role).toEqual(mockRoles[0]);
    });

    it('should return null if role does not exist', async () => {
      const role = await userRoleManagement.getRoleById('nonexistent');
      expect(role).toBeNull();
    });
  });

  describe('createRole', () => {
    it('should create and return a new role', async () => {
      const newRole = { id: 'role3', name: 'moderator', permissions: ['read', 'write'] };
      const created = await userRoleManagement.createRole(newRole);
      expect(created).toEqual(newRole);
      expect(rolesDB).toContainEqual(newRole);
    });

    it('should throw error if role name already exists', async () => {
      const duplicateRole = { id: 'role4', name: 'admin', permissions: ['read'] };
      await expect(userRoleManagement.createRole(duplicateRole)).rejects.toThrow('Role name already exists');
    });
  });

  describe('updateRole', () => {
    it('should update an existing role and return it', async () => {
      const updates = { name: 'superadmin' };
      const updated = await userRoleManagement.updateRole('role1', updates);
      expect(updated.name).toBe('superadmin');
      expect(rolesDB.find(r => r.id === 'role1').name).toBe('superadmin');
    });

    it('should return null when updating non-existing role', async () => {
      const updated = await userRoleManagement.updateRole('invalid', { name: 'test' });
      expect(updated).toBeNull();
    });
  });

  describe('deleteRole', () => {
    it('should delete an existing role and return it', async () => {
      const deleted = await userRoleManagement.deleteRole('role2');
      expect(deleted.id).toBe('role2');
      expect(rolesDB.find(r => r.id === 'role2')).toBeUndefined();
    });

    it('should return null when deleting non-existing role', async () => {
      const deleted = await userRoleManagement.deleteRole('invalid');
      expect(deleted).toBeNull();
    });
  });
});
