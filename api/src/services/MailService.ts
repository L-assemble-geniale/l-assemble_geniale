import nodemailer from "nodemailer";

export async function sendInvitationEmail(email: string, token: string, residenceName: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const link = `http://localhost:5173/register/${token}`; // À adapter
  const mailOptions = {
    from: `"Votre copropriété" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Invitation à rejoindre une résidence",
    html: `<p>Vous êtes invité(e) à rejoindre la résidence <strong>${residenceName}</strong> sur le site de l'assemblé géniale afin de suivre toutes les actus de votre copro et plus encore!</p>
        <p>Créez votre compte ici : <a href="${link}">${link}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}
