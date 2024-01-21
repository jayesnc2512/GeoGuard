import express from 'express';
import {
    getAllCameras,
    insertCamera,
    getCamByUserId,
    updateAddress,
    deleteCamByLicenseId
} from '../controllers/camController.js';

const router = express.Router()

router.post('/insertCam', insertCamera);
router.get('/getAllCamera', getAllCameras);
router.get('/getCamByUserId', getCamByUserId);
router.patch('/updateAddress', updateAddress);
router.delete('/deleteCam', deleteCamByLicenseId)

export default router;