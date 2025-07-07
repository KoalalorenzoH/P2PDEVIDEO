// userRole.js

const mongoose = require('mongoose');

// Define the User Role schema for MongoDB
const userRoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    permissions: {
        type: [String], // Array of permissions associated with the role
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Create a model from the schema
const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole; // Export the model for use in other parts of the application