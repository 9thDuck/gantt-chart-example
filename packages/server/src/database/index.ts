import { getAppConfig } from "../../config";

import mongoose from "mongoose";

export const connectToDatabase = async () => {
 const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, DB_NAME } =
  getAppConfig();
 try {
  await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
   authSource: "admin",
   user: MONGO_INITDB_ROOT_USERNAME,
   pass: MONGO_INITDB_ROOT_PASSWORD,
  });
  console.log("Successfully connected to MongoDB");
 } catch (error) {
  console.error("MongoDB connection error:", error);
  throw error;
 }
};
