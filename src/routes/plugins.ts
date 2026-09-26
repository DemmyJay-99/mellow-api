import { Router } from "express";
import { getPlugins, addPlugin } from "../controllers/plugin.controller.js";

const router = Router();

router.get("/api/plugins", getPlugins)
router.post("/api/plugins", addPlugin)

export default router