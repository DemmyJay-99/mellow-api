import type { Response, Request } from "express";
import { pluginSchema } from "../schemas/plugin.schema.js";
import db from "../db/supabase.js";

export const getPlugins = async (req: Request, res: Response) => {
  const { data, error } = await db.from("plugins").select("*").eq("status", "approved");
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  return res.json(data);
};

export const addPlugin = async (req: Request, res: Response) => {
  const result = pluginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.flatten(),
    });
  }
  const plugin = {
    ...result.data,
  };
  if (!plugin) {
    return res.status(500).json({
      error: "Invalid request body",
    });
  }
  const { data, error } = await db.from("plugins").insert(plugin).select();
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  return res.json(data);
};

export const likePlugin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data: plugin, error: fetchError } = await db.from("plugins").select("like_count").eq("id", id).single();
  if (fetchError || !plugin) {
    return res.status(404).json({ error: "Plugin not found" });
  }
  const { data, error } = await db.rpc("like_plugin", { plugin_id: id });
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  return res.json(data);
};

export const unlikePlugin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data: plugin, error: fetchError } = await db.from("plugins").select("like_count").eq("id", id).single();
  if (fetchError || !plugin) {
    return res.status(404).json({ error: "Plugin not found" });
  }
  const { data, error } = await db.rpc("unlike_plugin", { plugin_id: id });
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  return res.json(data);
};
