// 8. src/routes/teacherRoutes.ts
import express from 'express';
import { getTeacherDashboardData } from '../controllers/teacherController';

const router = express.Router();

router.get('/dashboard', getTeacherDashboardData);

export default router;