import { Router } from "express";
import { getPlugins, addPlugin, likePlugin, unlikePlugin } from "../controllers/plugin.controller.js";

export const router = Router();
router.get("/plugins", getPlugins)
router.post("/plugins", addPlugin)
router.post("/plugins/:id/like", likePlugin)
router.delete("/plugins/:id/like", unlikePlugin)
export default router