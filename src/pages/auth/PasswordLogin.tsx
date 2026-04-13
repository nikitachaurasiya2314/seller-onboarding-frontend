import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

const PasswordLogin: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      console.log("LOGIN RESPONSE:", res.data);

      const { token } = res.data;

      localStorage.setItem("token", token);
      navigate("/dashboard");

    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-[#f0f2f5] min-h-screen font-sans">

      {/* HEADER */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <h1 className="text-xl text-gray-600 flex items-center gap-1 font-light tracking-wide">
          <span className="font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text italic text-lg pr-1">
            Zopcial
          </span>
          | Staff Portal
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-white w-full max-w-sm shadow-sm border border-gray-200 p-6 flex flex-col gap-4">

        {/* TITLE */}
        <Typography
          variant="subtitle2"
          className="text-center font-medium text-blue-600 border-b border-gray-100 pb-2 uppercase tracking-wide"
        >
          Secure Password Login
        </Typography>

        {/* ERROR */}
        {error && (
          <Typography className="text-center text-red-500 text-xs">
            {error}
          </Typography>
        )}

        {/* EMAIL */}
        <TextField
          label="Email Address"
          size="small"
          fullWidth
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="admin@zopcial.com"
        />

        {/* PASSWORD */}
        <TextField
          label="Password"
          size="small"
          fullWidth
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        {/* BUTTON */}
        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={handleLogin}
          disabled={loading || !form.email || !form.password}
        >
          {loading ? (
            <Box className="flex items-center gap-2">
              <CircularProgress size={18} color="inherit" />
              Logging in...
            </Box>
          ) : (
            "Login"
          )}
        </Button>

        {/* SWITCH LOGIN */}
        <Box className="flex flex-col items-center gap-2 pt-2 mt-2 border-t border-gray-100">

          <Typography className="text-gray-500 text-xs">
            Login using OTP instead?
          </Typography>

          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline text-sm"
            onClick={() => navigate("/login")}
          >
            Switch to OTP Login
          </span>

        </Box>

        {/* REGISTER LINK */}
        <Box className="flex items-center justify-center pt-1">
          <Typography className="text-gray-500 text-xs">
            New seller?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </Typography>
        </Box>

      </div>
    </div>
  );
};

export default PasswordLogin;