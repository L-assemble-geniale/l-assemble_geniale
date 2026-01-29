import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
  private service = new CategoryService();

  async getAll(req: Request, res: Response) {
    try {
      const categories = await this.service.getAll();
      return res.json({ status: "OK", data: categories });
    } catch (error) {
      return res.status(500).json({ status: "Failed", message: error });
    }
  }
}
