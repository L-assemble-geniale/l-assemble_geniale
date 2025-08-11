import { Request, Response } from "express";
import { InvitationService } from "../services/InvitationService";

const invitationService = new InvitationService();

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export class InvitationController {
    async invite(req: AuthenticatedRequest, res: Response) {
        try {
            const { email, isAdmin } = req.body;
            const senderId = Number(req.userId);

            const invitation = await invitationService.createInvitation(senderId, email, isAdmin);
            res.send({ status: "OK", data: invitation });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    }

    async validateToken(req: Request, res: Response) {
        try {
            const { token } = req.params;
            const invitation = await invitationService.validateToken(token);
            res.send({ status: "OK", data: invitation });
        } catch (error) {
            res.status(400).send({ status: "Failed", message: error });
        }
    }


    async registerWithToken(req: Request, res: Response) {
        try {
            const { token } = req.params;
            const userData = req.body;

            const member = await invitationService.registerWithToken(token, userData);
            res.send({ status: "OK", data: member });
        } catch (error) {
            res.status(400).send({ status: "Failed", message: error });
        }
    }


}
