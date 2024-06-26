import { Router } from "express";
import { create, index, remove, search, update } from "../controllers/MovieController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();

router.post("/movie", authMiddleware, create);
router.get("/movie", authMiddleware, index);
router.put("/movie/:id", authMiddleware, update);
router.delete("/movie/:id", authMiddleware, remove);
router.get("/movie/search", authMiddleware, search);

export default router;
