import { Router } from "express";
import { getPlugins } from "../controllers/plugin.controller.js";

const router = Router();

router.get("/api/plugins", getPlugins)

export default router