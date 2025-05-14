const mongoose = require('mongoose');

/**
 * Video Schema definition for MongoDB.
 * This schema defines the structure of video entries in the database,
 * including fields for title, description, uploader, and more.
 */
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
    },
    isEncrypted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Export the Video model based on the video schema
module.exports = mongoose.model('Video', videoSchema);
