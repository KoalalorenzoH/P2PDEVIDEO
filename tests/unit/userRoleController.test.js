const request = require('supertest');
const app = require('../../app'); // Ensure correct path to your app
const userRoleController = require('../controllers/userRoleController');

describe('User Role Controller', () => {
    let roleId;

    // Setup: Create a mock role to use in the tests
    beforeAll(async () => {
        const roleResponse = await userRoleController.createRole({ name: 'Test Role' });
        roleId = roleResponse._id; // Store the created role ID
    });

    // Test case for retrieving a role by ID
    it('should retrieve a role by ID', async () => {
        const response = await request(app)
            .get(`/api/roles/${roleId}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toHaveProperty('_id', roleId);
    });

    // Test case for updating a role
    it('should update a role', async () => {
        const updatedRole = { name: 'Updated Role' };
        const response = await request(app)
            .put(`/api/roles/${roleId}`)
            .send(updatedRole)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toHaveProperty('name', 'Updated Role');
    });

    // Test case for deleting a role
    it('should delete a role', async () => {
        await request(app)
            .delete(`/api/roles/${roleId}`)
            .expect(204);
    });

    // Cleanup: Remove the created role after tests
    afterAll(async () => {
        await userRoleController.deleteRole(roleId);
    });
});
