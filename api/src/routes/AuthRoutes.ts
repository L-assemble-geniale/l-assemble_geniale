import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();
const authController = new AuthController();

// get all
authRouter.get("/", (req, res) => {
    console.log("userRouter");
    authController.getAll(req, res);
});

// get one by id
authRouter.get("/:id", (req, res) => {
    console.log("userRouter");
    authController.getById(req, res);
});

// Création de compte syndic
authRouter.post("/syndicRegister", (req, res) => {
    console.log("authRouter");
    authController.syndicRegister(req, res);
});

export default authRouter;

