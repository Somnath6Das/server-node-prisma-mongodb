import { Router } from "express";  
import store from "../controllers/MovieController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();

router.post("/movie", authMiddleware, store);


export default router;