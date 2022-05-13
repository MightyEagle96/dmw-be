import AccountModel from "../models/AccountModel.js";
import DepositModel from "../models/DepositModel.js";
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

export const MakeDeposit = async (req, res) => {
  try {
    req.body.subscriber = req.account._id;
    req.body.depositDate = Date.now();
    await DepositModel.create(req.body);
    res.status(201).json({
      title: "Deposit Made",
      message:
        "Your deposit has been made and will later be approved by the administrator",
    });
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const SubscriberRecords = async (req, res) => {
  const records = await DepositModel.find(req.query).populate("subscriber");
  // .reverse();
  res.json({ records: records.reverse() });
};

export const SubscriberTotal = async (req, res) => {
  try {
    let total = 0;
    const records = await DepositModel.find({
      subscriber: req.account._id,
      approved: true,
    });

    records.forEach((record) => (total += record.amount));
    res.json({ total });
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const PendingTransactions = async (req, res) => {
  try {
    let total = 0;

    const records = await DepositModel.find({
      subscriber: req.account._id,
      approved: false,
    });

    total = records.length;
    res.json({ total });
  } catch (error) {
    ErrorHandler(error, res);
  }
};
