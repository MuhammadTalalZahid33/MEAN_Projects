import { Router } from "express";
import { addNote } from "../controllers/note.controller.js";

const router = Router();
router.route("/add").post(addNote);
export default router;