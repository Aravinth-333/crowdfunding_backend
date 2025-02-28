const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

// Create a new campaign
router.post("/create", async (req, res) => {
  try {
    const { campaignName, description, targetAmount, startDate, endDate } = req.body;

    const newCampaign = new Campaign({
      campaignName,
      description,
      targetAmount,
      startDate,
      endDate,
    });

    await newCampaign.save();
    res.status(201).json({ success: true, message: "Campaign created successfully!", campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create campaign", error });
  }
});

// Get all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching campaigns", error });
  }
});

// Get campaign by ID
router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }
    res.json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching campaign details", error });
  }
});

module.exports = router;
