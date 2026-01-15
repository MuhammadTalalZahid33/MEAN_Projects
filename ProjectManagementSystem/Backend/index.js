import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

import connectDB from "./src/config/db.js";
import { app } from "./src/app.js";

(async () => {
    try {
        const db = connectDB();
        await db.query('SELECT * from employees LIMIT 1');
        console.log('✅ Database connected: ', process.env.DB_NAME);

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
})();