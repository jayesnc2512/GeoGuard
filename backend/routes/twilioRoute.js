import express from 'express';
import bodyParser from 'body-parser';
import pino from 'express-pino-logger';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(pino());
const router = express.Router()

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

router.get('/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

router.post('/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
});

export default router