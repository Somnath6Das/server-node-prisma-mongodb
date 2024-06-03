import { Router } from "express";
import AuthRoutes from "./authRoutes.js"
import router from "./authRoutes.js";
import UserRoute from "./userRoute.js"

router.use("/api", AuthRoutes)
router.use("/api", UserRoute);

export default router;