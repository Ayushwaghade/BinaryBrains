// 6. src/routes/studentRoutes.ts
import express from 'express';
import { getStudentDashboardData } from '../controllers/studentController';

const router = express.Router();

router.get('/dashboard', getStudentDashboardData);

export default router;