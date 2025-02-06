import {registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetails} from '../controller/user.controller.js';
import express from 'express';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/refresh-token',refreshAccessToken);
router.post('/change-password',changeCurrentPassword);
router.get('/current-user',getCurrentUser);

export default router;