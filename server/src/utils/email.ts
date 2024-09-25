import nodemailer from 'nodemailer';
import { generateAccountConfirmationToken, TokenData } from '../middlewares/authentication';
import { __prod__ } from './constants';

const domain = process.env.CLIENT_URL!;

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
        from: '"Helper Hive" <noreply@helperhive.ca>',
        to,
        subject,
        text,
    };

    try {
        if (!__prod__) {
            console.log(mailOptions);
        } else {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: %s", info.messageId);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function sendPasswordResetEmail(to: string, token: string) {
    const subject = "Password Reset";
    const text = `Click the link below to reset your password:\n\n${domain}/reset-password/${token}`;

    await sendMail(to, subject, text);
}

async function sendConfirmRegistrationEmail(to: string, token: string) {
    const subject = "Confirm Registration";
    const text = `Your registration is almost complete! Click the link below to confirm your email address and join the network:\n${domain}/confirm-account/${token}`;

    await sendMail(to, subject, text);
}

export async function createConfirmRegistrationEmail(tokenData: TokenData, email: string) {
    const token = generateAccountConfirmationToken(tokenData);

    if (!token) {
        console.error("Error generating token");
        return;
    }

    await sendConfirmRegistrationEmail(email, token);
}

export async function sendEventConfirmationEmail(to: string, eventName: string, eventId: string) {
    const subject = "Event Confirmation";
    const text = `Your registration for ${eventName} has been confirmed! \n
    For more information about the event, visit ${domain}/app/events/${eventId}.
    `;

    await sendMail(to, subject, text);
}

export async function sendEventCancellationEmail(to: string, eventName: string) {
    const subject = "Event Cancellation";
    const text = `Your registration for ${eventName} has been cancelled.`;

    await sendMail(to, subject, text);
}

