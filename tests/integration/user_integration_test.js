const request = require('supertest');
const app = require('../../src/api/user');

describe('User Management Integration Tests', () => {
  let userId;
  const testUser = { username: 'testUser', password: 'Test@1234' };

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send(testUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  it('should log in the registered user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: testUser.username, password: testUser.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should retrieve user profile', async () => {
    const response = await request(app)
      .get(`/profile/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', testUser.username);
  });

  it('should fail to log in with incorrect password', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: testUser.username, password: 'WrongPassword' });
    expect(response.status).toBe(401);
  });

  it('should delete the registered user', async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});