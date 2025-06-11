const userController = require('../controllers/userController');
const mockUserData = { username: 'testuser', password: 'testpass' };

describe('User Controller', () => {
    describe('registerUser', () => {
        it('should successfully register a user', async () => {
            const response = await userController.registerUser(mockUserData);
            expect(response).toHaveProperty('success', true);
            expect(response).toHaveProperty('data.username', mockUserData.username);
        });

        it('should fail to register a user with an existing username', async () => {
            await userController.registerUser(mockUserData); // First registration
            const response = await userController.registerUser(mockUserData); // Attempt second registration
            expect(response).toHaveProperty('success', false);
            expect(response).toHaveProperty('error', 'Username already exists');
        });
    });

    describe('loginUser', () => {
        it('should successfully log in a registered user', async () => {
            await userController.registerUser(mockUserData);
            const response = await userController.loginUser(mockUserData);
            expect(response).toHaveProperty('success', true);
            expect(response).toHaveProperty('data.username', mockUserData.username);
        });

        it('should fail to log in with incorrect credentials', async () => {
            const response = await userController.loginUser({ username: 'wronguser', password: 'wrongpass' });
            expect(response).toHaveProperty('success', false);
            expect(response).toHaveProperty('error', 'Invalid username or password');
        });
    });
});
