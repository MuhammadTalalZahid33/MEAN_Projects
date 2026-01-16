import connectDB from '../config/db.js';

export const createProject = async ({
    name,
    description,
    managerId,
    startDate,
    endDate,
    status
}) => {
    const db = connectDB();

    const [result] = await db.execute(
        `INSERT INTO projects
     (name, description, manager_id, start_date, end_date, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [
            name,
            description || null,
            managerId,
            startDate || null,
            endDate || null,
            status || 'active'
        ]
    );

    return result.insertId;
};

export const getAllProjects = async () => {
    const db = connectDB();

    const [rows] = await db.execute(
        `SELECT 
        p.id,
        p.name,
        p.description,
        p.status,
        p.start_date,
        p.end_date,
        p.created_at,
        u.id AS manager_id,
        u.name AS manager_name
     FROM projects p
     JOIN users u ON p.manager_id = u.id`
    );

    return rows;
};

export const getProjectById = async (id) => {
    const db = connectDB();

    const [rows] = await db.execute(
        `SELECT 
        p.*,
        u.name AS manager_name
     FROM projects p
     JOIN users u ON p.manager_id = u.id
     WHERE p.id = ?`,
        [id]
    );

    return rows[0];
};

export const updateProject = async (id, data) => {
    const db = connectDB();

    await db.execute(
        `UPDATE projects
     SET name = ?, 
        description = ?, 
        manager_id = ?, 
        start_date = ?, 
        end_date = ?, 
        status = ?
     WHERE id = ?`,
        [
            data.name,
            data.description,
            data.managerId,
            data.startDate,
            data.endDate,
            data.status,
            id
        ]
    );
};

export const deleteProject = async (id) => {
    const db = connectDB();

    await db.execute(
        `DELETE FROM projects WHERE id = ?`,
        [id]
    );
};
