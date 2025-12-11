import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import User from "../models/user.model.js"

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, userName, password, role } = req.body;
    console.log("register credentials:", firstName, lastName, userName, password, role)
    if (!firstName || !userName || !password || !role) {
        return res.status(400).json({
            message: "provide the needed credentials..."
        })
    }

    const existedUser = await User.findOne({
        $or: [{ userName }]
    })
    if (existedUser) {
        return res.status(400).json({
            message: "user already exists... use a different User Name"
        })
    } else {
        const user = await User.create({
            firstName,
            lastName,
            userName,
            password,
            role
        });
        return res.status(200).json(
            new ApiResponse(200, user, "ok user successfully created...")
        )
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    // check if username exist
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "invalid credentials, username doesn't exist!!!",
        })
    }
    // check if password matches...
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "invalid credentials, password incorrect",
        })
    }

    const accessToken = await user.generateAccessToken();
    const data = {
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            role: user.role,
        },
        token: accessToken
    }

    return res.status(200).json(
        new ApiResponse(201, data, "user successfully logged-In...")
    )
})

const getAllUsers = asyncHandler(async (req, res)=> {
    const users = await User.find({role: {$ne: 'admin'}});
    res.status(200).json(
        new ApiResponse(201, users, "successfully retreived users...")
    )
})

const logoutUser = asyncHandler( async (req, res) => {
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, {refreshToken: null});
    return res.status(200).json(
        new ApiResponse(200, user, "user logged out successfully")
    )
})

export { registerUser, loginUser, getAllUsers, logoutUser }