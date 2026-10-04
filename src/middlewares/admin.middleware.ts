import type { Response, Request, NextFunction } from "express";
import supabase from "../db/supabase.js";

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    console.log("No");
    return res.status(401).json({
      error: "Authentication required",
    });
  }
  const token = auth.slice(7);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }

  if (user.email !== process.env.ADMIN_EMAIL) {
    console.log(user.email);
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  next();
};
