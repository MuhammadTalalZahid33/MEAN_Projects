import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxLength: 30,
    },
    content:{
        type: String,
        required: true,
    },
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema);
export default Note;