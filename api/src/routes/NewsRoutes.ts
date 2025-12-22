import { Router } from "express";
import { newsContoller } from "../controllers/NewsController";
import { isSyndic } from "../middlewares/SyndicMiddleware";
import { isAuth } from "../middlewares/authMiddleware";
import { requireResidence } from "../middlewares/requireResidence";

const newsRouter = Router();
const newsController = new newsContoller

// Get all
newsRouter.get("/", isAuth, requireResidence, (req, res) => {
    console.log("newsRouter");
    newsController.getAll(req, res);
});


// get one by id
newsRouter.get("/:id", isAuth, (req, res) => {
    console.log("newsRouter");
    newsController.getById(req, res);
});

// Create
newsRouter.post("/", isAuth, isSyndic, (req, res) => {
    console.log("newsRouter");
    newsController.create(req, res);
});

// Update
newsRouter.patch("/:id", isAuth, isSyndic, (req, res) => {
    console.log("newsRouter")
    newsController.update(req, res);
});

// Delete
newsRouter.delete("/:id", isAuth, isSyndic, (req, res) => {
    console.log("newsRouter");
    newsController.delete(req, res);
});

export default newsRouter;