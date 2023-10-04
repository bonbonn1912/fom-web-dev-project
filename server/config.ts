import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

interface Config {
  PORT: string | undefined;
  STATIC_PATH: string;
  INDEX_PATH: string;
  STRAVA_CLIENT_ID: string;
  STRAVA_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

const CONFIG: Config = {
  STATIC_PATH: path.join(__dirname, "../build/client"),
  INDEX_PATH: path.resolve(__dirname, "../build/client", "index.html"),
  PORT: process.env.PORT,
  STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID as string,
  STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
};

export default CONFIG;
