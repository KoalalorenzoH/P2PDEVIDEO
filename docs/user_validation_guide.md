# User Validation Guide

This document provides an overview of the user validation processes implemented in the P2PDEVIDEO application. It is essential for ensuring that user data is accurate, secure, and adheres to the application’s policies.

## Overview
User validation is a critical step in the registration and profile management process. It ensures that user inputs meet the required criteria before they are processed further. This guide will cover the following aspects of user validation:

1. **Validation Rules**  
   Detailed description of the rules applied during user validation.
2. **Validation Middleware**  
   Explanation of how middleware is used to validate user data during requests.
3. **Error Handling**  
   Strategies for handling validation errors and providing feedback to users.
4. **Testing User Validation**  
   Overview of the tests implemented to ensure validation works as expected.

## 1. Validation Rules
The following rules are applied during user validation:
- **Username**: Must be between 3 and 20 characters, alphanumeric, and unique.
- **Email**: Must follow a valid email format and be unique.
- **Password**: Must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one digit, and one special character.
- **Profile Information**: Fields such as age, location, and bio should meet specific criteria defined in the schema.

## 2. Validation Middleware
The validation middleware is implemented within the `src/middleware/userValidation.js` file. This middleware intercepts requests to the user registration and profile update routes, performing validation checks before proceeding to the controller logic.

### Example Middleware Implementation
```javascript
const { check, validationResult } = require('express-validator');

const validateUser = [
    check('username')
        .isLength({ min: 3, max: 20 })
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage('Username must be alphanumeric and between 3 and 20 characters.'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address.'),
    check('password')
        .isLength({ min: 8 })
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'),
];

const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUser, handleValidationResult };
```

## 3. Error Handling
When validation fails, the middleware sends a response containing the error messages. It is crucial for the front end to handle these responses and present user-friendly messages. 

### Example Error Response
```json
{
    "errors": [
        {
            "msg": "Must be a valid email address.",
            "param": "email",
            "location": "body"
        }
    ]
}
```

## 4. Testing User Validation
Unit tests for user validation are implemented in the `tests/unit/userValidation.test.js` file. These tests cover various scenarios, ensuring that validation rules are correctly enforced.

### Example Test Case
```javascript
const request = require('supertest');
const app = require('../../src/app');

describe('User Validation', () => {
    it('should return error for invalid email', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testUser', email: 'invalidEmail', password: 'Test@123' });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe('Must be a valid email address.');
    });
});
```

## Conclusion
This guide outlines the user validation processes in the P2PDEVIDEO application. Proper validation is essential for maintaining the integrity and security of user data. For further details, refer to the codebase and associated tests for implementation specifics.
