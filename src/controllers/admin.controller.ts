import type { Response, Request } from "express";
import { pluginSchema } from "../schemas/plugin.schema.js";
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

export const approvePlugin = async (req: Request<PluginParams>, res: Response) => {
  const { id } = req.params;
  const { data, error } = await db.from("plugins").update({ status: "approved" }).eq("id", id).select();
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  return res.json(data);
};

export const rejectPlugin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await db.from("plugins").update({ status: "rejected" }).eq("id", id).select();
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  return res.json(data);
};
