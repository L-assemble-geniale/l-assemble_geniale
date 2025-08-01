import appDataSource from "../data-source";
import { Adress } from "../entities/Adress";
import { Member } from "../entities/Member";
import { Residence } from "../entities/Residence";
import bcrypt from "bcrypt";
import { ResidenceService } from "./ResidenceService";

type AddressInput = {
    streetNumber: string;
    streetName: string;
    city: string;
    postalCode: string;
};

export class AuthService {

    private authRepository = appDataSource.getRepository(Member);
    private residenceRepository = appDataSource.getRepository(Residence);
    private residenceService = new ResidenceService();

    // Get all residence
    //Get all users 
    async getAll() {
        console.log("UserService");
        return this.authRepository.find();
    };

    //Get all users by id 
    async getById(id: number) {
        console.log("UserService");
        return this.authRepository.findOneBy({ id: id });
    };

    // Création du premier syndic d'une copro
    async registerSyndic(data: {
        residenceName: string;
        addresses: AddressInput[];
        lastName: string;
        firstName: string;
        email: string;
        password: string;
        phoneNumber?: string;
        age?: number;
        appartmentNumber?: string;
    }) {
        const residence = await this.getOrCreateResidence(data.residenceName, data.addresses);
        await this.ensureEmailIsAvailable(data.email);
        const hashedPassword = await this.hashPassword(data.password);

        const newMember = this.authRepository.create({
            lastName: data.lastName,
            firstName: data.firstName,
            email: data.email,
            password: hashedPassword,
            phoneNumber: data.phoneNumber,
            age: data.age,
            appartmentNumber: data.appartmentNumber,
            isAdmin: true,
            residence: residence,
        });

        return this.authRepository.save(newMember);
    }

    private async getOrCreateResidence(name: string, addresses: AddressInput[]) {
        let residence = await this.residenceRepository.findOneBy({ name });
        if (!residence) {
            const newResidence = this.residenceRepository.create({
                name,
                adresses: addresses,
            });

            residence = await this.residenceService.create(newResidence);
        }
        return residence;
    }

    private async ensureEmailIsAvailable(email: string): Promise<void> {
        const existing = await this.authRepository.findOneBy({ email });
        if (existing) {
            throw new Error("Un compte existe déjà avec cet email.");
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    // Création d'un membre relié à une résidence déjà existente

    // Connexion

    // Delete one user
    async delete(id: string) {
        console.log("UserService");
        return this.authRepository.delete(id);
    };

}