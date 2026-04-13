import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import PulseStream from "./components/dashboard/PulseStream";

import DashboardPage from "./pages/DashboardPage";
import SellerRegistrationPage from "./pages/SellerRegistrationPage";
import OtpLogin from "./pages/auth/OtpLogin";
import PasswordLogin from "./pages/auth/PasswordLogin";
import VerifyOtp from "./pages/VerifyOtp";

import ProtectedRoute from "./routes/ProtectedRoute";

const DashboardShell: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="bg-neutral-50 text-neutral-900 antialiased min-h-screen">
    <Sidebar />
    <Header />
    <main className="pl-[220px] xl:pr-72 pt-16 min-h-screen">
      {children ?? <DashboardPage />}
    </main>
    <PulseStream />
  </div>
);

const App: React.FC = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<OtpLogin />} />
      <Route path="/auth/login" element={<PasswordLogin />} />
      <Route path="/register" element={<SellerRegistrationPage />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardShell />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
};

export default App;