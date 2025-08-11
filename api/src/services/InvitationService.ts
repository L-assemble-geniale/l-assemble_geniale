import appDataSource from "../data-source";
import { Invitation } from "../entities/Invitation";
import { Member } from "../entities/Member";
import { v4 as uuidv4 } from 'uuid';
import { sendInvitationEmail } from "./MailService";
import bcrypt from "bcrypt";



export class InvitationService {
    private invitationRepository = appDataSource.getRepository(Invitation);
    private memberRepository = appDataSource.getRepository(Member);

    async createInvitation(senderId: number, email: string, isAdmin: boolean) {
        const sender = await this.memberRepository.findOne({
            where: { id: senderId },
            relations: ["residence"],
        });

        if (!sender) {
            throw new Error("Syndic non trouvé.");
        }

        const token = uuidv4();
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);

        const invitation = this.invitationRepository.create({
            email,
            token,
            isAdmin,
            residence: sender.residence,
            expireAt: expiration,
        });

        await this.invitationRepository.save(invitation);

        await sendInvitationEmail(email, token, sender.residence.name);

        return invitation;
    }


    async validateToken(token: string) {
        const invitation = await this.invitationRepository.findOne({
            where: { token },
            relations: ["residence"],
        });

        if (!invitation || invitation.isUsed) {
            throw new Error("Invitation invalide ou déjà utilisée.");
        }

        const now = new Date();
        if (invitation.expireAt && invitation.expireAt < now) {
            throw new Error("Invitation expirée.");
        }

        return invitation;
    }


    async registerWithToken(token: string, userData: any) {
        const invitation = await this.invitationRepository.findOne({
            where: { token },
            relations: ["residence"],
        });

        if (!invitation || invitation.isUsed) {
            throw new Error("Invitation invalide ou déjà utilisée.");
        }

        const now = new Date();
        if (invitation.expireAt && invitation.expireAt < now) {
            throw new Error("Invitation expirée.");
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newMember = this.memberRepository.create({
            ...userData,
            isAdmin: invitation.isAdmin,
            residence: invitation.residence,
            password: hashedPassword,
        });

        await this.memberRepository.save(newMember);

        invitation.isUsed = true;
        await this.invitationRepository.save(invitation);

        return newMember;
    }
}
