import bcrypt from 'bcrypt';
import { ApiError } from '../utils/ApiError.js';
import * as userModel from '../models/user.model.js';
import * as roleModel from '../models/role.model.js';
import jwt from 'jsonwebtoken';

export const registerUser = async ({ username, email, password, role }) => {
    // 1. Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
        throw new ApiError(409, 'User already exists with this email');
    }

    // 2. Find role Id
    const roleRecord = await roleModel.findRoleByName(role);
    if (!roleRecord) {
        throw new ApiError(400, 'Invalid role provided');
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Create user
    const userId = await userModel.createUser({
        username,
        email,
        passwordHash,
        roleId: roleRecord.id
    });

    return {
        id: userId,
        username,
        email,
        role
    };
};

export const loginUser = async ({ email, password }) => {
    // Check if user exists
    const user = await userModel.findUserByEmailWithPassword(email);
    if (!user) {
        throw new ApiError(404, 'User not found with this email');
    }
    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password');
    }
    // Generate token and return in response
    const accessToken = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.expiresIn || '1d'
        }
    );

    return {
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        token: accessToken
    };
}

export const getAllUsers = async () => {
    return await userModel.findAllUsers();
};

export const getUserById = async (id) => {
    const user = await userModel.findUserById(id);
    if (!user) throw new ApiError(404, 'User not found');
    return user;
};

export const getAllUserByRole = async (role) => {
    //check if role exists
    const roleRecord = await roleModel.findRoleByName(role);
    if(!roleRecord){
        throw new ApiError(404, 'User Role not Found');
    }
    const Users = await userModel.findUserByRole(role);
    return Users;
}