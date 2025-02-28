const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
