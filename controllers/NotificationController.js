import DepositModel from "../models/DepositModel.js";
import { ErrorHandler } from "./ErrorController.js";
export const AdminNotifications = async (req, res) => {
  const notifications = await DepositModel.find({ approved: false }).populate(
    "subscriber"
  );

  res.json({ notifications: notifications.reverse() });
};

export const ApproveDeposit = async (req, res) => {
  try {
    await DepositModel.findOneAndUpdate(
      { _id: req.params.id },
      { approved: true, approvedDate: Date.now() }
    );

    res.json({
      title: "Deposit Approved",
      message: "You have approved the deposit for this subscriber",
    });
  } catch (error) {
    ErrorHandler(error, res);
  }
};
