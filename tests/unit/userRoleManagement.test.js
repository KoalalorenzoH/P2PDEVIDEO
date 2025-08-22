/**
 * Unit tests for user role management functionality
 *
 * This test suite covers the core functionalities of the userRoleManagement controller,
 * including creating, retrieving, updating, and deleting user roles.
 * It ensures that roles are managed correctly and errors are handled properly.
 */

const { expect } = require('chai');
const sinon = require('sinon');

const userRoleManagement = require('../../src/controllers/userRoleManagement');
const userRoleModel = require('../../src/models/userRole');

// Mock data for testing
const mockRole = {
  _id: 'role123',
  name: 'admin',
  permissions: ['read', 'write', 'delete'],
};

const mockRoleCreateInput = {
  name: 'moderator',
  permissions: ['read', 'write'],
};

// Sinon sandbox for restoring mocks after each test
let sandbox;

describe('UserRoleManagement Controller', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createRole', () => {
    it('should create and return a new role', async () => {
      sandbox.stub(userRoleModel, 'create').resolves(mockRole);

      const req = { body: mockRoleCreateInput };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.createRole(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('name', 'admin'))).to.be.true;
    });

    it('should handle errors during role creation', async () => {
      sandbox.stub(userRoleModel, 'create').rejects(new Error('DB error'));

      const req = { body: mockRoleCreateInput };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.createRole(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;
    });
  });

  describe('getRoleById', () => {
    it('should return role by ID', async () => {
      sandbox.stub(userRoleModel, 'findById').resolves(mockRole);

      const req = { params: { id: 'role123' } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.getRoleById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockRole)).to.be.true;
    });

    it('should return 404 if role not found', async () => {
      sandbox.stub(userRoleModel, 'findById').resolves(null);

      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.getRoleById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;
    });

    it('should handle errors during role retrieval', async () => {
      sandbox.stub(userRoleModel, 'findById').rejects(new Error('DB error'));

      const req = { params: { id: 'role123' } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.getRoleById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;
    });
  });

  describe('updateRole', () => {
    it('should update and return the role', async () => {
      sandbox.stub(userRoleModel, 'findByIdAndUpdate').resolves(mockRole);

      const req = {
        params: { id: 'role123' },
        body: { name: 'admin-updated', permissions: ['read', 'write'] },
      };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.updateRole(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockRole)).to.be.true;
    });

    it('should return 404 if role to update not found', async () => {
      sandbox.stub(userRoleModel, 'findByIdAndUpdate').resolves(null);

      const req = {
        params: { id: 'nonexistent' },
        body: { name: 'admin-updated' },
      };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.updateRole(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;
    });

    it('should handle errors during role update', async () => {
      sandbox.stub(userRoleModel, 'findByIdAndUpdate').rejects(new Error('DB error'));

      const req = {
        params: { id: 'role123' },
        body: { name: 'admin-updated' },
      };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.updateRole(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;
    });
  });

  describe('deleteRole', () => {
    it('should delete the role and return success message', async () => {
      sandbox.stub(userRoleModel, 'findByIdAndDelete').resolves(mockRole);

      const req = { params: { id: 'role123' } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.deleteRole(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('message'))).to.be.true;
    });

    it('should return 404 if role to delete not found', async () => {
      sandbox.stub(userRoleModel, 'findByIdAndDelete').resolves(null);

      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.deleteRole(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;
    });

    it('should handle errors during role deletion', async () => {
      sandbox.stub(userRoleModel, 'findByIdAndDelete').rejects(new Error('DB error'));

      const req = { params: { id: 'role123' } };
      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.stub(),
      };

      await userRoleManagement.deleteRole(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;
    });
  });
});
