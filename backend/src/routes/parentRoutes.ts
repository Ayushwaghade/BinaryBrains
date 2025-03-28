// 7. src/routes/parentRoutes.ts
import express from 'express';
import { getParentDashboardData } from '../controllers/parentController';

const router = express.Router();

router.get('/dashboard', getParentDashboardData);

export default router;
