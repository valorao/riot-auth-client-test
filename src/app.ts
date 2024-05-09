import express from "express";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { routes } from "./routes/routes";
import { headersMiddleware } from "./middlewares/SetHeaders";

const port = process.env.PORT || 5110;
const agent = process.env.AGENT || 'valorao-api';
const version = process.env.VERSION || 'v1';

const corsOptions = {
    origin: '*',
    allowedHeaders: 'password,username,remember, content-type'
}

const app = express();
app.use(headersMiddleware)
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.use('/v1/riot', routes)

app.listen(port, () => {
    console.log(`${agent}/${version}`)
    console.log(`Server is running on port ${port}`)
});
