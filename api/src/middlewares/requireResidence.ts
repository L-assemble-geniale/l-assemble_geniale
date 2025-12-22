import { Request, Response, NextFunction } from "express";
import appDataSource from "../data-source";
import { Member } from "../entities/Member";

export async function requireResidence(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(401).json({ status: "Failed", message: "Non authentifié" });
    }

    const repo = appDataSource.getRepository(Member);

    const user = await repo.findOne({
      where: { id: req.userId },
      relations: ["residence"],
    });

    const residenceId = user?.residence?.id;

    if (!residenceId) {
      return res.status(403).json({
        status: "FORBIDDEN",
        message: "Aucune résidence associée : accès refusé.",
      });
    }

    req.residenceId = residenceId;
    next();
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: "Erreur serveur (résidence)" });
  }
}
