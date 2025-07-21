// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
  import { toast } from "react-toastify";

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

// Inside your try/catch:
try {
  await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form, {
    withCredentials: true,
  });
  toast.success("Login successful!");
  navigate("/dashboard");
} catch (err) {
  toast.error(err.response?.data?.msg || "Login failed!");
}

    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
                <p style={{ textAlign: "center", marginTop: "10px" }}>
                    Don't have an account? <Link to="/">Register</Link>
                </p>
            </form>
        </div>
    );
}
