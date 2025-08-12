import appDataSource from "../data-source";
import { News } from "../entities/News";

export class NewsService {

    private newsRepository = appDataSource.getRepository(News);

    // Requests
    // Get all residence
    async getAll() {
        console.log("newsService");
        return this.newsRepository.find();
    };

    // Get one by id
    async getById(id: number) {
        console.log("newsService");
        return this.newsRepository.findOneBy({ id: id });
    };

    // Create
    async create(news: News) {
        console.log("newsService");
        const newResidence = this.newsRepository.create(news);
        return this.newsRepository.save(newResidence);
    };

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
