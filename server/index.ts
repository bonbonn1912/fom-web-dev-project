import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CONFIG from "./config";
import authRouter from "./routes/auth";
import accountRouter from "./routes/account";
import userInfoRouter from "./routes/user";
import stravaRouter from "./routes/strava";
import workoutRouter from "./routes/workout";
import equipmentRouter from "./routes/equipment";
require("./handlers/strategies/session");
import {initStravaWebhook} from "./controller/StravaController/strava";
import CustomLogger from "./logging/logger";
import compression from "compression";
import * as dotenv from "dotenv";
dotenv.config();
import {sendEmail} from "./controller/EmailController/confirmation";

export const logger = new CustomLogger(CONFIG.LOG_PATH);

const app = express();

app.use(compression());

app.use(express.static(CONFIG.STATIC_PATH));
app.use('/images', express.static('images'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("*.js", function (req, res, next) {
    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "text/javascript");
    next();
});

app.get("*.css", function (req, res, next) {
    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "text/css");
    next();
});
app.use(authRouter);
app.use(accountRouter);
app.use(userInfoRouter);
app.use(stravaRouter);
app.use(workoutRouter);
app.use(equipmentRouter)
app.get("/*", (req: Request, res: Response) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/html');
  res.sendFile(CONFIG.INDEX_PATH);
});


app.listen(CONFIG.PORT, () => {
    initStravaWebhook();
    logger.log('info', 'server', `Server is listening on port ${CONFIG.PORT}`)
    console.log(`Server is listening on port ${CONFIG.PORT}, ENV: ${process.env.ENV}`);
    console.log("Google Callback url: " + CONFIG.GOOGLE_CALLBACK_URL)
}
);
