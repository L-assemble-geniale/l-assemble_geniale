import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { isAuth } from "../middlewares/authMiddleware"; // optionnel

const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.get("/", isAuth, (req, res) => controller.getAll(req, res));

export default categoryRouter;
