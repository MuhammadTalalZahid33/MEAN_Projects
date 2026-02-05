import { Router } from "express";
import { getUser, getUsers, getUsersByRole, login, register } from "../controllers/user.controller.js";
import authorize from "../middleware/authorize.middleware.js";

const router = Router();

router.get('/allUsers', authorize('admin', 'manager'), getUsers);
router.get('/user/:id', authorize('admin', 'manager', 'member'), getUser);
router.get('/byRole/:role', authorize('admin', 'manager', 'member'), getUsersByRole);

export default router;