const Database = require("../config/database.js");

const getStudentDashboardData = async (req, res) => {
  try {
    const db = await Database.getInstance();
    const studentId = req.params.studentId;

    // Fetch student subjects with progress & attendance
    const [subjects] = await db.execute(
      `SELECT s.name, ss.progress, ss.attendance 
       FROM student_subjects ss
       JOIN subjects s ON ss.subject_id = s.id
       WHERE ss.student_id = ?`,
      [studentId]
    );

    // Fetch recent activities
    const [recentActivities] = await db.execute(
      `SELECT type, subject, status, date 
       FROM activities 
       WHERE student_id = ? 
       ORDER BY date DESC 
       LIMIT 5`,
      [studentId]
    );

    // Fetch student stats
    const [stats] = await db.execute(
      `SELECT 
         COUNT(DISTINCT ss.subject_id) AS courses, 
         AVG(ss.attendance) AS attendance, 
         AVG(ss.progress) AS averageGrade, 
         CONCAT(SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END), '/', COUNT(*)) AS completedTasks 
       FROM student_subjects ss
       LEFT JOIN activities a ON ss.student_id = a.student_id
       WHERE ss.student_id = ?`,
      [studentId]
    );

    res.json({
      subjects,
      recentActivities,
      stats: stats[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getStudentDashboardData }; // ✅ Correct Export
