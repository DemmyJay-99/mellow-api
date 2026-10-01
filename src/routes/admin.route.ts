import { approvePlugin, getPlugins, addPlugin, rejectPlugin } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { Router } from "express";
const adminRouter = Router()
adminRouter.use(requireAdmin);
adminRouter.patch("/plugin/:id", approvePlugin)
adminRouter.get("/plugins", getPlugins)
adminRouter.post("/plugins", addPlugin)
adminRouter.patch("/plugin/:id", rejectPlugin)
export default adminRouter