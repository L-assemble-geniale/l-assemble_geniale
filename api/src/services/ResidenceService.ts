import appDataSource from "../data-source";
import { Residence } from "../entities/Residence";

export class ResidenceService {

    private residenceRepository = appDataSource.getRepository(Residence);

    // Requests
    // Get all residence
    async getAll() {
        console.log("ResidenceService");
        return this.residenceRepository.find({
            relations: ["adresses"]
        });
    };

    // Get one by id
    async getById(id: number) {
        console.log("ResidenceService");
        return this.residenceRepository.findOneBy({ id: id });
    };

    // Create
    async create(residence: Residence) {
        console.log("ResidenceService");
        const newResidence = this.residenceRepository.create(residence);
        return this.residenceRepository.save(newResidence);
    };

    // Update
    async Update(id: number, residence: Residence) {
        console.log("residenceService");
        return this.residenceRepository.update(id, residence);
    };

    // Delete
    async delete(id: number) {
        console.log("ResidenceService");
        return this.residenceRepository.delete(id);
    };
}
