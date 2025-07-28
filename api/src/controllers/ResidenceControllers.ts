import { Request, Response } from "express";
import { ResidenceService } from "../services/ResidenceService";

export class ResidenceContoller {
    private residenceService = new ResidenceService();

    // Requests
    // Get all residence 
    async getAll(req: Request, res: Response) {
        console.log("ResidenceContoller");
        try {
            const residence = await this.residenceService.getAll();
            res.send({ status: "OK", data: residence });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Get one residence by the id 
    async getById(req: Request, res: Response) {
        console.log("ResidenceContoller");
        try {
            const residence = await this.residenceService.getById(Number(req.params.id));
            res.send({ status: "OK", data: residence });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Create one residence 
    async create(req: Request, res: Response) {
        console.log("ResidenceContoller");
        try {
            const residence = await this.residenceService.create(req.body);
            res.send({ status: "OK", data: residence });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Update
    async update(req: Request, res: Response) {
        console.log("ResidenceContoller");
        try {
            const residence = await this.residenceService.Update(Number(req.params.id), req.body);
            res.send({ status: "OK", data: residence });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Delete one residence 
    async delete(req: Request, res: Response) {
        console.log("ResidenceContoller");
        try {
            const residence = await this.residenceService.delete(Number(req.params.id));
            res.send({ status: "OK", data: residence });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };
};