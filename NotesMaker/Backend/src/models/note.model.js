import mongoose, { mongo } from "mongoose";

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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true        
    }
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema);
export default Note;