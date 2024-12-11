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

 config = {
  PORT: port,
 };
};
