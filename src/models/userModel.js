const mongoose = require('mongoose');

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

// Pre-save middleware to hash the password (if using bcrypt)
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        // Hash the password here
        // this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create the user model from the schema
const User = mongoose.model('User', userSchema);

// Export the user model for use in other parts of the application
module.exports = User;
