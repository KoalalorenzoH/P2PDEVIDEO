/**
 * Integration tests for user role management API
 *
 * These tests cover creating, reading, updating, and deleting user roles,
 * as well as role assignment and validation.
 */

const request = require('supertest');
const app = require('../../src/api/userRoleManagement');
const mongoose = require('mongoose');
const UserRole = require('../../src/models/userRole');
const User = require('../../src/models/userModel');
const Role = require('../../src/models/roleModel');

// Setup test database connection before running tests
beforeAll(async () => {
  const mongoUri = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/p2pdevideo_test';
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clean up collections after each test
afterEach(async () => {
  await UserRole.deleteMany({});
  await User.deleteMany({});
  await Role.deleteMany({});
});

// Disconnect mongoose after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('User Role Management Integration Tests', () => {
  let adminRole;
  let userRole;
  let testUser;

  beforeEach(async () => {
    // Create roles
    adminRole = new Role({ name: 'admin', description: 'Administrator role' });
    userRole = new Role({ name: 'user', description: 'Standard user role' });
    await adminRole.save();
    await userRole.save();

    // Create user
    testUser = new User({ username: 'testuser', email: 'testuser@example.com', password: 'hashedpassword' });
    await testUser.save();
  });

  test('should create a new user role assignment', async () => {
    const res = await request(app)
      .post('/roles/assign')
      .send({ userId: testUser._id.toString(), roleId: adminRole._id.toString() })
      .expect(201);

    expect(res.body).toHaveProperty('message', 'Role assigned successfully');
    expect(res.body.data).toHaveProperty('userId', testUser._id.toString());
    expect(res.body.data).toHaveProperty('roleId', adminRole._id.toString());

    // Verify in DB
    const userRoleAssignment = await UserRole.findOne({ userId: testUser._id });
    expect(userRoleAssignment).not.toBeNull();
    expect(userRoleAssignment.roleId.toString()).toBe(adminRole._id.toString());
  });

  test('should fetch all user role assignments', async () => {
    // Assign role first
    const userRoleAssignment = new UserRole({ userId: testUser._id, roleId: userRole._id });
    await userRoleAssignment.save();

    const res = await request(app)
      .get('/roles')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    const found = res.body.find(r => r.userId === testUser._id.toString());
    expect(found).toBeDefined();
  });

  test('should update a user role assignment', async () => {
    // Assign initial role
    const userRoleAssignment = new UserRole({ userId: testUser._id, roleId: userRole._id });
    await userRoleAssignment.save();

    const res = await request(app)
      .put(`/roles/${userRoleAssignment._id.toString()}`)
      .send({ roleId: adminRole._id.toString() })
      .expect(200);

    expect(res.body).toHaveProperty('message', 'User role updated successfully');
    expect(res.body.data.roleId).toBe(adminRole._id.toString());

    const updatedRole = await UserRole.findById(userRoleAssignment._id);
    expect(updatedRole.roleId.toString()).toBe(adminRole._id.toString());
  });

  test('should delete a user role assignment', async () => {
    const userRoleAssignment = new UserRole({ userId: testUser._id, roleId: userRole._id });
    await userRoleAssignment.save();

    const res = await request(app)
      .delete(`/roles/${userRoleAssignment._id.toString()}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'User role deleted successfully');

    const deleted = await UserRole.findById(userRoleAssignment._id);
    expect(deleted).toBeNull();
  });

  test('should return 404 when updating non-existent user role', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/roles/${fakeId.toString()}`)
      .send({ roleId: adminRole._id.toString() })
      .expect(404);

    expect(res.body).toHaveProperty('error', 'User role not found');
  });

  test('should return 404 when deleting non-existent user role', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .delete(`/roles/${fakeId.toString()}`)
      .expect(404);

    expect(res.body).toHaveProperty('error', 'User role not found');
  });
});

