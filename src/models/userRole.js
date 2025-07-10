const mongoose = require('mongoose');

/**
 * User Role Model
 * This model defines the schema for user roles in the application.
 * Each role can have specific permissions and attributes associated with it.
 */
const userRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    permissions: {
        type: [String], // Array of permissions associated with the role
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

/**
 * Export the UserRole model based on the userRoleSchema.
 */
module.exports = mongoose.model('UserRole', userRoleSchema);