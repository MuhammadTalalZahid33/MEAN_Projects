import dotenv from "dotenv"
import connectDB from "./config/db.js" 
import { app } from "./app.js"

dotenv.config({path: './.env'})
const PORT = process.env.PORT

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("db connection established but express unable to talk", error);
        throw(error)
    })
    app.listen(PORT || 5000, () => {
        console.log(`Server is running at port http://localhost:${PORT}`);
    }) 
})
.catch((error) => {
    console.log("db connection error: ", error);
})