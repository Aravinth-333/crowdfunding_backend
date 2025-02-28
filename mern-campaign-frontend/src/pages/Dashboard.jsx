import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
      <Container>
        <h1 className="text-center mb-4" style={{ color: "#007bff" }}>Dashboard</h1>
        <p className="text-center mb-4">View your campaigns and contributions here.</p>
        
        <Row className="justify-content-center">
          {/* Create Campaign Box */}
          <Col md={4}>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", textAlign: "center" }}>
              <Card.Body>
                <h5 className="mb-3" style={{ color: "#007bff" }}>Create New Campaign</h5>
                <p>Start a new crowdfunding campaign and reach your goals.</p>
                <Button 
                  variant="primary" 
                  className="w-100" 
                  style={{ borderRadius: "10px" }}
                  onClick={() => navigate("/create-campaign")}
                >
                  Create Campaign
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Example Placeholder for Active Campaigns */}
          <Col md={4}>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", textAlign: "center" }}>
              <Card.Body>
                <h5 className="mb-3" style={{ color: "#007bff" }}>Active Campaigns</h5>
                <p>Check your ongoing campaigns and track progress.</p>
                <Button 
                  variant="success" 
                  className="w-100" 
                  style={{ borderRadius: "10px" }}
                  onClick={() => navigate("/campaigns")}
                >
                  View Campaigns
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
