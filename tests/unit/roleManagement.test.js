const request = require('supertest');
const app = require('../../src/app');
const { Role } = require('../../src/models/userRole');
const roleManagementController = require('../../src/controllers/roleManagementController');

describe('Role Management', () => {
  let roleId;

  beforeAll(async () => {
    // Create a role for testing
    const role = await Role.create({ name: 'Test Role' });
    roleId = role._id;
  });

  afterAll(async () => {
    // Clean up the role after tests
    await Role.deleteMany();
  });

  it('should create a new role', async () => {
    const response = await request(app)
      .post('/api/roles')
      .send({ name: 'Admin' })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('Admin');
  });

  it('should fetch all roles', async () => {
    const response = await request(app)
      .get('/api/roles')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a role', async () => {
    const response = await request(app)
      .put(`/api/roles/${roleId}`)
      .send({ name: 'Updated Role' })
      .expect(200);

    expect(response.body.name).toBe('Updated Role');
  });

  it('should delete a role', async () => {
    const response = await request(app)
      .delete(`/api/roles/${roleId}`)
      .expect(204);

    expect(response.body).toEqual({});
  });
});
