import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    agentARN: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    userName: {
        type: String,
        required: true,
        unique: true
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

    permissions: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);
export default User;