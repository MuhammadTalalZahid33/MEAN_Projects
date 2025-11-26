import Note from "../models/note.model.js";
import asyncHandler from "../utils/asyncHandler.js"


// CREATE A NOTE
const addNote = asyncHandler(async (req, res) => {
    // Get the data coming into the api request body 
    const { title, content } = req.body;
    // Check if data exists in req body or not
    if (!title || !content) {
        return res.status(400).json({
            message: "You need to provide both title and content...",
        })
    }
    // Create a new Note document(object) 
    const note = await Note.create({
        title,
        content
    });
    console.log(req.body);
    res.status(201).json({
        success: true,
        message: "note created successfully...",
        note,
    })
})

// DISPLAY ALL NOTES
const displayAllNotes = asyncHandler(async (req, res) => {
    const allNotes = await Note.find();
    res.json({
        success: true,
        message: "returning all notes...",
        allNotes,
    })
})

// DELETE NOTE
const deleteNote = asyncHandler(async (req, res) => {
    res.status(201).json({
        success: true,
        message: "note deleted successfully..."
    })
})

export { addNote, displayAllNotes, deleteNote }