const mongoose = require('mongoose');

/**
 * User Role Schema for MongoDB
 * This schema defines the structure of user roles within the application.
 * It includes role name and associated permissions.
 */
const userRoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    permissions: {
        type: [String],
        required: true,
        default: [],
    },
}, { timestamps: true });

/**
 * User Role Model
 * The model provides an interface to interact with the user roles collection.
 */
const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;