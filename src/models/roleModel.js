// roleModel.js

const mongoose = require('mongoose');

// Define the schema for roles
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Middleware to update the updatedAt timestamp before saving
roleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Role model from the schema
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
