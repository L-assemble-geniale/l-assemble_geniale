import appDataSource from "../data-source";
import { Recommandation } from "../entities/Recommandation";

export class RecommandationService {
  private repo = appDataSource.getRepository(Recommandation);

  async getAllByResidence(residenceId: number) {
    return this.repo.find({
      where: {
        residence: {
          id: residenceId,
        },
      },
      relations: ["category"],
      order: {
        id: "DESC",
      },
    });
  }

  async create(data: Partial<Recommandation>) {
    const reco = this.repo.create(data);
    return this.repo.save(reco);
  }

  async update(id: number, data: Partial<Recommandation>) {
    await this.repo.update({ id }, data);
    return this.repo.findOneBy({ id });
  }

  async delete(id: number) {
    return this.repo.delete({ id });
  }
}
