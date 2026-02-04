import connectDB from "../config/db.js";

export const addMember = async (projectId, userId) => {
  const db = connectDB();
  await db.execute(
    `INSERT INTO teams (project_id, user_id)
     VALUES (?, ?)`,
    [projectId, userId]
  );
};

export const removeMember = async (projectId, userId) => {
  const db = connectDB();
  await db.execute(
    `DELETE FROM teams
     WHERE project_id = ? AND user_id = ?`,
    [projectId, userId]
  );
};

export const isUserInProject = async (projectId, userId) => {
  const db = connectDB();
  const [rows] = await db.execute(
    `SELECT id FROM teams
     WHERE project_id = ? AND user_id = ?`,
    [projectId, userId]
  );
  return rows.length > 0;
};

export const getTeamByProject = async (projectId) => {
  const db = connectDB();
  const [rows] = await db.execute(
    `
    SELECT u.id, u.name, u.email, r.name AS role
    FROM teams t
    JOIN users u ON t.user_id = u.id
    JOIN roles r ON u.role_id = r.id
    WHERE t.project_id = ?
    `,
    [projectId]
  );
  return rows;
};
