import express from "express";
import { createAlert,getAlertByUserId,getAllAlerts, updateReadStatus } from "../controllers/alertController.js";
const router = express.Router()
//routing
//REGISTER||POST
router.post('/createAlert', createAlert);
router.get('/getAllAlerts', getAllAlerts);
router.get('/alertById', getAlertByUserId);
router.patch('/readStatus', updateReadStatus);

export default router;