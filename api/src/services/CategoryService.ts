import appDataSource from "../data-source";
import { Category } from "../entities/Category";

export class CategoryService {
  private repo = appDataSource.getRepository(Category);

  async getAll() {
    return this.repo.find({
      order: { id: "ASC" },
    });
  }
}
