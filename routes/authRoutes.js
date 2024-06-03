import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();

router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)

// * Private route
router.get("/auth/user",AuthMiddleware, AuthController.user)

export default router;