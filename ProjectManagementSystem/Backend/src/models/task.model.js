import connectDB from '../config/db.js';

export const createTask = async (data) => {
  const db = connectDB();
  const [result] = await db.execute(
    `INSERT INTO tasks (title, description, status, project_id, assigned_to)
     VALUES (?, ?, ?, ?, ?)`,
    Object.values(data)
  );
  return result.insertId;
};

export const getTasksByProject = async (projectId) => {
  const db = connectDB();
  const [rows] = await db.execute(
    `SELECT * FROM tasks WHERE project_id=?`,
    [projectId]
  );
  return rows;
};

export const updateTask = async (id, data) => {
  const db = connectDB();
  await db.execute(
    `UPDATE tasks SET title=?, description=?, status=? WHERE id=?`,
    [...Object.values(data), id]
  );
};

export const deleteTask = async (id) => {
  const db = connectDB();
  await db.execute(`DELETE FROM tasks WHERE id=?`, [id]);
};
