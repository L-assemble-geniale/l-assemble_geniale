import appDataSource from "../data-source";
import { Member } from "../entities/Member";
import { News } from "../entities/News";
import { Residence } from "../entities/Residence";

export class NewsService {

    private newsRepository = appDataSource.getRepository(News);
    private residenceRepo = appDataSource.getRepository(Residence);
    private memberRepo = appDataSource.getRepository(Member);

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
    async create(input: { title: string; text: string; residenceId: number; authorId: number }) {
        const residence = await this.residenceRepo.findOneBy({ id: input.residenceId });
        if (!residence) throw new Error("Résidence introuvable");

        const author = await this.memberRepo.findOneBy({ id: input.authorId });
        if (!author) throw new Error("Auteur introuvable");

        const news = this.newsRepository.create({
            title: input.title,
            text: input.text,
            residence,
            author,
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
