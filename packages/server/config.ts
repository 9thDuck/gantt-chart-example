import dotenv from "dotenv";
dotenv.config();
import { Config } from "./src/types/config";
import { DEFAULT_PORT } from "./src/constants/app-defaults";

let config: Config;

export const getAppConfig = () => {
 return Object.assign({}, config);
};

export const setupAppConfig = () => {
 const port = Number(process.env.PORT || DEFAULT_PORT);
 const dbName = process.env.DB_NAME;
 const mongoRootUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
 const mongoRootPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

 if(!dbName || !mongoRootUsername || !mongoRootPassword) {
    throw new Error("Missing environment variables, check .env file. DB_NAME, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD are required.");
 }


 config = {
  PORT: port,
  DB_NAME: dbName,
  MONGO_INITDB_ROOT_USERNAME: mongoRootUsername,
  MONGO_INITDB_ROOT_PASSWORD: mongoRootPassword,
 };
};
