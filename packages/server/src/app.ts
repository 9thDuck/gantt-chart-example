import dotenv from "dotenv";
import express from "express";
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/", (_, res) => {
 res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(process.env.PORT, () => {
 console.log(`Server is running on port ${process.env.PORT}`);
});
