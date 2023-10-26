import nodemailer from 'nodemailer';
import getEmailTemplate from "./template";
import CONFIG from "../../config";
import crypto from "crypto";
const transporter = nodemailer.createTransport({
    host: 'smtp.strato.de',
    port: 587,
    auth: {
        user: `${CONFIG.STRATO_MAIL}`,
        pass: `${CONFIG.STRATO_MAIL_PASSWORD}`
    },
    tls: {
        rejectUnauthorized: false
    }
});


export const sendEmail = (mail: string, username: string,uuid: string ) => {
    const mailOptions = {
        from: CONFIG.STRATO_MAIL,
        to: mail,
        subject: 'Bestätigen Sie Ihre Mail',
        html: getEmailTemplate(CONFIG.GOOGLE_CALLBACK_URL,username, uuid)
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
}

