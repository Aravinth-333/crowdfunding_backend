import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Card, Row, Col } from "react-bootstrap";

const CreateCampaign = () => {
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!campaignName || !description || !targetAmount || !startDate || !endDate) {
      setError("Please fill out all fields.");
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
      if (res.data.success) {
        setSuccess("Campaign created successfully!");
        setError("");
        setTimeout(() => {
          navigate("/campaigns");
        }, 2000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Failed to create campaign. Please try again.");
    }
  };

  return (
    <div 
      style={{ 
        background: "#f8f9fa", 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: "600px", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
          <h3 className="text-center mb-4" style={{ color: "#007bff" }}>Create a New Campaign</h3>
          <p className="text-center mb-4">Fill out the details to start a campaign</p>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleCreateCampaign}>
            <Form.Group className="mb-3">
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter campaign name" 
                value={campaignName} 
                onChange={(e) => setCampaignName(e.target.value)} 
                required 
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Enter campaign description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Target Amount</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Enter target amount" 
                    value={targetAmount} 
                    onChange={(e) => setTargetAmount(e.target.value)} 
                    required 
                    style={{ borderRadius: "10px" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    required 
                    style={{ borderRadius: "10px" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                required 
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100" 
              style={{ borderRadius: "10px", backgroundColor: "#007bff", border: "none"}}
              onClick={() => console.log("Submit Button Clicked!")}
            >
              Create Campaign
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default CreateCampaign;