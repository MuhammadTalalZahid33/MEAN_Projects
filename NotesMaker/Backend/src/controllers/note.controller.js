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
// Get Note by Id
const getById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    return res.json({
        success: true,
        message: "note found successfully",
        note,
    })
})
// Update Note By Id
const updateNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    // console.log(" title and content are :", title, content)
    if (!title || !content) {
        res.status(400).json({
            message: "You need to provide both title and content..."
        })
    }
    const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
    return res.json({
        success: true,
        note,
    })
})
// DELETE NOTE
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id)
    return res.json({
        success: true,
        note,
        message: "note deleted successfully..."
    })
})

export { addNote, displayAllNotes, getById, updateNote, deleteNote }