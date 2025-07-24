// tests/unit/userRoleManagement.test.js

import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import * as userRoleManagementAPI from '../../src/api/userRoleManagement.js';

chai.use(chaiAsPromised);
const { expect } = chai;

// Mock data for testing
const mockRoleData = {
  name: 'admin',
  permissions: ['read', 'write', 'delete'],
};

const mockUpdatedRoleData = {
  name: 'admin',
  permissions: ['read', 'write'],
};

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
      sandbox.stub(userRoleManagementAPI, 'createRole').resolves({
        id: '12345',
        ...mockRoleData,
      });

      const result = await userRoleManagementAPI.createRole(mockRoleData);
      expect(result).to.have.property('id');
      expect(result.name).to.equal('admin');
      expect(result.permissions).to.include.members(['read', 'write', 'delete']);
    });

    it('should reject when role data is incomplete', async () => {
      sandbox.stub(userRoleManagementAPI, 'createRole').rejects(new Error('Invalid role data'));

      await expect(userRoleManagementAPI.createRole({})).to.be.rejectedWith('Invalid role data');
    });
  });

  describe('getRole', () => {
    it('should return role data for a valid role ID', async () => {
      sandbox.stub(userRoleManagementAPI, 'getRole').resolves(mockRoleData);

      const result = await userRoleManagementAPI.getRole('12345');
      expect(result).to.have.property('name', 'admin');
      expect(result.permissions).to.include('read');
    });

    it('should reject if role ID is not found', async () => {
      sandbox.stub(userRoleManagementAPI, 'getRole').rejects(new Error('Role not found'));

      await expect(userRoleManagementAPI.getRole('nonexistent')).to.be.rejectedWith('Role not found');
    });
  });

  describe('updateRole', () => {
    it('should update role permissions successfully', async () => {
      sandbox.stub(userRoleManagementAPI, 'updateRole').resolves(mockUpdatedRoleData);

      const result = await userRoleManagementAPI.updateRole('12345', mockUpdatedRoleData);
      expect(result.permissions).to.not.include('delete');
      expect(result.permissions).to.include('write');
    });

    it('should reject if update data is invalid', async () => {
      sandbox.stub(userRoleManagementAPI, 'updateRole').rejects(new Error('Invalid update data'));

      await expect(userRoleManagementAPI.updateRole('12345', {})).to.be.rejectedWith('Invalid update data');
    });
  });

  describe('deleteRole', () => {
    it('should delete role successfully', async () => {
      sandbox.stub(userRoleManagementAPI, 'deleteRole').resolves(true);

      const result = await userRoleManagementAPI.deleteRole('12345');
      expect(result).to.be.true;
    });

    it('should reject if role ID does not exist', async () => {
      sandbox.stub(userRoleManagementAPI, 'deleteRole').rejects(new Error('Role not found'));

      await expect(userRoleManagementAPI.deleteRole('nonexistent')).to.be.rejectedWith('Role not found');
    });
  });
});
