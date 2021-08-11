import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPlayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receber o Token(Bearer)
  const authToken = req.headers.authorization;

  // Validar se authToken esta preenchido
  if (!authToken) {
    return res.status(401).end();
  }
  // Validar se o token é valido
  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(
      token,
      "bb202fb78b3a8f3f2f0a4eb002fb1cea"
    ) as IPlayload;
    // Recuperar Informações do usuário
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }

  return next();
}
