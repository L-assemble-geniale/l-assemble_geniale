import appDataSource from "../data-source";
import { Adress } from "../entities/Adress";
import { Member } from "../entities/Member";
import { Residence } from "../entities/Residence";
import bcrypt from "bcrypt";

export class AuthService {

    private authRepository = appDataSource.getRepository(Member);
    private residenceRepository = appDataSource.getRepository(Residence);
    private adressRepository = appDataSource.getRepository(Adress);


    // Get all users
    async getAll() {
        console.log("UserService");
        return this.authRepository.find();
    };

    // Get one user by id
    async getById(id: number) {
        console.log("UserService");
        return this.authRepository.findOneBy({ id: id });
    };

    // Création du premier syndic d'une copro
    async registerSyndic(data: {
    residenceName: string;
    addresses: { streetNumber: string; streetName: string; postalCode: string }[];
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

    private async getOrCreateResidence(name: string, addresses: { streetNumber: string; streetName: string; postalCode: string }[]) {
        let residence = await this.residenceRepository.findOneBy({ name });

        if (!residence) {
            // Création de la résidence
            residence = this.residenceRepository.create({ name });
            await this.residenceRepository.save(residence);

            // Création des adresses liées
            for (const addr of addresses) {
                const newAddress = this.adressRepository.create({
                    streetNumber: addr.streetNumber,
                    streetName: addr.streetName,
                    postalCode: addr.postalCode,
                    residence: residence
                });
                await this.adressRepository.save(newAddress);
            }
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