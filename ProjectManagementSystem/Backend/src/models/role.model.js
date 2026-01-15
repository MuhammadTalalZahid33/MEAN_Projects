import connectDB from '../config/db.js';

export const findRoleByName = async (roleName) => {
  const db = connectDB();
  const [rows] = await db.execute(
    'SELECT id FROM roles WHERE name = ?',
    [roleName]
  );
  return rows[0];
};
