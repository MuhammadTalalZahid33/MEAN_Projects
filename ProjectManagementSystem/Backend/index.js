import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

import connectDB from "./src/config/db.js";
import { app } from "./src/app.js";
import { ApiError } from "./src/utils/ApiError.js";

(async () => {
    try {
        const db = connectDB();
        await db.query('SELECT * from roles');
        console.log('✅ Database connected: ', process.env.DB_NAME);

        app.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;

            res.status(statusCode).json(
                new ApiError(statusCode, err.message || 'Internal Server Error'),
            );
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
})();