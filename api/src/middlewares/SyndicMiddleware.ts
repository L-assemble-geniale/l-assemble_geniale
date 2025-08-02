import { Request, Response, NextFunction } from "express";
import appDataSource from "../data-source";
import { Member } from "../entities/Member";

export const isSyndic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req as Request & { userId: number };

    const user = await appDataSource.getRepository(Member).findOneBy({ id: userId });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ status: "Failed", message: "Accès réservé aux syndics" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: "Erreur serveur" });
  }
};
