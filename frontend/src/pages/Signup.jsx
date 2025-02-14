import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { signup } from "../api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("Signup successful! Please login.");
      navigate("/home"); // Redirect to login after signup
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <Container>
      <Card>
        <h2>Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
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
          <Button type="submit">Signup</Button>
        </Form>
        <p>
          Already have an account? <Button variant="link" onClick={() => navigate("/login")}>Login</Button>
        </p>
      </Card>
    </Container>
  );
};

export default Signup;
