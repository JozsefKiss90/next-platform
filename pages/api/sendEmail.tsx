import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const app_password = process.env.NEXT_PUBLIC_APP_PASSWORD
    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jozsefkiss90@gmail.com',
                pass: app_password,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: '"Your Name" jozsefkiss90@gmail.com',
            to: 'jozsefkiss90@gmail.com', 
            subject: 'New Message from Contact Form',
            text: req.body.message, 
            html: `<b>Sender Name:</b> ${req.body.name} <br><b>Sender Email:</b> ${req.body.email} <br><b>Message:</b> ${req.body.message}`, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
            res.status(200).json({ success: true, message: 'Email successfully sent', info });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
