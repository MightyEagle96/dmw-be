import express from "express";
import { CreateAccount, Login } from "./authentication/AuthController.js";

const router = express.Router();

router
  .get("/", (req, res) => res.json({ message: "Hello" }))
  .post("/login", Login)
  .post("/createAccount", CreateAccount);

export default router;
