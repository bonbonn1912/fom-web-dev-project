import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CONFIG from "./config";

const app = express();

app.use(express.static(CONFIG.STATIC_PATH));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/ping", (req: Request, res: Response) =>{
    res.json({"message" : "pong"})
})

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(CONFIG.INDEX_PATH);
});

app.listen(CONFIG.PORT, () =>
  console.log("Server listening on Port:" + CONFIG.PORT)
);
