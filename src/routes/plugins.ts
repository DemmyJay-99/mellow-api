import { Router } from "express";
import { getPlugins, addPlugin } from "../controllers/plugin.controller.js";

export const router = Router();
router.get("/plugins", getPlugins)
router.post("/plugins", addPlugin)

export default router