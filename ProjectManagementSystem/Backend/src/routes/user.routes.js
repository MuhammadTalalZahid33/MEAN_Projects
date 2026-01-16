import { Router } from "express";
import { register } from "../controllers/user.controller.js";

const router = Router();

router.post('/registerUser', register)

export default router;