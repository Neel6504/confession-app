import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { login } from "../api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem("token", data.token);
      navigate("/home"); // Redirect to Home after login
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container>
      <Card>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Button type="submit">Login</Button>
        </Form>
        <p>
          Don't have an account? <Button variant="link" onClick={() => navigate("/signup")}>Signup</Button>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
