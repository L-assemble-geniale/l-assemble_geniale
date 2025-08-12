import { Request, Response } from "express";
import { NewsService } from "../services/NewsService";

export class newsContoller {
    private newsService = new NewsService();

    // Requests
    // Get all news 
    async getAll(req: Request, res: Response) {
        console.log("newsContoller");
        try {
            const news = await this.newsService.getAll();
            res.send({ status: "OK", data: news });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Get one news by the id 
    async getById(req: Request, res: Response) {
        console.log("newsContoller");
        try {
            const news = await this.newsService.getById(Number(req.params.id));
            res.send({ status: "OK", data: news });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Create one news 
    async create(req: Request, res: Response) {
        console.log("newsContoller");
        try {
            const news = await this.newsService.create(req.body);
            res.send({ status: "OK", data: news });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Update
    async update(req: Request, res: Response) {
        console.log("newsContoller");
        try {
            const news = await this.newsService.Update(Number(req.params.id), req.body);
            res.send({ status: "OK", data: news });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Delete one news 
    async delete(req: Request, res: Response) {
        console.log("newsContoller");
        try {
            const news = await this.newsService.delete(Number(req.params.id));
            res.send({ status: "OK", data: news });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };
};