import express from 'express';
import {createProject,deleteProject,updateProject,getProjects} from '../controller/project.controller.js';
import { verifyJWT } from '../middlewares/auth_middleware.js';
const router = express.Router();

router.post('/create',verifyJWT,createProject);
router.get('/get/:apikey',getProjects);
router.patch('/update',verifyJWT,updateProject);
router.delete('/delete',verifyJWT,deleteProject);

export default router;