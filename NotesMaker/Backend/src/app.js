import express from "express"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))


// routes import
import noteRouter from "./routes/note.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/Note", noteRouter)
app.use("/api/v1/user", userRouter)

export { app }