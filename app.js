/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { originUrl } from "./services.js";
import { ConnectDatabase } from "./database.js";
import router from "./router.js";

ConnectDatabase();
dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(cors({ origin: originUrl, credentials: true }));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(router);
const PORT = process.env.PORT || 3090;

app.listen(PORT, () => {
  console.log("App is listening");
});
