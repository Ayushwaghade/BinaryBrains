import React from 'react';
import { useUser } from '../context/UserContext';
import { BookOpen, Clock, CheckCircle, AlertCircle, BarChart } from 'lucide-react';

const ParentDashboard = () => {
  const { user } = useUser();

  const children = [
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
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome, {user?.email}</div>
        </div>

        {children.map((child) => (
          <div key={child.name} className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {child.name}
              </h2>
              <p className="text-gray-600">{child.grade}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Subjects</h3>
                      <p className="text-2xl font-bold">{child.subjects.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Attendance</h3>
                      <p className="text-2xl font-bold">{child.attendance}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <BarChart className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Overall Grade</h3>
                      <p className="text-2xl font-bold">{child.overallGrade}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Alerts</h3>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Subject Progress</h3>
                  <div className="space-y-4">
                    {child.subjects.map((subject) => (
                      <div key={subject.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {subject.name}
                          </span>
                          <div className="text-sm font-medium text-gray-700">
                            <span className="mr-4">Progress: {subject.progress}%</span>
                            <span>Attendance: {subject.attendance}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {child.recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.subject} - {activity.type}
                            </p>
                            <p className="text-sm text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          Score: {activity.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentDashboard;