import { Router } from "express";
import { addNote, deleteNote, displayAllNotes, getById, updateNote } from "../controllers/note.controller.js";

const router = Router();
// Create Note
router.route("/add").post(addNote);
// Display All Notes
router.route("/allNotes").get(displayAllNotes);
// Get Note By Id
router.route('/getById/:id').get(getById);
// Update Note
router.route('/update/:id').put(updateNote);
// Delete a Note
router.route('/delete/:id').delete(deleteNote);
    
export default router;