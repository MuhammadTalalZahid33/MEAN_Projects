import mysql from 'mysql2';
let pool = null;

const connectDB = () => {
    try {
        if (!pool) {

            console.log(
                process.env.DB_HOST,
                process.env.DB_USER,
                process.env.DB_PASSWORD,
                process.env.DB_NAME,
                process.env.DB_PORT
            )
            
            const pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT
            }).promise();

            return pool;
        }
        return pool;
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }

};

export default connectDB;