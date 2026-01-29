import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware";
import { requireResidence } from "../middlewares/requireResidence";
import { isSyndic } from "../middlewares/SyndicMiddleware";
import { RecommandationController } from "../controllers/RecommendationController";

const recommandationRoutes = Router();
const controller = new RecommandationController();

recommandationRoutes.use(isAuth, requireResidence);

recommandationRoutes.get("/", controller.getAll.bind(controller));
recommandationRoutes.post("/", isSyndic, controller.create.bind(controller));
recommandationRoutes.patch("/:id", isSyndic, controller.update.bind(controller));
recommandationRoutes.delete("/:id", isSyndic, controller.delete.bind(controller));

export default recommandationRoutes;
