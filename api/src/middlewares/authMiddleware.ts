import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
    residenceId?: number;
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

export function isAuth(req: Request, res: Response, next: NextFunction) {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({ status: "Failed", message: "JWT_SECRET manquant côté serveur" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ status: "Failed", message: "Token manquant" });
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ status: "Failed", message: "Format Authorization invalide (Bearer <token>)" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | { id?: unknown };

    const id = (decoded as any).id;
    if (typeof id !== "number") {
      return res.status(401).json({ status: "Failed", message: "Token invalide (id manquant)" });
    }

    req.userId = id;
    next();
  } catch {
    return res.status(401).json({ status: "Failed", message: "Token invalide" });
  }
}
