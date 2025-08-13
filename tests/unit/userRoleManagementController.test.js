"use strict";

const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const userRoleManagementController = require("../../src/controllers/userRoleManagementController");
const UserRole = require("../../src/models/userRole");

// Mock response object for Express
function mockResponse() {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
}

// Mock request object
function mockRequest(body = {}, params = {}, query = {}) {
  return {
    body,
    params,
    query
  };
}

describe("UserRoleManagementController", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("createUserRole", () => {
    it("should create a new user role and return 201 status", async () => {
      const req = mockRequest({ name: "admin", description: "Administrator role" });
      const res = mockResponse();

      const fakeSave = sinon.stub().resolves({ _id: "123", name: "admin", description: "Administrator role" });
      sinon.stub(UserRole.prototype, "save").callsFake(fakeSave);

      await userRoleManagementController.createUserRole(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const responseArg = res.json.getCall(0).args[0];
      expect(responseArg).to.have.property("_id");
      expect(responseArg.name).to.equal("admin");
      expect(responseArg.description).to.equal("Administrator role");
    });

    it("should handle errors and return 500 status", async () => {
      const req = mockRequest({ name: "admin" });
      const res = mockResponse();

      sinon.stub(UserRole.prototype, "save").rejects(new Error("Database error"));

      await userRoleManagementController.createUserRole(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("error");
    });
  });

  describe("getUserRoleById", () => {
    it("should return user role when found", async () => {
      const req = mockRequest({}, { id: "123" });
      const res = mockResponse();

      sinon.stub(UserRole, "findById").resolves({ _id: "123", name: "admin", description: "Administrator role" });

      await userRoleManagementController.getUserRoleById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const responseArg = res.json.getCall(0).args[0];
      expect(responseArg._id).to.equal("123");
      expect(responseArg.name).to.equal("admin");
    });

    it("should return 404 if user role not found", async () => {
      const req = mockRequest({}, { id: "nonexistent" });
      const res = mockResponse();

      sinon.stub(UserRole, "findById").resolves(null);

      await userRoleManagementController.getUserRoleById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("message").that.includes("not found");
    });

    it("should handle errors and return 500 status", async () => {
      const req = mockRequest({}, { id: "123" });
      const res = mockResponse();

      sinon.stub(UserRole, "findById").rejects(new Error("DB error"));

      await userRoleManagementController.getUserRoleById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("error");
    });
  });

  describe("updateUserRole", () => {
    it("should update an existing user role and return updated role", async () => {
      const req = mockRequest({ name: "moderator" }, { id: "123" });
      const res = mockResponse();

      sinon.stub(UserRole, "findByIdAndUpdate").resolves({ _id: "123", name: "moderator" });

      await userRoleManagementController.updateUserRole(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const responseArg = res.json.getCall(0).args[0];
      expect(responseArg.name).to.equal("moderator");
    });

    it("should return 404 if role to update not found", async () => {
      const req = mockRequest({ name: "moderator" }, { id: "nonexistent" });
      const res = mockResponse();

      sinon.stub(UserRole, "findByIdAndUpdate").resolves(null);

      await userRoleManagementController.updateUserRole(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("message").that.includes("not found");
    });

    it("should handle errors and return 500 status", async () => {
      const req = mockRequest({ name: "moderator" }, { id: "123" });
      const res = mockResponse();

      sinon.stub(UserRole, "findByIdAndUpdate").rejects(new Error("DB error"));

      await userRoleManagementController.updateUserRole(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("error");
    });
  });

  describe("deleteUserRole", () => {
    it("should delete the user role and return success message", async () => {
      const req = mockRequest({}, { id: "123" });
      const res = mockResponse();

      sinon.stub(UserRole, "findByIdAndDelete").resolves({ _id: "123" });

      await userRoleManagementController.deleteUserRole(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("message").that.includes("deleted");
    });

    it("should return 404 if role to delete not found", async () => {
      const req = mockRequest({}, { id: "nonexistent" });
      const res = mockResponse();

      sinon.stub(UserRole, "findByIdAndDelete").resolves(null);

      await userRoleManagementController.deleteUserRole(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("message").that.includes("not found");
    });

    it("should handle errors and return 500 status", async () => {
      const req = mockRequest({}, { id: "123" });
      const res = mockResponse();

      sinon.stub(UserRole, "findByIdAndDelete").rejects(new Error("DB error"));

      await userRoleManagementController.deleteUserRole(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("error");
    });
  });

  describe("listUserRoles", () => {
    it("should return list of user roles", async () => {
      const req = mockRequest();
      const res = mockResponse();

      const fakeRoles = [
        { _id: "1", name: "admin" },
        { _id: "2", name: "user" }
      ];
      sinon.stub(UserRole, "find").resolves(fakeRoles);

      await userRoleManagementController.listUserRoles(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      const responseArg = res.json.getCall(0).args[0];
      expect(responseArg).to.be.an("array").with.lengthOf(2);
      expect(responseArg[0].name).to.equal("admin");
    });

    it("should handle errors and return 500 status", async () => {
      const req = mockRequest();
      const res = mockResponse();

      sinon.stub(UserRole, "find").rejects(new Error("DB error"));

      await userRoleManagementController.listUserRoles(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property("error");
    });
  });
});
