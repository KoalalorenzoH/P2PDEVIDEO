import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import UserRoleManagementController from '../../src/controllers/userRoleManagementController.js';
import UserRole from '../../src/models/userRole.js';

const { expect } = chai;

// Mock response and request objects
const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

const mockRequest = (data) => {
  return data;
};

// Clear stubs and mocks after each test
describe('UserRoleManagementController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getAllRoles', () => {
    it('should return all user roles with status 200', async () => {
      const roles = [
        { _id: '1', name: 'admin' },
        { _id: '2', name: 'user' },
      ];

      sinon.stub(UserRole, 'find').resolves(roles);

      const req = mockRequest({});
      const res = mockResponse();

      await UserRoleManagementController.getAllRoles(req, res);

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(roles)).to.be.true;
    });

    it('should handle errors and return status 500', async () => {
      sinon.stub(UserRole, 'find').rejects(new Error('Database error'));

      const req = mockRequest({});
      const res = mockResponse();

      await UserRoleManagementController.getAllRoles(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });
  });

  describe('createRole', () => {
    it('should create a new role and return it with status 201', async () => {
      const newRoleData = { name: 'moderator' };
      const savedRole = { _id: mongoose.Types.ObjectId(), name: 'moderator' };

      sinon.stub(UserRole.prototype, 'save').resolves(savedRole);

      const req = mockRequest({ body: newRoleData });
      const res = mockResponse();

      await UserRoleManagementController.createRole(req, res);

      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith(savedRole)).to.be.true;
    });

    it('should handle validation errors and return status 400', async () => {
      sinon.stub(UserRole.prototype, 'save').rejects({ name: 'ValidationError', message: 'Name is required' });

      const req = mockRequest({ body: {} });
      const res = mockResponse();

      await UserRoleManagementController.createRole(req, res);

      expect(res.status.calledOnceWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });

    it('should handle other errors and return status 500', async () => {
      sinon.stub(UserRole.prototype, 'save').rejects(new Error('Unexpected error'));

      const req = mockRequest({ body: { name: 'test' } });
      const res = mockResponse();

      await UserRoleManagementController.createRole(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });
  });

  describe('getRoleById', () => {
    it('should return role by id with status 200', async () => {
      const roleId = mongoose.Types.ObjectId();
      const role = { _id: roleId, name: 'admin' };

      sinon.stub(UserRole, 'findById').resolves(role);

      const req = mockRequest({ params: { id: roleId.toString() } });
      const res = mockResponse();

      await UserRoleManagementController.getRoleById(req, res);

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(role)).to.be.true;
    });

    it('should return 404 if role not found', async () => {
      sinon.stub(UserRole, 'findById').resolves(null);

      const req = mockRequest({ params: { id: 'invalidid' } });
      const res = mockResponse();

      await UserRoleManagementController.getRoleById(req, res);

      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });

    it('should handle errors and return status 500', async () => {
      sinon.stub(UserRole, 'findById').rejects(new Error('Database error'));

      const req = mockRequest({ params: { id: 'someid' } });
      const res = mockResponse();

      await UserRoleManagementController.getRoleById(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });
  });

  describe('updateRole', () => {
    it('should update role successfully and return updated role', async () => {
      const roleId = mongoose.Types.ObjectId();
      const updateData = { name: 'superadmin' };
      const updatedRole = { _id: roleId, name: 'superadmin' };

      sinon.stub(UserRole, 'findByIdAndUpdate').resolves(updatedRole);

      const req = mockRequest({ params: { id: roleId.toString() }, body: updateData });
      const res = mockResponse();

      await UserRoleManagementController.updateRole(req, res);

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith(updatedRole)).to.be.true;
    });

    it('should return 404 if role to update not found', async () => {
      sinon.stub(UserRole, 'findByIdAndUpdate').resolves(null);

      const req = mockRequest({ params: { id: 'nonexistentid' }, body: { name: 'test' } });
      const res = mockResponse();

      await UserRoleManagementController.updateRole(req, res);

      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });

    it('should handle errors and return status 500', async () => {
      sinon.stub(UserRole, 'findByIdAndUpdate').rejects(new Error('Database error'));

      const req = mockRequest({ params: { id: 'id' }, body: { name: 'test' } });
      const res = mockResponse();

      await UserRoleManagementController.updateRole(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });
  });

  describe('deleteRole', () => {
    it('should delete role and return success message', async () => {
      const roleId = mongoose.Types.ObjectId();
      const deletedRole = { _id: roleId, name: 'admin' };

      sinon.stub(UserRole, 'findByIdAndDelete').resolves(deletedRole);

      const req = mockRequest({ params: { id: roleId.toString() } });
      const res = mockResponse();

      await UserRoleManagementController.deleteRole(req, res);

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Role deleted successfully' })).to.be.true;
    });

    it('should return 404 if role to delete not found', async () => {
      sinon.stub(UserRole, 'findByIdAndDelete').resolves(null);

      const req = mockRequest({ params: { id: 'nonexistentid' } });
      const res = mockResponse();

      await UserRoleManagementController.deleteRole(req, res);

      expect(res.status.calledOnceWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });

    it('should handle errors and return status 500', async () => {
      sinon.stub(UserRole, 'findByIdAndDelete').rejects(new Error('Database error'));

      const req = mockRequest({ params: { id: 'someid' } });
      const res = mockResponse();

      await UserRoleManagementController.deleteRole(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const errorResponse = res.json.getCall(0).args[0];
      expect(errorResponse).to.have.property('error');
    });
  });
});
