import express from "express";
import path from "path";
import { getAppConfig } from "../config";
import { connectToDatabase } from "./database";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/", (_, res) => {
 res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/api", tasksRouter);

const { PORT } = getAppConfig();

connectToDatabase().then(() => {
 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 });
});
