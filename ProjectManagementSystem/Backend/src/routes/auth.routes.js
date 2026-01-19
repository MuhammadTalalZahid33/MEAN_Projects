import { Router } from "express";
import { getUser, getUsers, login, register } from "../controllers/user.controller.js";
import authorize from "../middleware/authorize.middleware.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;