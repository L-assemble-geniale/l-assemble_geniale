import appDataSource from "../data-source";
import { Invitation } from "../entities/Invitation";
import { Member } from "../entities/Member";
import { v4 as uuidv4 } from 'uuid';
import { MailService } from "./MailService";

export class InvitationService {
  private invitationRepo = appDataSource.getRepository(Invitation);
  private memberRepo = appDataSource.getRepository(Member);
  private mailer = new MailService();

  // 1) Création d'une invitation + envoi de l'email
  async createInvitation(senderId: number, email: string, isAdmin: boolean) {
    const sender = await this.memberRepo.findOne({
      where: { id: senderId },
      relations: ["residence"],
    });
    if (!sender?.residence) throw new Error("Le syndic n'est rattaché à aucune résidence.");

    const token = uuidv4();
    const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const invitation = this.invitationRepo.create({
      email,
      token,
      isAdmin,
      isUsed: false,
      expireAt,
      residence: sender.residence,
    });
    await this.invitationRepo.save(invitation);

    const baseUrl = process.env.FRONT_BASE_URL;
    const inviteUrl = `${baseUrl}/register/${token}`;

    await this.mailer.sendInvitation(email, sender.residence.name, inviteUrl);
    return { id: invitation.id, token, expireAt };
  }
}