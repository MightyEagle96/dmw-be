import mongoose from "mongoose";
const { Schema, model } = mongoose;

const depositSchema = new Schema({
  amount: Number,
  approved: { type: Boolean, default: false },
  subscriber: { type: Schema.Types.ObjectId, ref: "Account" },
  depositDate: { type: Date },
  approvedDate: { type: Date },
});

export default model("Deposit", depositSchema);
