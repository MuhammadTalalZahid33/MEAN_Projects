import { Router } from "express";
import getUsers from "../services/getUsers.js";

const router = Router();

router.route('/getUsers').get(getUsers)

export default router;