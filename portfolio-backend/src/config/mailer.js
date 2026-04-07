import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

export const sendContactEmail = async ({ name, email, subject, message }) => {
    // Skip if email is not configured
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === "your_email@gmail.com") {
        console.log("📧 Email not configured — skipping send. Message from:", name, email);
        return;
    }

    await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER,
        subject: `[Portfolio] ${subject}`,
        html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
        replyTo: email,
    });
};
