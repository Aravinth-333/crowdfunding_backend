import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
        if (res.data.success) {
          setCampaign(res.data.campaign);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError("Failed to fetch campaign details.");
      }
    };
    fetchCampaign();
  }, [id]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : campaign ? (
        <div>
          <h1>{campaign.campaignName}</h1>
          <p><strong>Description:</strong> {campaign.description}</p>
          <p><strong>Target Amount:</strong> ${campaign.targetAmount}</p>
          <p><strong>Start Date:</strong> {new Date(campaign.startDate).toDateString()}</p>
          <p><strong>End Date:</strong> {new Date(campaign.endDate).toDateString()}</p>
        </div>
      ) : (
        <p>Loading campaign details...</p>
      )}
    </div>
  );
};

export default CampaignDetails;
