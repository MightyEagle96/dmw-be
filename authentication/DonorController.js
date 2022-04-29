import DonorModel from "../models/DonorModel.js";
import ProjectModel from "../models/ProjectModel.js";

export const RecordDonation = async (req, res) => {
  //before recording

  //update the amount

  const project = await ProjectModel.findById(req.body.project);
  await ProjectModel.findByIdAndUpdate(req.body.project, {
    amountRealized: project.amountRealized + Number(req.body.amount),
  });

  await DonorModel.create(req.body);
  res.json({ alert: "Transaction successful" });
};
