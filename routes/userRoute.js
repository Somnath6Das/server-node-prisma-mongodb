import { Router } from "express";
import UserController from "../controllers/UserController.js";
const router = Router();

router.get("/getuser/:id" , UserController.getUser)

export default router;