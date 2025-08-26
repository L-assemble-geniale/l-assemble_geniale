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
        try {
            const { title, text, residence } = req.body; 
            const authorId = Number(req.body.authorId) || Number(req.userId);

            const created = await this.newsService.create({
                title,
                text,
                residenceId: Number(residence),
                authorId,
            });

            res.send({ status: "OK", data: created });
        } catch (err: any) {
            res.status(400).send({ status: "Failed", message: err.message || err });
        }
    }

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