import { Request, Response } from 'express';
import Database from '../config/database';

export const getStudentDashboardData = async (req: Request, res: Response) => {
  try {
    const db = await Database.getInstance();
    
    // Mock data matching the frontend StudentDashboard structure
    const studentData = {
      subjects: [
        { name: 'Mathematics', progress: 75, attendance: 90 },
        { name: 'Science', progress: 85, attendance: 95 },
        { name: 'English', progress: 80, attendance: 88 },
        { name: 'History', progress: 70, attendance: 92 },
      ],
      recentActivities: [
        { type: 'assignment', subject: 'Mathematics', status: 'completed', date: '2024-03-15' },
        { type: 'test', subject: 'Science', status: 'pending', date: '2024-03-18' },
        { type: 'quiz', subject: 'English', status: 'completed', date: '2024-03-14' },
      ],
      stats: {
        courses: 4,
        attendance: 91,
        averageGrade: 77.5,
        completedTasks: '24/30'
      }
    };

    res.json(studentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};