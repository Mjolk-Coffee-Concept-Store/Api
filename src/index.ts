import express from "express";
import "reflect-metadata";
import { ENV } from "./config/env";

const app = express();
const PORT = ENV.APP_PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to ${process.env.APP_NAME}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
