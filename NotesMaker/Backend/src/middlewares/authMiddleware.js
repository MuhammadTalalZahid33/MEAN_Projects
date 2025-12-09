import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";

// Verify JWT Token and extract user info
const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; // remove 'Bearer' prefix
    }

    if (!token) {
        return next(new ApiError("Not authorized, token missing!", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // decoded contains user info
        next();
    } catch (error) {
        return next(new ApiError("Not authorized, token is invalid", 401));
    }
};

export { protect };
