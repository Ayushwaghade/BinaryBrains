import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { BookOpen, Clock, CheckCircle, XCircle, BarChart } from "lucide-react";

// Define TypeScript interfaces for Subjects and Activities
interface Subject {
  name: string;
  progress: number;
  attendance: number;
}

interface Activity {
  subject: string;
  type: string;
  date: string;
  status: "completed" | "pending";
}

const StudentDashboard: React.FC = () => {
  // const { user } = useUser();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/dashboard/${1}`
        );
        setSubjects(response.data.subjects);
        setRecentActivities(response.data.recentActivities);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    if (true) {
      fetchDashboardData();
    }
  }, [1]);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome, {'ayush1234@gmail.com'}</div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Courses</h2>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Attendance</h2>
                <p className="text-2xl font-bold">
                  {subjects.length
                    ? (
                        subjects.reduce((acc, subj) => acc + subj.attendance, 0) /
                        subjects.length
                      ).toFixed(1)
                    : "0"}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Average Grade</h2>
                <p className="text-2xl font-bold">
                  {subjects.length
                    ? (
                        subjects.reduce((acc, subj) => acc + subj.progress, 0) /
                        subjects.length
                      ).toFixed(1)
                    : "0"}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Completed</h2>
                <p className="text-2xl font-bold">24/30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Subject Progress</h2>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {subject.name}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {subject.progress}%
                      </span>
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

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      {activity.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.subject} - {activity.type}
                        </p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        activity.status === "completed"
                          ? "bg-primary/10 text-primary"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
