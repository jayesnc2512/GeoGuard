import mongoose from "mongoose";
import { stringify } from "uuid";

const cameraSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    licenseId: {
        type: String,
        required: false
    },
    camIndex: {
        type: Number,
        required: false  
    },
    ip: {
        type: String,
        required: false,
    },
    model: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    nickName: {
        type: String,
        required: false
    },
    emergency: {
        emergency_contact_name: {
            type: String,
            required: false,
        },
        emergency_phone: {
            type: String,
            required: false,
        },
    },
    migapixels: {
        type: String,
        required: false
    },
    resolution: {
        type: String,
        required: false
    },
    fps: {
        type: String,
        required: false
    },
    fov: {
        type: String,
        required: false
    },
    location: {
        lat: {
            type: String,
            required: false
        },
        lon: {
            type: String,
            required:false
        }
    },
    pictures: {
        pic1: {
            type: String,
            required: false
        },
        pic2:{
            type: String,
            required:false
        }
    }
}, { timestamps: true });

export default mongoose.model('cameras', cameraSchema);

// basicDetails={ model_name // Nickname // brand //ip // emergency{contactName |  phone)
                //  role // aadhar no. // }
//specifications={megapixels // resolution//fps/fov}
//location={lat,lon}
//auth={LicenseId, EmailId}