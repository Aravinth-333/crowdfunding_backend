require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaign');
const campaignRoutes = require("./routes/campaignRoutes");

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Failed:", err));
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    console.log("Create Campaign button clicked!"); // Debugging step
  
    if (!campaignName || !description || !targetAmount || !startDate || !endDate) {
      setError("Please fill out all fields.");
      console.log("Form validation failed."); // Debugging step
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:5000/api/campaigns/create", {
        campaignName,
        description,
        targetAmount,
        startDate,
        endDate,
      });
  
      console.log("API Response:", res.data); // Debugging step
  
      if (res.data.success) {
        setSuccess("Campaign created successfully!");
        setError("");
        console.log("Navigating to /campaigns in 2 seconds...");
        setTimeout(() => {
          navigate("/campaigns");
        }, 2000);
      } else {
        setError(res.data.message);
        console.log("API Error:", res.data.message);
      }
    } catch (err) {
      console.error("API Request Failed:", err);
      setError("Failed to create campaign. Please try again.");
    }
  };
  
  
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
