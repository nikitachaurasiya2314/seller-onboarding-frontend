import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Invalid OTP");
      }

      localStorage.setItem("token", result.token);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
          Verify OTP
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter the OTP sent to your email
        </Typography>

        <TextField
          fullWidth
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          margin="normal"
          inputProps={{
            maxLength: 6,
            style: { textAlign: "center", letterSpacing: "8px", fontSize: "20px" },
          }}
        />

        {error && (
          <Typography color="error" variant="caption">
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            py: 1.2,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Paper>
    </Box>
  );
};

export default VerifyOtp;