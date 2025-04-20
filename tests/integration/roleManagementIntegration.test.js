const request = require('supertest');
const app = require('../../src/app'); // Assuming there's an app.js file that initializes the Express app
const mongoose = require('mongoose');

// Test suite for role management integration
describe('Role Management Integration Tests', () => {
  // Connect to the database before running the tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { // Ensure you have the connection string set in your environment variables
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Clear the database after each test
  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('Create a new role', async () => {
    const newRole = { name: 'Admin', permissions: ['manage_users', 'manage_content'] };
    const response = await request(app)
      .post('/api/roles') // Adjust to your actual API endpoint
      .send(newRole)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', newRole.name);
    expect(response.body).toHaveProperty('permissions', newRole.permissions);
  });

  test('Get all roles', async () => {
    await request(app)
      .post('/api/roles')
      .send({ name: 'User', permissions: ['view_content'] });

    const response = await request(app)
      .get('/api/roles')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Update a role', async () => {
    const newRole = await request(app)
      .post('/api/roles')
      .send({ name: 'Editor', permissions: ['edit_content'] });

    const updatedRole = { name: 'Editor', permissions: ['edit_content', 'publish_content'] };
    const response = await request(app)
      .put(`/api/roles/${newRole.body._id}`) // Use the ID of the created role
      .send(updatedRole)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('permissions', updatedRole.permissions);
  });

  test('Delete a role', async () => {
    const newRole = await request(app)
      .post('/api/roles')
      .send({ name: 'Guest', permissions: ['view_content'] });

    const response = await request(app)
      .delete(`/api/roles/${newRole.body._id}`) // Use the ID of the created role
      .set('Accept', 'application/json');

    expect(response.status).toBe(204);
  });
});