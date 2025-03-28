const Database = require("../config/database.js");
const getStudentDashboardData = async (req, res) => {
  try {
    const db = await Database.getInstance();
    const studentId = req.params.studentId;

    // ✅ Fetch student subjects with progress & attendance
    const [subjects] = await db.execute(
      `SELECT s.name, ss.progress, ss.attendance 
       FROM student_subjects ss
       JOIN subjects s ON ss.subject_id = s.id
       WHERE ss.student_id = ?`,
      [studentId]
    );

    // ✅ Fetch student stats (without `activities`)
    const [stats] = await db.execute(
      `SELECT 
         COUNT(DISTINCT ss.subject_id) AS courses, 
         AVG(ss.attendance) AS attendance, 
         AVG(ss.progress) AS averageGrade
       FROM student_subjects ss
       WHERE ss.student_id = ?`,
      [studentId]
    );

    res.json({
      subjects,
      stats: stats[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getStudentDashboardData };
