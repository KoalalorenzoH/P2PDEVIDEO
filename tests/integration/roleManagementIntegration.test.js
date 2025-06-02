const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app
const RoleManagementController = require('../../src/controllers/roleManagementController');

describe('Role Management Integration Tests', () => {
    describe('POST /api/roles', () => {
        it('should create a new role', async () => {
            const newRole = { name: 'Admin', permissions: ['CREATE', 'READ', 'UPDATE', 'DELETE'] };
            const response = await request(app)
                .post('/api/roles')
                .send(newRole)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newRole.name);
        });

        it('should return 400 if role name is missing', async () => {
            const response = await request(app)
                .post('/api/roles')
                .send({ permissions: ['READ'] })
                .expect(400);

            expect(response.body.message).toBe('Role name is required.');
        });
    });

    describe('GET /api/roles', () => {
        it('should retrieve all roles', async () => {
            const response = await request(app)
                .get('/api/roles')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /api/roles/:id', () => {
        it('should retrieve a role by ID', async () => {
            const roleId = 'some-role-id'; // Replace with an actual role ID after creating one in the setup
            const response = await request(app)
                .get(`/api/roles/${roleId}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', roleId);
        });

        it('should return 404 if role not found', async () => {
            const response = await request(app)
                .get('/api/roles/non-existing-id')
                .expect(404);

            expect(response.body.message).toBe('Role not found.');
        });
    });

    describe('PUT /api/roles/:id', () => {
        it('should update a role', async () => {
            const roleId = 'some-role-id'; // Replace with an actual role ID
            const updatedRole = { name: 'SuperAdmin', permissions: ['ALL'] };
            const response = await request(app)
                .put(`/api/roles/${roleId}`)
                .send(updatedRole)
                .expect(200);

            expect(response.body.name).toBe(updatedRole.name);
        });

        it('should return 404 if role not found', async () => {
            const response = await request(app)
                .put('/api/roles/non-existing-id')
                .send({ name: 'NewRole' })
                .expect(404);

            expect(response.body.message).toBe('Role not found.');
        });
    });

    describe('DELETE /api/roles/:id', () => {
        it('should delete a role', async () => {
            const roleId = 'some-role-id'; // Replace with an actual role ID
            await request(app)
                .delete(`/api/roles/${roleId}`)
                .expect(204);
        });

        it('should return 404 if role not found', async () => {
            const response = await request(app)
                .delete('/api/roles/non-existing-id')
                .expect(404);

            expect(response.body.message).toBe('Role not found.');
        });
    });
});