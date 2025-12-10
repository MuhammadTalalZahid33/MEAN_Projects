import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(logoutUser);

export default router;