import type { Response, Request } from "express";
import { pluginSchema, statusSchema } from "../schemas/plugin.schema.js";
import db from "../db/supabase.js";

export const getPlugins = async (req: Request, res: Response) => {
  const { status } = req.query;
  if (!status) {
    const { data, error } = await db.from("plugins").select("*");
    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
    return res.json(data);
  } else if (status === "pending") {
    const { data, error } = await db.from("plugins").select("*").eq("status", "pending");
    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
    return res.json(data);
  } else if (status === "approved") {
    const { data, error } = await db.from("plugins").select("*").eq("status", "approved");
    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
    return res.json(data);
  }
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
    status: "approved",
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

type PluginParams = {
  id: string;
};

export const updatePluginStatus = async (req: Request<PluginParams>, res: Response) => {
  const { id } = req.params;
  const result = statusSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request body",
    });
  }
  const { status } = result.data;
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({
      error: "Invalid status",
    });
  }
  const { data: plugin, error: fetchError } = await db.from("plugins").select("id, status").eq("id", id).single();

  if (fetchError || !plugin) {
    return res.status(404).json({ error: "Plugin not found" });
  }
  const { data, error: updateError } = await db
    .from("plugins")
    .update({ status })
    .eq("id", id)
    .eq("status", "pending")
    .select()
    .single();
  if (updateError) {
    return res.status(500).json({
      error: updateError.message,
    });
  }
  return res.json(data);
};

// export const deletePlugin = async (req: Request, res: Response) {

// }
