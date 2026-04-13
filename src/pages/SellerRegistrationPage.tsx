import React, { useState } from "react";
import SellerRegistration from "../components/seller/SellerRegistration";
import type { SellerFormData } from "../types";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const INITIAL_DATA: SellerFormData = {
  account: { fullName: "", username: "", email: "", password: "", confirmPassword: "" },
  shop: { shopName: "", phone: "", address: "", city: "", state: "", pin: "" },
  tax: { hasGst: true, gstin: "", eid: "" },
  compliance: { turnoverDeclaration: false, intraStateDeclaration: false, termsAccepted: false },
};

const steps = ["Account", "Shop", "Tax", "Compliance"];

const SellerRegistrationPage: React.FC<{

}> = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SellerFormData>(INITIAL_DATA);
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleComplete = async () => {
  await api.post("/auth/register-seller", formData);

  navigate("/auth/login");
};

  return (
    <div className="h-screen w-full flex font-sans">

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 text-white p-10 flex-col justify-between">

        <div>
          <h1 className="text-3xl font-bold">Sell on Zopcial</h1>
          <p className="mt-3 text-sm opacity-90">
            Join thousands of sellers growing their business online.
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <p>✔ Zero setup cost</p>
          <p>✔ Reach millions of customers</p>
          <p>✔ Fast onboarding</p>
          <p>✔ Secure payments</p>
        </div>

        <div className="text-xs opacity-80">
          Powered by Zopcial Commerce Platform
        </div>
      </div>

      {/* ───────── RIGHT PANEL (FORM) ───────── */}
      <div className="w-full md:w-1/2 bg-[#f7f7f7] flex items-center justify-center p-6">

        <div className="w-full max-w-[520px] bg-white shadow-sm border">

          {/* HEADER */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex justify-between text-xs">
              {steps.map((s, i) => (
                <span
                  key={i}
                  className={`${i <= step ? "text-blue-600 font-semibold" : "text-gray-400"
                    }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="p-5">
            <SellerRegistration
              data={formData}
              onChange={setFormData}
              step={step}
            />

            {/* BUTTONS */}
            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button disabled={step === 0} onClick={back}>
                Back
              </Button>

              {step < steps.length - 1 ? (
                <Button variant="contained" onClick={next}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" color="success" onClick={handleComplete}>
                  Submit
                </Button>
              )}
            </div>

            {/* LOGIN LINK */}
            <div className="text-center mt-4 text-xs text-gray-500">
              Already a seller?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default SellerRegistrationPage;