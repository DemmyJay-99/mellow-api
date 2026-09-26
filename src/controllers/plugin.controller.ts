import { Response, Request } from "express";
import db from "../db/supabase.js";

export const getPlugins = async (req: Request, res: Response) => {
  const { data, error } = await db.from("plugins").select("*");
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  return res.json(data);
};
