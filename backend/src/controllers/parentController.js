const Database = require("../config/database.js");

exports.getParentDashboardData = async (req, res) => {
  try {
    const db = await Database.getInstance();
    const parentId = req.params.parentId;

    // Fetch children (students) of the parent
    const [children] = await db.execute(
      `SELECT id, name 
       FROM students 
       WHERE parent_id = ?`,
      [parentId]
    );

    const childrenData = await Promise.all(
      children.map(async (child) => {
        // Fetch subjects with progress and attendance
        const [subjects] = await db.execute(
          `SELECT sub.name, ss.progress, ss.attendance
           FROM student_subjects ss
           JOIN subjects sub ON ss.subject_id = sub.id
           WHERE ss.student_id = ?`,
          [child.id]
        );

        // Fetch recent activities
        const [recentActivities] = await db.execute(
          `SELECT a.type, sub.name AS subject, a.score, a.date 
           FROM activities a
           JOIN subjects sub ON a.subject_id = sub.id
           WHERE a.student_id = ? 
           ORDER BY a.date DESC 
           LIMIT 5`,
          [child.id]
        );

        return {
          name: child.name,
          subjects,
          recentActivities,
        };
      })
    );

    res.json({ children: childrenData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
