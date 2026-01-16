import connectDB from '../config/db.js';


// FOR REGISTER
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

// FOR LOGIN
export const findUserByEmailWithPassword = async (email) => {
    const db = connectDB();
    const [rows] = await db.execute(
        `SELECT u.id, u.name, u.email, u.password_hash, r.name AS role
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.email = ?`,
        [email]
    );
    return rows[0];
};

// GET USER DATA

export const findUserById = async (id) => {
    const db = connectDB();
    const [rows] = await db.execute(
        `SELECT u.id, u.name, u.email, r.name AS role
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.id = ?`,
        [id]
    );
    return rows[0];
};

export const findAllUsers = async () => {
    const db = connectDB();
    const [rows] = await db.execute(
        `SELECT u.id, u.name, u.email, r.name AS role
     FROM users u
     JOIN roles r ON u.role_id = r.id`
    );
    return rows;
};