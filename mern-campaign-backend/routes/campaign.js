const express = require('express');
const Campaign = require('../models/Campaign');
const router = express.Router();

// Create Campaign
router.post('/create', async (req, res) => {
  const { title, description, owner } = req.body;
  try {
    const campaign = new Campaign({ title, description, owner });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Error creating campaign" });
  }
});

// Get Campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('owner', 'name');
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaigns" });
  }
});

module.exports = router;
