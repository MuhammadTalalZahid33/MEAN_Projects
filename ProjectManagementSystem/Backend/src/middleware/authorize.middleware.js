import { ApiError } from '../utils/ApiError.js';

const authorize = (...allowedRoles) => {
    return (req, _res, next) => {
        if (!req.user) {
            throw new ApiError(401, 'Unauthorized');
        }

        if (!allowedRoles.includes(req.user.role.toLowerCase())) {
            throw new ApiError(403, 'Forbidden: Access denied');
        }

        next();
    };
};

export default authorize;
