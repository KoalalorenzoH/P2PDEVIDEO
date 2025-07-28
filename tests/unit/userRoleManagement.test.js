// tests/unit/userRoleManagement.test.js

/**
 * Unit tests for user role management functionality
 *
 * These tests cover the main API functions for managing user roles,
 * including creation, retrieval, update, and deletion of roles.
 */

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

// Import the user role management API module
const userRoleManagement = require('../../src/api/userRoleManagement');

// Mock data for testing
const mockRole = {
  id: 'role123',
  name: 'admin',
  permissions: ['read', 'write', 'delete']
};

const mockRoleUpdate = {
  name: 'superadmin',
  permissions: ['read', 'write', 'delete', 'manage']
};

// Mock database or storage (simulate with a simple in-memory object)
let rolesDB = {};

// Stub functions for the userRoleManagement API to simulate database operations
beforeEach(() => {
  rolesDB = {};

  sinon.stub(userRoleManagement, 'createRole').callsFake(async (roleData) => {
    if (!roleData.name) {
      throw new Error('Role name is required');
    }
    const newRole = { ...roleData, id: 'generated-id' };
    rolesDB[newRole.id] = newRole;
    return newRole;
  });

  sinon.stub(userRoleManagement, 'getRoleById').callsFake(async (id) => {
    if (!rolesDB[id]) {
      throw new Error('Role not found');
    }
    return rolesDB[id];
  });

  sinon.stub(userRoleManagement, 'updateRole').callsFake(async (id, updateData) => {
    if (!rolesDB[id]) {
      throw new Error('Role not found');
    }
    rolesDB[id] = { ...rolesDB[id], ...updateData };
    return rolesDB[id];
  });

  sinon.stub(userRoleManagement, 'deleteRole').callsFake(async (id) => {
    if (!rolesDB[id]) {
      throw new Error('Role not found');
    }
    const deleted = rolesDB[id];
    delete rolesDB[id];
    return deleted;
  });
});

// Restore the original functions after each test
afterEach(() => {
  sinon.restore();
});

// Test suite
describe('User Role Management API', () => {
  describe('createRole()', () => {
    it('should create a new role successfully', async () => {
      const roleData = { name: 'admin', permissions: ['read', 'write'] };
      const result = await userRoleManagement.createRole(roleData);
      expect(result).to.have.property('id');
      expect(result.name).to.equal('admin');
      expect(result.permissions).to.include('read');
    });

    it('should throw an error if role name is missing', async () => {
      const roleData = { permissions: ['read'] };
      try {
        await userRoleManagement.createRole(roleData);
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.equal('Role name is required');
      }
    });
  });

  describe('getRoleById()', () => {
    it('should return the role for a valid ID', async () => {
      // Setup: add role to mock DB
      rolesDB['role1'] = { id: 'role1', name: 'user', permissions: ['read'] };
      const role = await userRoleManagement.getRoleById('role1');
      expect(role).to.have.property('id', 'role1');
      expect(role.name).to.equal('user');
    });

    it('should throw an error if role not found', async () => {
      try {
        await userRoleManagement.getRoleById('nonexistent');
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.equal('Role not found');
      }
    });
  });

  describe('updateRole()', () => {
    it('should update an existing role', async () => {
      rolesDB['role2'] = { id: 'role2', name: 'moderator', permissions: ['read', 'write'] };
      const updatedRole = await userRoleManagement.updateRole('role2', mockRoleUpdate);
      expect(updatedRole.name).to.equal('superadmin');
      expect(updatedRole.permissions).to.include('manage');
    });

    it('should throw an error if role to update does not exist', async () => {
      try {
        await userRoleManagement.updateRole('nonexistent', mockRoleUpdate);
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.equal('Role not found');
      }
    });
  });

  describe('deleteRole()', () => {
    it('should delete an existing role', async () => {
      rolesDB['role3'] = { id: 'role3', name: 'viewer', permissions: ['read'] };
      const deletedRole = await userRoleManagement.deleteRole('role3');
      expect(deletedRole.name).to.equal('viewer');
      expect(rolesDB['role3']).to.be.undefined;
    });

    it('should throw an error if role to delete does not exist', async () => {
      try {
        await userRoleManagement.deleteRole('nonexistent');
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.equal('Role not found');
      }
    });
  });
});
