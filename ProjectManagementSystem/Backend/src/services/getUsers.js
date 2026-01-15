import connectDB from "../config/db.js";

const getUsers = async () => {
    const db = connectDB();
    console.log('Fetching users from the database...');
    const result = await db.query('SELECT * FROM roles');
    console.log(result[0]);
};

export default getUsers;