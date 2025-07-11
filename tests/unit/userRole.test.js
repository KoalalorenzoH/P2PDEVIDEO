<<<<<<< HEAD
const { UserRole } = require('../../models/userRole');

describe('User Role Model', () => {
    let userRole;

    beforeEach(() => {
        userRole = new UserRole({
            name: 'admin',
            permissions: ['create', 'read', 'update', 'delete']
        });
    });

    test('should create a valid user role', () => {
        expect(userRole.name).toBe('admin');
        expect(userRole.permissions).toContain('create');
    });

    test('should not create a user role without a name', () => {
        userRole.name = '';
        const error = userRole.validateSync();
        expect(error.errors.name).toBeDefined();
    });

    test('should throw an error if permissions are not an array', () => {
        userRole.permissions = 'not-an-array';
        const error = userRole.validateSync();
        expect(error.errors.permissions).toBeDefined();
    });

    test('should allow valid permissions', () => {
        userRole.permissions = ['read', 'write'];
        expect(userRole.permissions).toContain('read');
=======
const request = require('supertest');
const app = require('../../src/app'); // Ensure the app is properly exported
const mongoose = require('mongoose');
const UserRole = require('../../src/models/userRole'); // Import the user role model

// Mock data for tests
describe('User Role Management', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await UserRole.deleteMany({}); // Clear the database before each test
    });

    it('should create a new user role', async () => {
        const roleData = { name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] };
        const response = await request(app)
            .post('/api/userRoles')
            .send(roleData)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(roleData.name);
    });

    it('should get all user roles', async () => {
        const roleData1 = { name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] };
        const roleData2 = { name: 'User', permissions: ['read'] };
        await UserRole.create(roleData1);
        await UserRole.create(roleData2);

        const response = await request(app)
            .get('/api/userRoles')
            .expect(200);

        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe(roleData1.name);
        expect(response.body[1].name).toBe(roleData2.name);
    });

    it('should update a user role', async () => {
        const role = new UserRole({ name: 'User', permissions: ['read'] });
        await role.save();

        const updatedRoleData = { name: 'User', permissions: ['read', 'update'] };
        const response = await request(app)
            .put(`/api/userRoles/${role._id}`)
            .send(updatedRoleData)
            .expect(200);

        expect(response.body.permissions).toEqual(updatedRoleData.permissions);
    });

    it('should delete a user role', async () => {
        const role = new UserRole({ name: 'User', permissions: ['read'] });
        await role.save();

        await request(app)
            .delete(`/api/userRoles/${role._id}`)
            .expect(204);

        const response = await request(app)
            .get('/api/userRoles')
            .expect(200);

        expect(response.body.length).toBe(0);
>>>>>>> ff0060b1e5e6f1befd22addf8d29d3eaa5767899
    });
});