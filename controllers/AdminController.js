//first thing show the total amount in savings
import AccountModel from "../models/AccountModel.js";
import DepositModel from "../models/DepositModel.js";

export const TotalAmount = async (req, res) => {
  let totalAmount = 0;
  const subscribers = await DepositModel.find({ approved: true });

  subscribers.forEach((subscriber) => (totalAmount += subscriber.amount));
  res.json({ totalAmount });
};

export const TotalSubscribers = async (req, res) => {
  const subscribers = await AccountModel.find({ role: "subscriber" });
  res.json({ subscribers });
};

export const GetSubscriber = async (req, res) => {
  const subscriber = await AccountModel.findById(req.params.id);
  res.json({ subscriber });
};
