import { Router } from "express";
import { ResidenceContoller } from "../controllers/ResidenceControllers";

const residenceRouter = Router();
const residenceController = new ResidenceContoller();

// Get all
residenceRouter.get("/",(req, res) => {
    console.log("residenceRouter");
    residenceController.getAll(req, res);
});

// get one by id
residenceRouter.get("/:id", (req, res) => {
    console.log("residenceRouter");
    residenceController.getById(req, res);
});

// Create
residenceRouter.post("/", (req, res) => {
    console.log("residenceRouter");
    residenceController.create(req, res);
});

// Update
residenceRouter.patch("/:id", (req, res) => {
    console.log("residenceRouter")
    residenceController.update(req, res);
});

// Delete
residenceRouter.delete("/:id", (req, res) => {
    console.log("residenceRouter");
    residenceController.delete(req, res);
});

export default residenceRouter;