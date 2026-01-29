import { Request, Response } from "express";
import { RecommandationService } from "../services/RecommandationService";

export class RecommandationController {
  private service = new RecommandationService();

  async getAll(req: Request, res: Response) {
    const residenceId = req.residenceId;

    const recommandations =
      await this.service.getAllByResidence(residenceId);

    return res.json({ status: "OK", data: recommandations });
  }

  async create(req: Request, res: Response) {
    const residenceId = req.residenceId;

    const created = await this.service.create({
      ...req.body,
      residence_number: residenceId,
    });

    return res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const updated = await this.service.update(id, req.body);
    return res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    await this.service.delete(id);
    return res.status(204).send();
  }
}
