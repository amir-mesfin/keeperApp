import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true // This will be encrypted
    },
    notes: {
        type: String
    },
    category: {
        type: String,
        default: 'General'
    }
}, { timestamps: true });

export default mongoose.model('Record', recordSchema);
