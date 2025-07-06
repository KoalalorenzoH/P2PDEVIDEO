const request = require('supertest');
const app = require('../../src/app'); // Ensure the app is properly exported
const mongoose = require('mongoose');
const UserRole = require('../../src/models/userRole'); // Import the user role model

// Combined unit tests for User Role Model and API endpoints
describe('User Role Management', () => {
    let userRole;

    beforeAll(async () => {
        // Connect to test database
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }
    });

    afterAll(async () => {
        // Close the database connection
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
    });

    beforeEach(async () => {
        // Clear the database before each test
        await UserRole.deleteMany({});

        // Set up a fresh user role for model tests
        userRole = new UserRole({
            name: 'admin',
            permissions: ['create', 'read', 'update', 'delete']
        });
    });

    // Model validation tests
    describe('User Role Model Validation', () => {
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
            expect(userRole.permissions).toContain('write');
        });

        test('should save a valid user role to database', async () => {
            if (mongoose.connection.readyState === 1) {
                const savedRole = await userRole.save();
                expect(savedRole._id).toBeDefined();
                expect(savedRole.name).toBe('admin');
            }
        });
    });

    // API endpoint tests
    describe('User Role API Endpoints', () => {
        test('should create a new user role', async () => {
            const roleData = { name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] };
            const response = await request(app)
                .post('/api/roles')
                .send(roleData)
                .expect(201);

            expect(response.body).toHaveProperty('_id');
            expect(response.body.name).toBe(roleData.name);
        });

        test('should get all user roles', async () => {
            const roleData1 = { name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] };
            const roleData2 = { name: 'User', permissions: ['read'] };
            await UserRole.create(roleData1);
            await UserRole.create(roleData2);

            const response = await request(app)
                .get('/api/roles')
                .expect(200);

            expect(response.body.length).toBe(2);
            expect(response.body[0].name).toBe(roleData1.name);
            expect(response.body[1].name).toBe(roleData2.name);
        });

        test('should get a specific user role by ID', async () => {
            const role = new UserRole({ name: 'TestRole', permissions: ['read'] });
            await role.save();

            const response = await request(app)
                .get(`/api/roles/${role._id}`)
                .expect(200);

            expect(response.body.name).toBe('TestRole');
            expect(response.body.permissions).toEqual(['read']);
        });

        test('should update a user role', async () => {
            const role = new UserRole({ name: 'User', permissions: ['read'] });
            await role.save();

            const updatedRoleData = { name: 'User', permissions: ['read', 'update'] };
            const response = await request(app)
                .put(`/api/roles/${role._id}`)
                .send(updatedRoleData)
                .expect(200);

            expect(response.body.permissions).toEqual(updatedRoleData.permissions);
        });

        test('should delete a user role', async () => {
            const role = new UserRole({ name: 'User', permissions: ['read'] });
            await role.save();

            await request(app)
                .delete(`/api/roles/${role._id}`)
                .expect(204);

            const response = await request(app)
                .get('/api/roles')
                .expect(200);

            expect(response.body.length).toBe(0);
        });

        test('should return 404 for non-existing role', async () => {
            const response = await request(app)
                .get('/api/roles/123456789012345678901234')
                .expect(404);

            expect(response.body).toHaveProperty('error');
        });

        test('should return 400 for invalid role data', async () => {
            const invalidRoleData = { name: '', permissions: 'not-an-array' };
            const response = await request(app)
                .post('/api/roles')
                .send(invalidRoleData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });
});