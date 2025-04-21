const { registerUser, loginUser } = require('../../utils/auth');
const { mockUsers } = require('../mocks/userMocks');

describe('Authentication Utility Functions', () => {
    describe('registerUser', () => {
        it('should successfully register a new user', async () => {
            const userData = mockUsers.validUser;
            const result = await registerUser(userData);
            expect(result).toHaveProperty('success', true);
            expect(result).toHaveProperty('user');
        });

        it('should fail if the user already exists', async () => {
            const userData = mockUsers.existingUser;
            const result = await registerUser(userData);
            expect(result).toHaveProperty('success', false);
            expect(result).toHaveProperty('message', 'User already exists');
        });
    });

    describe('loginUser', () => {
        it('should successfully log in a user with correct credentials', async () => {
            const userData = mockUsers.validUser;
            const result = await loginUser(userData.email, userData.password);
            expect(result).toHaveProperty('success', true);
            expect(result).toHaveProperty('token');
        });

        it('should fail to log in with incorrect credentials', async () => {
            const result = await loginUser('wrong@example.com', 'wrongpassword');
            expect(result).toHaveProperty('success', false);
            expect(result).toHaveProperty('message', 'Invalid credentials');
        });
    });
});