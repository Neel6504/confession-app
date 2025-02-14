import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { login } from "../api";
import "../styles/auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-white font-weight-bold mb-3">Login</h2>
        <Form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </Form>
        <p className="auth-text">
          Don't have an account?{" "}
          <Button className="auth-link" onClick={() => navigate("/signup")}>
            Signup
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
