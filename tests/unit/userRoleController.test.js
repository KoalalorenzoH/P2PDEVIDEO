const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app.js or server.js
const UserRoleController = require('../../src/controllers/userRoleController');

// Mocking UserRoleController methods
jest.mock('../../src/controllers/userRoleController');

describe('User Role Controller', () => {
    describe('GET /api/roles', () => {
        it('should return all user roles', async () => {
            const roles = [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }];
            UserRoleController.getAllRoles.mockResolvedValueOnce(roles);

            const response = await request(app).get('/api/roles');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(roles);
        });
    });

    describe('POST /api/roles', () => {
        it('should create a new user role', async () => {
            const newRole = { name: 'Guest' };
            UserRoleController.createRole.mockResolvedValueOnce(newRole);

            const response = await request(app)
                .post('/api/roles')
                .send(newRole);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newRole);
        });

        it('should return 400 if the role name is missing', async () => {
            const response = await request(app)
                .post('/api/roles')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Role name is required');
        });
    });

    describe('DELETE /api/roles/:id', () => {
        it('should delete an existing user role', async () => {
            const roleId = 1;
            UserRoleController.deleteRole.mockResolvedValueOnce({ message: 'Role deleted' });

            const response = await request(app).delete(`/api/roles/${roleId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Role deleted');
        });

        it('should return 404 if the role does not exist', async () => {
            const roleId = 999;
            UserRoleController.deleteRole.mockResolvedValueOnce(null);

            const response = await request(app).delete(`/api/roles/${roleId}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Role not found');
        });
    });
});
