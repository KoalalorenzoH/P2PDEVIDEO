const mongoose = require('mongoose');
const UserModel = require('../models/userModel');

describe('UserModel', () => {
    beforeAll(async () => {
        // Connect to the in-memory database
        await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Clear the database and close the connection
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a user with valid details', async () => {
        const user = new UserModel({
            username: 'testuser',
            email: 'test@example.com',
            password: 'Password123',
        });
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe('testuser');
        expect(savedUser.email).toBe('test@example.com');
    });

    it('should not create a user without a username', async () => {
        const user = new UserModel({
            email: 'test@example.com',
            password: 'Password123',
        });
        let error;
        try {
            await user.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect(error.errors.username).toBeDefined();
    });

    it('should not create a user with an invalid email', async () => {
        const user = new UserModel({
            username: 'testuser',
            email: 'invalid-email',
            password: 'Password123',
        });
        let error;
        try {
            await user.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect(error.errors.email).toBeDefined();
    });

    it('should not create a user with a weak password', async () => {
        const user = new UserModel({
            username: 'testuser',
            email: 'test@example.com',
            password: '123',
        });
        let error;
        try {
            await user.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect(error.errors.password).toBeDefined();
    });
});