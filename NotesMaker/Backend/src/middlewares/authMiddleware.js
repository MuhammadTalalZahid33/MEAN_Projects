import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";

// Verify JWT Token and extract user info
const protect = async (req, res, next) => {
    let token = req.headers.authorization;
     console.log("Authorization Header:", token);
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; // remove 'Bearer' prefix
    }
     console.log("Authorization Header:", token);
    if (!token) {
        return next(new ApiError("Not authorized, token missing!", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // decoded contains user info
        console.log("decoded: ", req.user);
        next();
    } catch (error) {
        return next(new ApiError("Not authorized, token is invalid", 401));
    }
};

const authorizeRoles = async(...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "you are shown only your notes data..."
            })
        }
        next();
    }
}
export { protect, authorizeRoles };
