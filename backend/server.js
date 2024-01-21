import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import camRoutes from './routes/camRoutes.js';
import alertRoute from './routes/alertRoute.js';
import twilioRoute from './routes/twilioRoute.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import pino from 'express-pino-logger';
import twilio from 'twilio';



dotenv.config();


const app = express()
// databus.config
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/camera', camRoutes);
app.use('/api/alert', alertRoute);
app.use('/api/twilio',twilioRoute)




const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


// rest api
app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`.bgGreen.white))