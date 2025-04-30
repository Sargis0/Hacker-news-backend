import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

class EmailService {
    async send({to, subject, text}) {
        await transporter.sendMail({
            from: '"HackerNews Clone" <sargiskirakosyan1994s@gmail.com>',
            to,
            subject,
            text
        });
    }
}

export default new EmailService();
