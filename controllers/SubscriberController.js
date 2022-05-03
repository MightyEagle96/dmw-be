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
  res.json({ records });
};
