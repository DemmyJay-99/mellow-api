import { getPlugins, addPlugin, updatePluginStatus,deletePlugin } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { Router } from "express";
const adminRouter = Router();
adminRouter.use(requireAdmin);
adminRouter.get("/plugins", getPlugins);
adminRouter.post("/plugins", addPlugin);
adminRouter.delete("/plugin/:id", deletePlugin)
adminRouter.patch("/plugin/:id", updatePluginStatus);
export default adminRouter;
