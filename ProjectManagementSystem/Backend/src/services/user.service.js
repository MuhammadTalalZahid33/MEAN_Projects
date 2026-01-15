import bcrypt from 'bcrypt';
import { ApiError } from '../utils/ApiError.js';
import * as userModel from '../models/user.model.js';
import * as roleModel from '../models/role.model.js';

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
