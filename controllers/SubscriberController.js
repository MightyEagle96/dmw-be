import AccountModel from "../models/AccountModel.js";
import { ErrorHandler } from "./ErrorController.js";

export const ViewSubcribers = async (req, res) => {
  const subscribers = await AccountModel.find(req.query);

  res.json({ subscribers });
};

export const CreateSubscriber = async (req, res) => {
  try {
    await AccountModel.create(req.body);
    res.status(201).json({ title: "success", message: "New Subscriber added" });
  } catch (error) {
    ErrorHandler(error, res);
  }
};
