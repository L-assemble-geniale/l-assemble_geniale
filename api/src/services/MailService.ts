import nodemailer from "nodemailer";

export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  async sendInvitation(to: string, residenceName: string, inviteUrl: string) {
    await this.transporter.sendMail({
      from: `"Votre copropriété" <${process.env.SMTP_USER}>`,
      to,
      subject: "Invitation à rejoindre une résidence",
      html: `
        <p>Vous êtes invité(e) à rejoindre la résidence <b>${residenceName}</b>.</p>
        <p>Créez votre compte ici : <a href="${inviteUrl}">${inviteUrl}</a></p>
      `,
    });
  }
}