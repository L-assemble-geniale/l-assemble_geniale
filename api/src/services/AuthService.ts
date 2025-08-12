import appDataSource from "../data-source";
import { Member } from "../entities/Member";
import { Residence } from "../entities/Residence";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResidenceService } from "./ResidenceService";
import { Invitation } from "../entities/Invitation";

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
    private invitationRepo = appDataSource.getRepository(Invitation);

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

    // creation first syndic
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

    // user creation by invitation
    async registerWithToken(token: string, data: {
        lastName: string; firstName: string; email: string; password: string;
        phoneNumber?: string; age?: number; appartmentNumber?: string;
    }) {
        const invitation = await this.invitationRepo.findOne({
            where: { token },
            relations: ["residence"],
        });

        if (!invitation || invitation.isUsed) throw new Error("Invitation invalide ou déjà utilisée.");
        if (invitation.expireAt && invitation.expireAt < new Date()) throw new Error("Invitation expirée.");

        const hashed = await bcrypt.hash(data.password, 10);

        const member = this.authRepository.create({
            lastName: data.lastName,
            firstName: data.firstName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            age: data.age,
            appartmentNumber: data.appartmentNumber,
            password: hashed,
            isAdmin: invitation.isAdmin,
            residence: invitation.residence,
        });
        await this.authRepository.save(member);

        invitation.isUsed = true;
        await this.invitationRepo.save(invitation);

        return member;
    }

    // Connexion
    async login(email: string, password: string) {
        const user = await this.authRepository.findOne({
            where: { email },
            relations: ['residence'], // si besoin d'info sur la résidence
        });

        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Mot de passe invalide.");
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET n'est pas défini dans le .env");
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "10h" });

        return { token, user };
    }

    // Delete one user
    async delete(id: string) {
        console.log("UserService");
        return this.authRepository.delete(id);
    };

}