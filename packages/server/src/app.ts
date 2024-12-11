import express from "express";
import path from "path";
import { getAppConfig, setupAppConfig } from "../config";

const app = express();


app.use(express.json());

app.use(express.static("public"));

app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

setupAppConfig();

const { PORT } = getAppConfig();

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
