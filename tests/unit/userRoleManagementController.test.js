/**
 * Unit tests for userRoleManagementController
 *
 * These tests cover the main functionalities of the user role management controller,
 * including creating, updating, retrieving, and deleting user roles.
 *
 * Dependencies:
 * - src/controllers/userRoleManagementController.js
 */

const sinon = require('sinon');
const { expect } = require('chai');

const userRoleManagementController = require('../../src/controllers/userRoleManagementController');
const UserRole = require('../../src/models/userRole');

// Helper function to create a mock Express response object
function mockResponse() {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  return res;
}

describe('userRoleManagementController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = mockResponse();
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createUserRole', () => {
    it('should create a new user role and return 201 with role data', async () => {
      const roleData = { name: 'admin', permissions: ['read', 'write'] };
      req.body = roleData;

      const savedRole = { _id: '123', ...roleData };

      const createStub = sinon.stub(UserRole.prototype, 'save').resolves(savedRole);

      await userRoleManagementController.createUserRole(req, res, next);

      expect(createStub.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('name', 'admin'))).to.be.true;
    });

    it('should call next with error when save fails', async () => {
      const error = new Error('Database error');
      sinon.stub(UserRole.prototype, 'save').rejects(error);

      req.body = { name: 'admin', permissions: ['read'] };

      await userRoleManagementController.createUserRole(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('getUserRoleById', () => {
    it('should return role data when found', async () => {
      const roleId = 'abc123';
      req.params = { id: roleId };
      const roleDoc = { _id: roleId, name: 'user', permissions: ['read'] };

      sinon.stub(UserRole, 'findById').resolves(roleDoc);

      await userRoleManagementController.getUserRoleById(req, res, next);

      expect(res.json.calledWith(roleDoc)).to.be.true;
    });

    it('should return 404 when role not found', async () => {
      req.params = { id: 'notfound' };
      sinon.stub(UserRole, 'findById').resolves(null);

      await userRoleManagementController.getUserRoleById(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User role not found' })).to.be.true;
    });

    it('should call next with error on DB failure', async () => {
      const error = new Error('DB failure');
      sinon.stub(UserRole, 'findById').rejects(error);

      req.params = { id: 'error' };

      await userRoleManagementController.getUserRoleById(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('updateUserRole', () => {
    it('should update role and return updated data', async () => {
      const roleId = 'update123';
      req.params = { id: roleId };
      req.body = { name: 'moderator', permissions: ['read', 'comment'] };

      const updatedRole = { _id: roleId, ...req.body };

      sinon.stub(UserRole, 'findByIdAndUpdate').resolves(updatedRole);

      await userRoleManagementController.updateUserRole(req, res, next);

      expect(res.json.calledWith(updatedRole)).to.be.true;
    });

    it('should return 404 if role to update not found', async () => {
      req.params = { id: 'missing' };
      req.body = { name: 'moderator' };

      sinon.stub(UserRole, 'findByIdAndUpdate').resolves(null);

      await userRoleManagementController.updateUserRole(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User role not found' })).to.be.true;
    });

    it('should call next with error on DB failure', async () => {
      const error = new Error('DB error');
      sinon.stub(UserRole, 'findByIdAndUpdate').rejects(error);

      req.params = { id: 'error' };
      req.body = { name: 'admin' };

      await userRoleManagementController.updateUserRole(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });

  describe('deleteUserRole', () => {
    it('should delete role and return success message', async () => {
      const roleId = 'delete123';
      req.params = { id: roleId };

      sinon.stub(UserRole, 'findByIdAndDelete').resolves({ _id: roleId });

      await userRoleManagementController.deleteUserRole(req, res, next);

      expect(res.json.calledWith({ message: 'User role deleted successfully' })).to.be.true;
    });

    it('should return 404 if role to delete not found', async () => {
      req.params = { id: 'missing' };

      sinon.stub(UserRole, 'findByIdAndDelete').resolves(null);

      await userRoleManagementController.deleteUserRole(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'User role not found' })).to.be.true;
    });

    it('should call next with error on DB failure', async () => {
      const error = new Error('DB error');
      sinon.stub(UserRole, 'findByIdAndDelete').rejects(error);

      req.params = { id: 'error' };

      await userRoleManagementController.deleteUserRole(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });
});
