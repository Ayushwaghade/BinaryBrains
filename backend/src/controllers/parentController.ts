import { Request, Response } from 'express';
import Database from '../config/database';

export const getParentDashboardData = async (req: Request, res: Response) => {
  try {
    const db = await Database.getInstance();
    
    // Mock data matching the frontend ParentDashboard structure
    const parentData = {
      children: [
        {
          name: 'John Doe',
          grade: '10th Grade',
          subjects: [
            { name: 'Mathematics', progress: 75, attendance: 90 },
            { name: 'Science', progress: 85, attendance: 95 },
            { name: 'English', progress: 80, attendance: 88 },
            { name: 'History', progress: 70, attendance: 92 },
          ],
          recentActivities: [
            { type: 'Test', subject: 'Mathematics', score: 85, date: '2024-03-15' },
            { type: 'Assignment', subject: 'Science', score: 92, date: '2024-03-14' },
            { type: 'Quiz', subject: 'English', score: 78, date: '2024-03-13' },
          ],
          attendance: 91,
          overallGrade: 77.5,
          totalUsers: 2854
        }
      ]
    };

    res.json(parentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};