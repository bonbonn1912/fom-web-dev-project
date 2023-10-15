import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CONFIG from "./config";
import authRouter from "./routes/auth";
import setupRouter from "./routes/setup";
import userInfoRouter from "./routes/user";
require("./handlers/strategies/session"); // Damit Session geladen wird

const app = express();

app.use(express.static(CONFIG.STATIC_PATH));
app.use('/images', express.static('images'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);
app.use(setupRouter);
app.use(userInfoRouter);
app.get("/*", (req: Request, res: Response) => {
  res.sendFile(CONFIG.INDEX_PATH);
});


app.listen(CONFIG.PORT, () =>
  console.log("Server listening on Port:" + CONFIG.PORT)
);