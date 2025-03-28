const Database = require("../config/database.js");

exports.getTeacherDashboardData = async (req, res) => {
  try {
    const db = await Database.getInstance();
    const teacherId = req.params.teacherId;

    // Fetch classes taught by the teacher
    const [classes] = await db.execute(
      `SELECT c.class_id, c.class_name AS name, COUNT(ss.student_id) AS totalStudents, AVG(ss.progress) AS averageProgress
       FROM classes c
       JOIN subjects s ON c.class_id = s.class_id
       JOIN student_subjects ss ON s.id = ss.subject_id
       WHERE s.teacher_id = ?
       GROUP BY c.class_id`,
      [teacherId]
    );

    // Fetch top performers for each class
    const topPerformersPromises = classes.map(async (classData) => {
      const [topPerformers] = await db.execute(
        `SELECT st.name AS student_name, ss.progress AS grade
         FROM students st
         JOIN student_subjects ss ON st.id = ss.student_id
         JOIN subjects s ON ss.subject_id = s.id
         WHERE s.class_id = ? 
         ORDER BY ss.progress DESC 
         LIMIT 3`,
        [classData.class_id]
      );

      return { ...classData, topPerformers };
    });

    const updatedClasses = await Promise.all(topPerformersPromises);

    // Fetch overall stats for the teacher
    const [stats] = await db.execute(
      `SELECT COUNT(DISTINCT s.class_id) AS totalClasses, 
              COUNT(DISTINCT ss.student_id) AS totalStudents, 
              AVG(ss.progress) AS overallAverageProgress 
       FROM subjects s
       JOIN student_subjects ss ON s.id = ss.subject_id
       WHERE s.teacher_id = ?`,
      [teacherId]
    );

    res.json({
      classes: updatedClasses,
      stats: stats[0] || {}, // Handle case where stats return empty
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
