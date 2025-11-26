import { Router } from "express";
import { addNote, displayAllNotes } from "../controllers/note.controller.js";

const router = Router();
router.route("/add").post(addNote);
router.route("/allNotes").get(displayAllNotes);
export default router;