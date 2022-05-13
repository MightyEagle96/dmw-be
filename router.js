import express from "express";
import {
  CreateAccount,
  IsLoggedIn,
  Login,
  RestrictTo,
} from "./authentication/AuthController.js";
import { GetSubscriber, TotalAmount } from "./controllers/AdminController.js";
import {
  AdminNotifications,
  ApproveDeposit,
} from "./controllers/NotificationController.js";
import {
  CreateSubscriber,
  MakeDeposit,
  PendingTransactions,
  SubscriberRecords,
  SubscriberTotal,
  ViewSubcribers,
} from "./controllers/SubscriberController.js";

const router = express.Router();

router
  .get("/", (req, res) => res.json({ message: "Hello" }))
  .post("/login", Login)
  .post("/createAccount", CreateAccount)

  .get("/viewSubscribers", IsLoggedIn, RestrictTo("admin"), ViewSubcribers)
  .post("/addNewSubscriber", IsLoggedIn, RestrictTo("admin"), CreateSubscriber)

  .post("/makeDeposit", IsLoggedIn, RestrictTo("subscriber"), MakeDeposit)
  .get(
    "/subscriberRecords",
    IsLoggedIn,
    RestrictTo("subscriber", "admin"),
    SubscriberRecords
  )

  .get(
    "/adminNotifications",
    IsLoggedIn,
    RestrictTo("admin"),
    AdminNotifications
  )
  .patch("/approveDeposit/:id", IsLoggedIn, RestrictTo("admin"), ApproveDeposit)

  .get(
    "/subscriberTotal",
    IsLoggedIn,
    RestrictTo("subscriber"),
    SubscriberTotal
  )
  .get(
    "/pendingTransactions",
    IsLoggedIn,
    RestrictTo("subscriber"),
    PendingTransactions
  )

  .get("/totalAmount", IsLoggedIn, RestrictTo("admin"), TotalAmount)
  .get("/subscriber/:id", IsLoggedIn, RestrictTo("admin"), GetSubscriber);

export default router;
