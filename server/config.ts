import * as dotenv from 'dotenv';
import path from 'path'
dotenv.config();

interface Config {
  PORT: string | undefined;
  STATIC_PATH: string,
  INDEX_PATH: string,
}

const CONFIG: Config = {
  STATIC_PATH: path.join(__dirname, '../build/client'),
  INDEX_PATH: path.resolve(__dirname, '../build/client', 'index.html'),
  PORT: process.env.PORT
};

export default CONFIG;