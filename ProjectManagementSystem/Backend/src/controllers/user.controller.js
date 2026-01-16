import AsyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { registerUser } from "../services/user.service.js";

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

export { register };