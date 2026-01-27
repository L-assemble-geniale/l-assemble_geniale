import { Router } from "express";
import { MemberController } from "../controllers/MemberController";
import { isAuth } from "../middlewares/authMiddleware";
import { requireResidence } from "../middlewares/requireResidence";
import { isSyndic } from "../middlewares/SyndicMiddleware";

const memberRouter = Router();
const memberController = new MemberController();

// recupérer membre d'une residence
memberRouter.get("/", isAuth, requireResidence, isSyndic, (req, res) => {
  memberController.getAllByResidence(req, res);
});

// modification profil
memberRouter.patch("/me", isAuth, (req, res) => {
  memberController.updateMe(req, res);
});

 // suppression profil
memberRouter.delete("/me", isAuth, (req, res) => {
  memberController.deleteMe(req, res);
});

 // suppression membre
memberRouter.delete("/:id", isAuth, requireResidence, isSyndic, (req, res) => {
  memberController.deleteMember(req, res);
});

export default memberRouter;
