import express from "express";
import path from "path";
import { getAppConfig, setupAppConfig } from "../config";
import { connectToDatabase } from "./database";

const app = express();


app.use(express.json());

app.use(express.static("public"));

app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

setupAppConfig();

const { PORT } = getAppConfig();

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
