import { Request, Response } from "express";
import { MemberService } from "../services/MemberService";

export class MemberController {
  memberService = new MemberService();

  // recupérer membre d'une residence
  async getAllByResidence(req: Request, res: Response) {
    try {
      const residenceId = req.residenceId;
      const members = await this.memberService.getAllByResidence(residenceId!);
      res.send({ status: "OK", data: members });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }

  // modification profil
  async updateMe(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as number;

      const allowed = ["firstName", "lastName", "age", "phoneNumber", "appartmentNumber", "email"];
      const payload: any = {};
      for (const key of allowed) {
        if (req.body[key] !== undefined) payload[key] = req.body[key];
      }

      const updated = await this.memberService.update(userId, payload);
      res.send({ status: "OK", data: updated });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }

  // suppression profil
  async deleteMe(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as number;
      const deleted = await this.memberService.delete(userId);
      res.send({ status: "OK", data: deleted });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }

  // suppression membre
  async deleteMember(req: Request, res: Response) {
    try {
      const residenceId = req.residenceId;
      const id = Number(req.params.id);

      const target = await this.memberService.getById(id);
      if (!target) return res.status(404).send({ status: "Failed", message: "Membre introuvable" });

      if (target.residence?.id !== residenceId) {
        return res.status(403).send({ status: "Failed", message: "Accès refusé" });
      }

      const deleted = await this.memberService.delete(id);
      res.send({ status: "OK", data: deleted });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
}
