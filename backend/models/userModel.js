import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    emergency: {
        contactName: {
            type: String,
            required:false
        },
        phone: {
            type: String,
            required:false
        }  
    },
    aadharId: {
        type: String,
        required:false
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    isSupAdmin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export default mongoose.model('users', userSchema);