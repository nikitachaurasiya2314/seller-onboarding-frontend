import React, { useState, } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import type {
  SellerFormData,
  AccountInfo,
  ShopDetails,
  TaxInfo,
} from "../../types";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";


export const SellerRegistration: React.FC<{
  data: SellerFormData;
  onChange: (data: SellerFormData) => void;
  step: number;
  onSubmit?: () => void;
}> = ({ data, onChange, onSubmit, step }) => {
  const navigate = useNavigate();
  const [locationLoading, setLocationLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gstLoading, setGstLoading] = useState(false);
  const [gstError, setGstError] = useState("");
  const [panLoading, setPanLoading] = useState(false);
  const [panError, setPanError] = useState("");

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const setAccount = (field: keyof AccountInfo, value: string) => {
    onChange({ ...data, account: { ...data.account, [field]: value } });
  };

  const setShop = (field: keyof ShopDetails, value: string) => {
    onChange({ ...data, shop: { ...data.shop, [field]: value } });
  };

  const setTax = (field: keyof TaxInfo, value: string | boolean) => {
    onChange({ ...data, tax: { ...data.tax, [field]: value } });
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);
    setShop("address", "Locating...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          if (data && data.display_name) {
            setShop("address", data.display_name);
          } else {
            setShop(
              "address",
              `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            );
          }
        } catch (err) {
          setShop("address", `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        setLocationLoading(false);
      },
      (err) => {
        alert(
          "Unable to retrieve location. Please allow location permissions.",
        );
        setShop("address", "");
        setLocationLoading(false);
      },
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <Typography
      variant="subtitle2"
      className="text-blue-500 font-semibold mb-3 mt-6 first:mt-0"
    >
      {title}
    </Typography>
  );

  const Label = ({ text }: { text: string }) => (
    <Typography
      variant="caption"
      className="text-gray-700 font-semibold mb-1 block"
    >
      {text}
    </Typography>
  );

  const handleVerifyPan = async () => {
    try {
      setPanLoading(true);
      setPanError("");

      const res = await fetch("http://localhost:5000/api/pan/verify-pan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pan: data.tax.pan }),
      });

      const result = await res.json();

      if (!res.ok || !result.valid) {
        throw new Error(result.error || "Invalid PAN");
      }

      // ✅ Auto-fill name
      setAccount("fullName", result.name);

      setSnackbar({
        open: true,
        message: "PAN Verified Successfully",
        severity: "success",
      });

    } catch (err: any) {
      setPanError(err.message);
      setSnackbar({
        open: true,
        message: err.message || "PAN verification failed",
        severity: "error",
      });
    } finally {
      setPanLoading(false);
    }
  };

  const handleVerifyGst = async () => {
    try {
      setGstLoading(true);
      setGstError("");

      const res = await fetch("http://localhost:5000/api/gst/verify-gst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gstin: data.tax.gstin }),
      });

      const result = await res.json();

      if (!res.ok || !result.valid) {
        throw new Error(result.error || "Invalid GST");
      }

      setShop("shopName", result.businessName);
      setSnackbar({
        open: true,
        message: "GST Verified Successfully",
        severity: "success",
      });

    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "GST verification failed",
        severity: "error",
      });
    } finally {
      setGstLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (data.account.password !== data.account.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!data.account.email || !data.shop.shopName || !data.shop.phone) {
        setError("Please fill all required fields");
        return;
      }

      const payload = {
        fullName: data.account.fullName,
        email: data.account.email,
        password: data.account.password,

        shopName: data.shop.shopName,
        phone: data.shop.phone,
        address: data.shop.address,

        hasGst: data.tax.hasGst,
        gstin: data.tax.hasGst ? data.tax.gstin : null,
        eid: !data.tax.hasGst ? data.tax.eid : null,
        pan: data.tax.pan || null,

      };
      if (data.tax.hasGst && data.tax.gstin && data.tax.pan) {
        const panFromGst = data.tax.gstin.substring(2, 12);

        if (panFromGst !== data.tax.pan) {
          setError("PAN does not match GST number");
          return;
        }
      }

      const res = await fetch("http://localhost:5000/api/auth/register-seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to register");
      }

      console.log("SUCCESS:", result);

      navigate("/verify-otp", {
        state: { email: data.account.email },
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="w-full">

        {/* STEP 0 — ACCOUNT */}
        {step === 0 && (
          <Box className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
            <SectionTitle title="Create your account" />

            <TextField label="Full Name" fullWidth size="small"
              value={data.account.fullName}
              onChange={(e) => setAccount("fullName", e.target.value)}
            />

            <TextField label="Username" fullWidth size="small"
              value={data.account.username}
              onChange={(e) => setAccount("username", e.target.value)}
            />

            <TextField label="Email" type="email" fullWidth size="small"
              value={data.account.email}
              onChange={(e) => setAccount("email", e.target.value)}
            />

            <TextField label="Password" type="password" fullWidth size="small"
              value={data.account.password}
              onChange={(e) => setAccount("password", e.target.value)}
            />

            <TextField label="Confirm Password" type="password" fullWidth size="small"
              value={data.account.confirmPassword}
              onChange={(e) => setAccount("confirmPassword", e.target.value)}
            />
          </Box>
        )}

        {/* STEP 1 — SHOP */}
        {step === 1 && (
          <Box className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
            <SectionTitle title="Shop details" />

            <TextField label="Shop Name" fullWidth size="small"
              value={data.shop.shopName}
              onChange={(e) => setShop("shopName", e.target.value)}
            />

            <TextField label="Phone Number" fullWidth size="small"
              value={data.shop.phone}
              onChange={(e) => setShop("phone", e.target.value)}
            />
          </Box>
        )}

        {/* STEP 2 — TAX */}
        {step === 2 && (
          <Box className="bg-white border rounded-xl p-6 shadow-sm space-y-5">

            {/* PAN */}
            <Box>
              <SectionTitle title="PAN Verification" />
              <Box className="flex gap-2">
                <TextField
                  fullWidth size="small" label="PAN Number"
                  value={data.tax.pan || ""}
                  onChange={(e) => setTax("pan", e.target.value.toUpperCase())}
                />
                <Button variant="contained"
                  onClick={handleVerifyPan}
                  disabled={panLoading || !data.tax.pan}
                >
                  {panLoading ? "..." : "Verify"}
                </Button>
              </Box>
              {panError && <Typography color="error" variant="caption">{panError}</Typography>}
            </Box>

            {/* GST */}
            <Box>
              <SectionTitle title="GST Details" />

              <FormControlLabel
                control={
                  <Switch
                    checked={data.tax.hasGst}
                    onChange={(e) => setTax("hasGst", e.target.checked)}
                  />
                }
                label="I have GST"
              />

              {data.tax.hasGst ? (
                <Box className="flex gap-2 mt-2">
                  <TextField
                    fullWidth size="small" label="GST Number"
                    value={data.tax.gstin}
                    onChange={(e) => setTax("gstin", e.target.value.toUpperCase())}
                  />
                  <Button variant="contained"
                    onClick={handleVerifyGst}
                    disabled={gstLoading || !data.tax.gstin}
                  >
                    {gstLoading ? "..." : "Verify"}
                  </Button>
                </Box>
              ) : (
                <Box className="mt-3 bg-yellow-50 border border-yellow-200 p-4 rounded-lg space-y-3">

                  <Typography variant="body2" className="font-semibold text-yellow-800">
                    GST is mandatory for e-commerce sellers
                  </Typography>

                  <Typography variant="caption" className="text-yellow-700 block">
                    If you don’t have GST, you must register and generate an Enrollment ID (EID)
                    from the GST portal. This is required to sell legally in India.
                  </Typography>

                  <Button
                    component="a"
                    href="https://www.gst.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    size="small"
                  >
                    Create EID on GST Portal →
                  </Button>

                  <TextField
                    fullWidth
                    size="small"
                    label="Enter your EID"
                    value={data.tax.eid}
                    onChange={(e) => setTax("eid", e.target.value.toUpperCase())}
                  />
                </Box>
              )}
            </Box>

          </Box>
        )}

        {/* STEP 3 — ADDRESS + SUBMIT */}
        {step === 3 && (
          <Box className="bg-white border rounded-xl p-6 shadow-sm space-y-4">

            <SectionTitle title="Shop Address" />

            <Box className="w-full h-44 rounded-lg overflow-hidden border">
              <iframe
                title="map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${coords ? coords.lat : 22.7196},${coords ? coords.lng : 75.8577}&z=${coords ? 17 : 5}&output=embed`}
              />
            </Box>

            <Button
              variant="outlined"
              onClick={handleUseLocation}
              disabled={locationLoading}
            >
              {locationLoading ? "Fetching..." : "Use Current Location"}
            </Button>

            <TextField
              fullWidth size="small"
              label="Address"
              value={data.shop.address}
              onChange={(e) => setShop("address", e.target.value)}
            />

            {error && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              className="py-3 font-semibold"
            >
              {loading ? "Sending OTP..." : "Register & Continue"}
            </Button>
          </Box>
        )}

      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );


};

export default SellerRegistration;
