import express from "express";
import {
  CreateAccount,
  IsLoggedIn,
  Login,
  RestrictTo,
} from "./authentication/AuthController.js";
import { ViewSubcribers } from "./controllers/SubscriberController.js";

const router = express.Router();

router
  .get("/", (req, res) => res.json({ message: "Hello" }))
  .post("/login", Login)
  .post("/createAccount", CreateAccount)

  .get("/viewSubscribers", IsLoggedIn, RestrictTo("admin"), ViewSubcribers);

export default router;
