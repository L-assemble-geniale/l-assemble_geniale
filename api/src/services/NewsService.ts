import appDataSource from "../data-source";
import { News } from "../entities/News";
import { Residence } from "../entities/Residence";

export class NewsService {

    private newsRepository = appDataSource.getRepository(News);

    // Requests
    // Get all residence
    async getAll() {
        return this.newsRepository.find({
            relations: ["residence"],
            order: { createdAt: "DESC" },
        });
    }

    // Get one by id
    async getById(id: number) {
        console.log("newsService");
        return this.newsRepository.findOneBy({ id: id });
    };

    // Create
    async create(input: { title: string; text: string; residenceId: number }) {
        const news = this.newsRepository.create({
            title: input.title,
            text: input.text,
            residence: { id: input.residenceId } as Residence,
        });
        return this.newsRepository.save(news);
    }

    // Update
    async Update(id: number, news: News) {
        console.log("newsService");
        return this.newsRepository.update(id, news);
    };

    // Delete
    async delete(id: number) {
        console.log("newsService");
        return this.newsRepository.delete(id);
    };
}
