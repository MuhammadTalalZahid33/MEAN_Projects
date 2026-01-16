import AsyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { loginUser, registerUser } from "../services/user.service.js";

const register = AsyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        throw new ApiError(400, 'All fields are required');
    }

    const user = await registerUser({ username, email, password, role });
    res.status(201)
        .json(
            new ApiResponse(201, user, 'User registered successfully')
        );
})

const login = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, 'Both email and password are required');
    }

    const userData = await loginUser({ email, password });

    res.status(200)
    .json(
        new ApiResponse(200, userData, 'User logged in successfully')
    );
});

export { register, login };