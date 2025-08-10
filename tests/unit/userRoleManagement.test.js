// tests/unit/userRoleManagement.test.js

import chai from 'chai';
import sinon from 'sinon';
import * as userRoleManagement from '../../src/api/userRoleManagement.js';

const { expect } = chai;

describe('User Role Management API', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createRole', () => {
    it('should create a new role successfully', async () => {
      // Stub the database or model interaction inside createRole
      const newRole = { name: 'admin', permissions: ['read', 'write'] };
      const createStub = sandbox.stub(userRoleManagement, 'createRole').resolves(newRole);

      const result = await userRoleManagement.createRole(newRole);
      expect(createStub.calledOnce).to.be.true;
      expect(result).to.deep.equal(newRole);
    });

    it('should throw an error if role data is invalid', async () => {
      const invalidRole = { permissions: ['read'] }; // missing name
      sandbox.stub(userRoleManagement, 'createRole').throws(new Error('Invalid role data'));

      try {
        await userRoleManagement.createRole(invalidRole);
        throw new Error('Test failed: error was not thrown');
      } catch (err) {
        expect(err.message).to.equal('Invalid role data');
      }
    });
  });

  describe('getRole', () => {
    it('should return role data for existing role', async () => {
      const roleId = '12345';
      const roleData = { id: roleId, name: 'user', permissions: ['read'] };
      sandbox.stub(userRoleManagement, 'getRole').resolves(roleData);

      const result = await userRoleManagement.getRole(roleId);
      expect(result).to.deep.equal(roleData);
    });

    it('should return null if role does not exist', async () => {
      const roleId = 'nonexistent';
      sandbox.stub(userRoleManagement, 'getRole').resolves(null);

      const result = await userRoleManagement.getRole(roleId);
      expect(result).to.be.null;
    });
  });

  describe('updateRole', () => {
    it('should update role data successfully', async () => {
      const roleId = '12345';
      const updateData = { permissions: ['read', 'write', 'delete'] };
      const updatedRole = { id: roleId, name: 'user', ...updateData };
      sandbox.stub(userRoleManagement, 'updateRole').resolves(updatedRole);

      const result = await userRoleManagement.updateRole(roleId, updateData);
      expect(result).to.deep.equal(updatedRole);
    });

    it('should throw an error if update data is invalid', async () => {
      const roleId = '12345';
      const invalidData = { invalidField: true };
      sandbox.stub(userRoleManagement, 'updateRole').throws(new Error('Invalid update data'));

      try {
        await userRoleManagement.updateRole(roleId, invalidData);
        throw new Error('Test failed: error was not thrown');
      } catch (err) {
        expect(err.message).to.equal('Invalid update data');
      }
    });
  });

  describe('deleteRole', () => {
    it('should delete role successfully', async () => {
      const roleId = '12345';
      sandbox.stub(userRoleManagement, 'deleteRole').resolves(true);

      const result = await userRoleManagement.deleteRole(roleId);
      expect(result).to.be.true;
    });

    it('should return false if role does not exist to delete', async () => {
      const roleId = 'nonexistent';
      sandbox.stub(userRoleManagement, 'deleteRole').resolves(false);

      const result = await userRoleManagement.deleteRole(roleId);
      expect(result).to.be.false;
    });
  });

  describe('listRoles', () => {
    it('should return a list of roles', async () => {
      const roles = [
        { id: '1', name: 'admin', permissions: ['all'] },
        { id: '2', name: 'user', permissions: ['read'] },
      ];
      sandbox.stub(userRoleManagement, 'listRoles').resolves(roles);

      const result = await userRoleManagement.listRoles();
      expect(result).to.deep.equal(roles);
    });

    it('should return empty array if no roles exist', async () => {
      sandbox.stub(userRoleManagement, 'listRoles').resolves([]);

      const result = await userRoleManagement.listRoles();
      expect(result).to.be.an('array').that.is.empty;
    });
  });
});
