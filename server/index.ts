import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CONFIG from "./config";
import authRouter from "./routes/auth";
import setupRouter from "./routes/setup";
import userInfoRouter from "./routes/user";
import stravaRouter from "./routes/strava";
import workoutRouter from "./routes/workout";
require("./handlers/strategies/session");
import {initStravaWebhook} from "./controller/StravaController/strava";
import CustomLogger from "./logging/logger";
import * as dotenv from "dotenv";
dotenv.config();

export const logger = new CustomLogger(CONFIG.LOG_PATH);

const app = express();

app.use(express.static(CONFIG.STATIC_PATH));
app.use('/images', express.static('images'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);
app.use(setupRouter);
app.use(userInfoRouter);
app.use(stravaRouter);
app.use(workoutRouter);

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(CONFIG.INDEX_PATH);
});




app.listen(CONFIG.PORT, () => {
    initStravaWebhook();
    logger.log('info', 'server', `Server is listening on port ${CONFIG.PORT}`)
    console.log(`Server is listening on port ${CONFIG.PORT}, ENV: ${process.env.ENV}`);
}
);
