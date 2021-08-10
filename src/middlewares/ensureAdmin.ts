import { Request, Response, NextFunction } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  //Verificar se o usuário é admin.

  const admin = true;
  if (admin) {
    return next();
  }
  return res.status(401).json({ error: "This user isn't admin" });
}
