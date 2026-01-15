import connectDB from '../config/db.js';

export const findUserByEmail = async (email) => {
  const db = connectDB();
  const [rows] = await db.execute(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

export const createUser = async ({ username, email, passwordHash, roleId }) => {
  const db = connectDB();
  const [result] = await db.execute(
    `INSERT INTO users (name, email, password_hash, role_id)
     VALUES (?, ?, ?, ?)`,
    [username, email, passwordHash, roleId]
  );

  return result.insertId;
};
