import express from 'express';
import {
    registerController,
    loginController,
    testController
} from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router()
//routing
//REGISTER||POST
router.post('/signup', registerController);

// LOGIN/POST
router.post('/login', loginController);
router.get('/test',requireSignIn, testController);

export default router;