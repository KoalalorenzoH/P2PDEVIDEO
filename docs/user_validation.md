# User Validation Documentation

## Overview
User validation is a crucial aspect of the P2PDEVIDEO application to ensure that all user data is correct and secure. This document outlines the features and functionalities associated with user validation within the application.

## Features
1. **User Registration Validation**  
   - Ensures that all required fields are filled out correctly during user registration.
   - Validates email format and checks for existing users in the database to prevent duplicates.

2. **User Profile Update Validation**  
   - Validates data when users attempt to update their profiles to ensure that the changes meet the required format and constraints.

3. **Role-Based Access Control**  
   - Validates user roles to ensure that users have the necessary permissions to access certain features or data in the application.

## Implementation Details
- User validation is handled through middleware that intercepts requests before they reach the controller. 
- The validation logic is implemented in the `src/middleware/userValidation.js` file.

### Middleware Functions
- **registerValidation**: Validates the user registration data.
- **profileUpdateValidation**: Validates data submitted during user profile updates.
- **roleValidation**: Ensures users possess the necessary roles for performing certain operations.

## Example Usage
### User Registration Validation Example:
```javascript
const { check, validationResult } = require('express-validator');

const registerValidation = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

app.post('/register', registerValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with user registration logic
});
```

### User Profile Update Validation Example:
```javascript
const profileUpdateValidation = [
    check('email').optional().isEmail().withMessage('Email must be valid'),
    check('bio').optional().isLength({ max: 250 }).withMessage('Bio must not exceed 250 characters')
];

app.put('/user/profile', profileUpdateValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with updating user profile logic
});
```

## Conclusion
User validation plays a vital role in maintaining the integrity of the user data in the P2PDEVIDEO application. Proper validation ensures that only correctly formatted and appropriate data can be processed, enhancing the overall security and user experience.

---