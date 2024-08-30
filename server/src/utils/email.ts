import nodemailer from 'nodemailer';

const domain = process.env.DOMAIN!;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export async function sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
        from: '"Helper Hive" <helperhive@ethereal.email>',
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error(error);
    }
}

export async function sendPasswordResetEmail(to: string, token: string) {
    const subject = "Password Reset";
    const text = `Click the link below to reset your password:\n\n${domain}/reset-password/${token}`;

    await sendMail(to, subject, text);
}

export async function sendConfirmRegistrationEmail(to: string, token: string) {
    const subject = "Confirm Registration";
    const text = `Your registration is almost complete! Click the link below to confirm your email address and join the network:\n\n${domain}/confirm-account/${token}`;

    await sendMail(to, subject, text);
}

export async function sendEventConfirmationEmail(to: string, eventName: string) {
    const subject = "Event Confirmation";
    const text = `Your registration for ${eventName} has been confirmed!`;

    await sendMail(to, subject, text);
}

export async function sendEventCancellationEmail(to: string, eventName: string) {
    const subject = "Event Cancellation";
    const text = `Your registration for ${eventName} has been cancelled.`;

    await sendMail(to, subject, text);
}

