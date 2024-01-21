import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    msgId: {
        type: String,
        required: true,
    },
    toOwnerId: {
        type: String,
        required: true
    },
    camLid: {
        type: String,
        required:true
    },
    message: {
        type: String,
        required: false
    },
    read: {
        type: Boolean,
        default:false
    }
}, { timestamps: true });

export default mongoose.model('alerts', alertSchema);
