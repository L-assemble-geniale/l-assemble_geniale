import express from "express";
import { InvitationController } from "../controllers/InvitationController";
import { isSyndic } from "../middlewares/SyndicMiddleware";
import { isAuth } from "../middlewares/authMiddleware";

const invitationRouter = express.Router();
const invitationController = new InvitationController();

// créer une invitation (Syndic uniquement)
invitationRouter.post("/invite", isAuth, isSyndic, (req, res) => invitationController.invite(req, res));

// inscription depuis l'invitation (publique)
invitationRouter.post("/auth/register-by-token", (req, res) => invitationController.registerByToken(req, res));

export default invitationRouter;