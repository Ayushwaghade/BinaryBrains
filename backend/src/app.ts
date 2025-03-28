// 9. src/app.ts
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes';
import parentRoutes from './routes/parentRoutes';
import teacherRoutes from './routes/teacherRoutes';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/student', studentRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/teacher', teacherRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});