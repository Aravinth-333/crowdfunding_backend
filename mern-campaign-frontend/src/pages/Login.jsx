import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To disable button during request
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // **Client-Side Validation**
    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true); // Disable button during login request

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="login-container">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="login-card">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Join the movement and support the causes you love</p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </Form.Group>

            <Button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <p className="signup-text">
            Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
