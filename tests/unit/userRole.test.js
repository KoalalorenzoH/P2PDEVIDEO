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
    });
});