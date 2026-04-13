import React, { useState } from "react";
import { TextField, Button, Box, Typography, Switch, FormControlLabel } from "@mui/material";
import { api } from "../api";
import { useNavigate } from "react-router-dom";


const OtpLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // STEP 1: Send OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setMessage("");
      // Uncomment when backend is ready!
      await api.post("/auth/send-otp", { email });
      setStep("otp");
      setMessage("Test OTP sent successfully");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Uncomment when backend is ready!

      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");

    } catch (err: any) {
      setMessage(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-[#f0f2f5] min-h-screen font-sans">
      <div className="mb-4 flex items-center justify-center gap-2">
        <h1 className="text-xl text-gray-600 flex items-center gap-1 font-light tracking-wide">
          <span className="font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text italic text-lg pr-1">Zopcial</span>
          | Seller Portal
        </h1>
      </div>

      <div className="bg-white w-full max-w-sm shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
        <Typography variant="subtitle2" className="text-center font-medium text-blue-600 border-b border-gray-100 pb-2 uppercase tracking-wide">
          Secure OTP Login
        </Typography>

        {step === "email" && (
          <Box className="flex flex-col gap-4 mt-2">
            <TextField
              label="Email Address"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seller@domain.com"
            />
            <Button variant="contained" disableElevation fullWidth color="primary" onClick={handleSendOtp} disabled={loading || !email}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </Box>
        )}

        {step === "otp" && (
          <Box className="flex flex-col gap-4 mt-2">
            <Typography variant="caption" className="text-gray-500 text-center -mt-2">
              Sent magically to: {email}
            </Typography>
            <TextField
              label="One Time Password"
              size="small"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6 digit OTP"
              type="password"
              slotProps={{ htmlInput: { maxLength: 6 } }}
            />
            <Button variant="contained" disableElevation fullWidth color="primary" onClick={handleVerifyOtp} disabled={loading || !otp}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </Box>
        )}

        {message && (
          <Typography variant="caption" className="text-center mt-2 text-emerald-600 font-medium">
            {message}
          </Typography>
        )}

        <Box className="flex items-center justify-center pt-2 mt-2 border-t border-gray-100">
          <Typography variant="caption" className="text-gray-500">
            New to Zopcial?{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={() => navigate("/register")}>
              Register as a Seller
            </span>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default OtpLogin;