import express from "express";
import {
  CreateAccount,
  IsLoggedIn,
  Login,
  RestrictTo,
} from "./authentication/AuthController.js";
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
    RestrictTo("subscriber"),
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
  );

export default router;
