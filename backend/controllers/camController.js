import cameraModel from "../models/cameraModel.js";
import { generateLicenseId } from "../helper/uniqueIdHelper.js";


const insertCamera = async (req, res) => {
    try {
        const  token  = req.headers.token;
        if (token) {
            const { userId,model, nickName, brand, ip, emContactName, emPhone, megapixels, resolution, fps, fov, lat, lon, pic1, pic2,index } = req.body;
            // if ( !userId || !model || !brand || !ip
            //     || !fov || !lat || !lon) {
            //     return res.send({ error: 'this field is required' });
            // }
            //check if existing ip (uniqueness of camera)
            // const encodedIp = await encodeString(ip)
            const camIp = await cameraModel.findOne({ ip: ip });
            if (camIp) {
                return res.status(409).json({ message: 'IP already exists.' })
            }

            let licenseId = generateLicenseId();
            // check uniqueness of generated licenseId
            const existingLicenseId = await cameraModel.findOne({ licenseId: licenseId });
            while (existingLicenseId) {
                licenseId = generateLicenseId();
            }
            const camera = await new cameraModel({
                userId: userId,
                licenseId: licenseId,
                ip: ip,
                model: model,
                brand: brand,
                nickName: nickName,
                camIndex:index,
                emergency: {
                    emergency_contact_name: emContactName,
                    emergency_phone: emPhone,
                },
                migapixels: megapixels,
                resolution: resolution,
                fps: fps,
                fov: fov,
                location: {
                    lat: lat,
                    lon: lon
                },
                pictures: {
                    pic1: pic1,
                    pic2: pic2
                }
            }).save();
            res.status(200).send({
                success: true,
                message: 'Camera Inserted in Database',
                camera
            })
        } else {
            res.status(403).send({
                succes: false,
                message: "You are not authorized to perform this action."
            })
        }
    } catch (err) {
        console.log('error inserting camera \n',err);
        throw err;
    }
}

const getAllCameras = async (req, res) => {
    const  {token}  = req.headers;
    try {
        if (token) {
            const allCamera = await cameraModel.find({});
            res.status(200).send({
                success: true,
                allCamera
            })
        } else {
            res.status(403).send({
                success: false,
                message:"User not authorized,Does Not of Token"
            })
        }
    } catch (err) {
        console.log(err);
        throw (err);
    }
}



const getCamByUserId = async (req, res) => {
    try {
        const { token,userid } = req.headers;
        
        if (token) {
            const camByUser = await cameraModel.find({ userId: userid });
            res.status(200).send({
                success: true,
                camByUser,
            });
        } else {
            res.status(403).send({
                success: false,
                message:"User not authorized, Does not have tokenId"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
           message:"internal Server Error"
       })
    }
}

const deleteCamByLicenseId = async (req, res) => {
    try {
        const { token, licenseid } = req.headers;

        if (token) {
            // Use findOneAndDelete to find and delete the camera based on licenseId
            console.log(licenseid);
            const deletedCam = await cameraModel.findOneAndDelete({ licenseId:licenseid });
            if (deletedCam) {
                res.status(200).send({
                    success: true,
                    message: 'Camera deleted successfully',
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Camera not found with the provided licenseId',
                });
            }
        } else {
            res.status(403).send({
                success: false,
                message: 'User not authorized, Does not have tokenId',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal Server Error',
        });
    }
};

const updateAddress = async (req, res) => {
    const { token } = req.headers;
    const { licenseId, newAddress } = req.body;
    try {
        if (token) {
            const updateAddr = await cameraModel.updateOne({ licenseId: licenseId }, {
                $set: {
                    location: {
                        lat: newAddress.lat,
                        lon: newAddress.lon
                    }
                }
            });
            if (updateAddr) {
                res.status(200).send({
                    success: true,
                    updateAddr,
                    message: "Address updates successfully"
                })
            } else {
                res.status(500).send({
                    success: false,
                    message: "could not update"
                });
            }
        } else {
            res.status(403).send({
                success: false,
                message: "User Unauthorized, Does not have TokenId"
            })
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}


export { insertCamera, getAllCameras, getCamByUserId, updateAddress, deleteCamByLicenseId };