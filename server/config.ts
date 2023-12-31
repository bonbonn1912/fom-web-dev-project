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
  MONGO_DB_URL: string;
  SESSION_DB: string;
  NGROK_URL: string;
  STRAVA_WEBHOOK_VERIFY_TOKEN: string;
  STRAVA_API_BASE_URL: string;
  LOG_PATH: string;
  STRAVA_ACITIVITY_STREAMS_KEYS: string,
  ENV: string;
  GOOGLE_REDIRECT_PORT: string,
  GOOGLE_CALLBACK_URL: string,
  STRATO_SMTP_HOST: string,
  STRATO_SMTP_PORT: string,
  STRATO_MAIL: string,
  STRATO_MAIL_PASSWORD: string,
}

const GOOGLE_REDIRECT_PORT = process.env.ENV == "PROD" ? "5000" : "3001";

const CONFIG: Config = {
  STATIC_PATH: path.join(__dirname, "../build/client"),
  INDEX_PATH: path.resolve(__dirname, "../build/client", "index.html.gz"),
  PORT: process.env.PORT,
  STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID as string,
  STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  MONGO_DB_URL: process.env.MONGO_DB_URL as string,
  SESSION_DB: process.env.SESSION_DB as string,
  NGROK_URL: process.env.NGROK_URL as string,
  STRAVA_WEBHOOK_VERIFY_TOKEN: process.env.STRAVA_WEBHOOK_VERIFY_TOKEN as string,
  STRAVA_API_BASE_URL: process.env.STRAVA_API_BASE_URL as string,
  LOG_PATH: path.join(__dirname, "./logs"),
  STRAVA_ACITIVITY_STREAMS_KEYS: process.env.STRAVA_ACITIVITY_STREAMS_KEYS as string,
  ENV: process.env.NODE_ENV as string,
  GOOGLE_REDIRECT_PORT: GOOGLE_REDIRECT_PORT as string,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
  STRATO_SMTP_HOST: process.env.STRATO_SMTP_HOST as string,
  STRATO_SMTP_PORT: process.env.STRATO_SMTP_PORT as string,
  STRATO_MAIL: process.env.STRATO_MAIL as string,
  STRATO_MAIL_PASSWORD: process.env.STRATO_MAIL_PASSWORD as string,
};

export default CONFIG;
