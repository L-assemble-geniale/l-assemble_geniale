import express from "express";
import { InvitationController } from "../controllers/InvitationController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isSyndic } from "../middlewares/SyndicMiddleware";

const invitationRouter = express.Router();
const invitationController = new InvitationController();

invitationRouter.post("/invite", authMiddleware, isSyndic, (req, res) => {
    invitationController.invite(req, res);
});

invitationRouter.get("/invitation/:token", (req, res) => invitationController.validateToken(req, res));

invitationRouter.post("/register/:token", (req, res) => invitationController.registerWithToken(req, res));



export default invitationRouter;
