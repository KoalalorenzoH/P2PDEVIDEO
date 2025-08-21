// tests/unit/authMiddleware.test.js

const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { authMiddleware, roleMiddleware } = require('../../src/middleware/authMiddleware');

// Mock secret for JWT
const JWT_SECRET = 'testsecret';

// Mock user data for JWT payload
const mockUser = {
  id: '12345',
  username: 'testuser',
  roles: ['user']
};

// Helper function to generate JWT token
function generateToken(payload = mockUser, expiresIn = '1h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

describe('authMiddleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    // Use the authMiddleware with the mock JWT secret
    app.use((req, res, next) => {
      req.app = { get: () => JWT_SECRET };
      next();
    });
    app.use(authMiddleware);
    app.get('/protected', (req, res) => {
      res.status(200).json({ message: 'Access granted', user: req.user });
    });
  });

  test('should allow access with valid token', async () => {
    const token = generateToken();
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Access granted');
    expect(res.body.user).toMatchObject({ id: mockUser.id, username: mockUser.username });
  });

  test('should deny access with no token', async () => {
    const res = await request(app)
      .get('/protected');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('should deny access with invalid token', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('should deny access with expired token', async () => {
    const expiredToken = generateToken(mockUser, '-1s');
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});


describe('roleMiddleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    // Middleware to mock user injection into request
    app.use((req, res, next) => {
      req.user = { id: '12345', roles: ['user', 'admin'] };
      next();
    });
  });

  test('should allow access when user has required role', async () => {
    app.get('/admin', roleMiddleware(['admin']), (req, res) => {
      res.status(200).json({ message: 'Admin access granted' });
    });

    const res = await request(app).get('/admin');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Admin access granted');
  });

  test('should deny access when user lacks required role', async () => {
    app.get('/superadmin', roleMiddleware(['superadmin']), (req, res) => {
      res.status(200).json({ message: 'Superadmin access granted' });
    });

    const res = await request(app).get('/superadmin');
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Forbidden: insufficient role');
  });

  test('should deny access when no user in request', async () => {
    // Override middleware to simulate no user
    app = express();
    app.use(roleMiddleware(['admin']));
    app.get('/admin', (req, res) => {
      res.status(200).json({ message: 'Admin access granted' });
    });

    const res = await request(app).get('/admin');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Unauthorized: no user found');
  });
});
