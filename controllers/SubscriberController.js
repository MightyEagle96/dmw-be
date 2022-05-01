import AccountModel from "../models/AccountModel.js";

export const ViewSubcribers = async (req, res) => {
  const subscribers = await AccountModel.find(req.query);

  res.json({ subscribers });
};
