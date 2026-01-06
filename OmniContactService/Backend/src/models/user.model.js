import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    agentId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    userName: {
        type: String,
        required: true
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    routingProfile: {
        type: String
    },

    queues: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);
export default User;