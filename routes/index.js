import { Router } from "express";
import AuthRoutes from "./authRoutes.js"
import UserRoute from "./userRoute.js"
import MovieRoute from "./movieRoutes.js"
import CastRoute from "./castRoute.js"

const router = Router()


router.use("/api", AuthRoutes);
router.use("/api", UserRoute);
router.use("/api", MovieRoute);
router.use("/api", CastRoute);

export default router;