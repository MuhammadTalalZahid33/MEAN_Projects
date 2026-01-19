import connectDB from '../config/db.js';

export const createTask = async ({
  projectId,
  assignedTo,
  title,
  description,
  priority,
  status,
  dueDate
}) => {
  const db = connectDB();

  const [result] = await db.execute(
    `INSERT INTO tasks
     (project_id, assigned_to, title, description, priority, status, due_date)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      projectId,
      assignedTo,
      title,
      description || null,
      priority || 'medium',
      status || 'todo',
      dueDate || null
    ]
  );

  return result.insertId;
};

export const getTasksByProject = async (projectId) => {
  const db = connectDB();

  const [rows] = await db.execute(
    `SELECT 
        t.*,
        u.name AS assigned_to_name
     FROM tasks t
     JOIN users u ON t.assigned_to = u.id
     WHERE t.project_id = ?`,
    [projectId]
  );

  return rows;
};

export const getTaskById = async (id) => {
  const db = connectDB();

  const [rows] = await db.execute(
    `SELECT * FROM tasks WHERE id = ?`,
    [id]
  );

  return rows[0];
};

export const updateTask = async (id, data) => {
  const db = connectDB();

  await db.execute(
    `UPDATE tasks
     SET title = ?, description = ?, priority = ?, status = ?, 
         assigned_to = ?, due_date = ?
     WHERE id = ?`,
    [
      data.title,
      data.description,
      data.priority,
      data.status,
      data.assignedTo,
      data.dueDate,
      id
    ]
  );
};

export const deleteTask = async (id) => {
  const db = connectDB();

  await db.execute(
    `DELETE FROM tasks WHERE id = ?`,
    [id]
  );
};
