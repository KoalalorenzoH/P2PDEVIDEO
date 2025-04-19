const request = require('supertest');
const app = require('../../app'); // replace with your app entry point
const userRoleController = require('../../controllers/userRoleController');

// Mock the userRoleController methods
jest.mock('../../controllers/userRoleController');

describe('User Role Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks before each test
    });

    it('should create a new user role', async () => {
        const newRole = { name: 'Admin', permissions: ['read', 'write', 'delete'] };
        userRoleController.createRole.mockImplementation((req, res) => {
            res.status(201).json({ message: 'Role created', role: newRole });
        });

        const response = await request(app)
            .post('/api/user-roles')
            .send(newRole);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Role created');
        expect(response.body.role).toEqual(newRole);
        expect(userRoleController.createRole).toHaveBeenCalled();
    });

    it('should retrieve a user role by ID', async () => {
        const mockRole = { id: '1', name: 'Admin', permissions: ['read', 'write'] };
        userRoleController.getRoleById.mockImplementation((req, res) => {
            res.status(200).json(mockRole);
        });

        const response = await request(app)
            .get('/api/user-roles/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockRole);
        expect(userRoleController.getRoleById).toHaveBeenCalledWith(expect.objectContaining({ params: { id: '1' } }));
    });

    it('should update a user role', async () => {
        const updatedRole = { name: 'User', permissions: ['read'] };
        userRoleController.updateRole.mockImplementation((req, res) => {
            res.status(200).json({ message: 'Role updated', role: updatedRole });
        });

        const response = await request(app)
            .put('/api/user-roles/1')
            .send(updatedRole);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Role updated');
        expect(response.body.role).toEqual(updatedRole);
    });

    it('should delete a user role', async () => {
        userRoleController.deleteRole.mockImplementation((req, res) => {
            res.status(204).send();
        });

        const response = await request(app)
            .delete('/api/user-roles/1');

        expect(response.statusCode).toBe(204);
        expect(userRoleController.deleteRole).toHaveBeenCalledWith(expect.objectContaining({ params: { id: '1' } }));
    });
});