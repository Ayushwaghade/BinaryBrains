// 5. src/controllers/teacherController.ts
import { Request, Response } from 'express';
import Database from '../config/database';

export const getTeacherDashboardData = async (req: Request, res: Response) => {
  try {
    const db = await Database.getInstance();
    
    // Mock data for teacher dashboard
    const teacherData = {
      classes: [
        {
          name: '10th Grade Mathematics',
          totalStudents: 30,
          averageGrade: 75.5,
          topPerformers: [
            { name: 'John Doe', grade: 92 },
            { name: 'Jane Smith', grade: 88 },
            { name: 'Mike Johnson', grade: 85 }
          ]
        },
        {
          name: '10th Grade Science',
          totalStudents: 28,
          averageGrade: 80.2,
          topPerformers: [
            { name: 'Emily Brown', grade: 95 },
            { name: 'David Wilson', grade: 90 },
            { name: 'Sarah Lee', grade: 87 }
          ]
        }
      ],
      stats: {
        totalClasses: 2,
        totalStudents: 58,
        overallAverageGrade: 77.8
      }
    };

    res.json(teacherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};