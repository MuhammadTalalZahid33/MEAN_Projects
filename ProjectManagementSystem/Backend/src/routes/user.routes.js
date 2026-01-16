import { Router } from "express";
import { getUser, getUsers, login, register } from "../controllers/user.controller.js";

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/allusers', getUsers);
router.get('/user/:id', getUser);

export default router;