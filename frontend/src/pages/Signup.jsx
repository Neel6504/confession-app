import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { signup } from "../api";
import "../styles/auth.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("Signup successful! Please login.");
      navigate("/home");
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-white font-weight-bold mb-3">Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Name"
            className="auth-input"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Form.Control
            type="email"
            placeholder="Email"
            className="auth-input"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Form.Control
            type="password"
            placeholder="Password"
            className="auth-input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Button type="submit" className="auth-button">
            Signup
          </Button>
        </Form>
        <p className="auth-text">
          Already have an account?{" "}
          <Button className="auth-link" onClick={() => navigate("/login")}>
            Login
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
