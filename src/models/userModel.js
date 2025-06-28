// userModel.js

const mongoose = require('mongoose');

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => {
                return /.+@.+\..+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    roles: {
        type: [String],
        enum: ['user', 'admin', 'moderator'],
        default: ['user']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
