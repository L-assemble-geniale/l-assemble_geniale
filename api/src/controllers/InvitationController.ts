import { Request, Response } from "express";
import { InvitationService } from "../services/InvitationService";
import { AuthService } from "../services/AuthService";


const invitationService = new InvitationService();
const authService = new AuthService();

export class InvitationController {
  async invite(req: Request, res: Response) {
    try {
      const senderId = req.userId!;
      const { email, isAdmin } = req.body;
      const inv = await invitationService.createInvitation(senderId, email, Boolean(isAdmin));
      res.send({ status: "OK", data: inv });
    } catch (e: any) {
      res.status(500).send({ status: "Failed", message: e.message || "Erreur serveur" });
    }
  }

  async registerByToken(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const user = await authService.registerWithToken(token, req.body);
      res.status(201).send({ status: "OK", data: user });
    } catch (e: any) {
      res.status(400).send({ status: "Failed", message: e.message || "Inscription impossible" });
    }
  }
}