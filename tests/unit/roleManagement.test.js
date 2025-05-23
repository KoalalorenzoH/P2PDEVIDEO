const request = require('supertest');
const app = require('../../app'); // Assuming your app entry point is app.js
const roleManagementController = require('../../src/controllers/roleManagementController');

// Mock data for testing
const mockRoles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
];

jest.mock('../../src/controllers/roleManagementController');

describe('Role Management Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks before each test
    });

    test('GET /api/roles - should return all roles', async () => {
        roleManagementController.getRoles.mockResolvedValue(mockRoles);
        const response = await request(app).get('/api/roles');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockRoles);
    });

    test('POST /api/roles - should create a new role', async () => {
        const newRole = { name: 'Guest' };
        roleManagementController.createRole.mockResolvedValue({ id: 3, ...newRole });
        const response = await request(app).post('/api/roles').send(newRole);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newRole.name);
    });

    test('PUT /api/roles/:id - should update an existing role', async () => {
        const updatedRole = { name: 'SuperAdmin' };
        roleManagementController.updateRole.mockResolvedValue({ id: 1, ...updatedRole });
        const response = await request(app).put('/api/roles/1').send(updatedRole);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(updatedRole.name);
    });

    test('DELETE /api/roles/:id - should delete a role', async () => {
        roleManagementController.deleteRole.mockResolvedValue({ success: true });
        const response = await request(app).delete('/api/roles/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });
});