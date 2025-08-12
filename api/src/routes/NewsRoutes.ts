import { Router } from "express";
import { newsContoller } from "../controllers/NewsController";

const newsRouter = Router();
const newsController = new newsContoller

// Get all
newsRouter.get("/",(req, res) => {
    console.log("newsRouter");
    newsController.getAll(req, res);
});

// get one by id
newsRouter.get("/:id", (req, res) => {
    console.log("newsRouter");
    newsController.getById(req, res);
});

// Create
newsRouter.post("/", (req, res) => {
    console.log("newsRouter");
    newsController.create(req, res);
});

// Update
newsRouter.patch("/:id", (req, res) => {
    console.log("newsRouter")
    newsController.update(req, res);
});

// Delete
newsRouter.delete("/:id", (req, res) => {
    console.log("newsRouter");
    newsController.delete(req, res);
});

export default newsRouter;