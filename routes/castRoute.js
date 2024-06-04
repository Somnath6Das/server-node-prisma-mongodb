import { Router } from "express";
import {
  create,
  index,
  remove,
  update,
} from "../controllers/CastController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();

router.post("/cast", authMiddleware, create);
router.get("/cast", authMiddleware, index);
router.put("/cast/:id", authMiddleware, update);
router.delete("/cast/:id", authMiddleware, remove);

export default router;
