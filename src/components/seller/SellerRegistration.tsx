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
  onSubmit?: () => void;
}> = ({ data, onChange, onSubmit }) => {
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
      <Box className="w-full flex flex-col gap-0">
        {/* ACCOUNT INFO */}
        <Box>
          <SectionTitle title="Account Info" />

          <Box className="flex flex-col gap-3">
            <Box>
              <Label text="Full Name" />
              <TextField
                size="small"
                fullWidth
                value={data.account.fullName}
                onChange={(e) => setAccount("fullName", e.target.value)}
              />
            </Box>
            <Box>
              <Label text="Username" />
              <TextField
                size="small"
                fullWidth
                value={data.account.username}
                onChange={(e) => setAccount("username", e.target.value)}
              />
            </Box>
            <Box>
              <Label text="Email" />
              <TextField
                size="small"
                fullWidth
                type="email"
                value={data.account.email}
                onChange={(e) => setAccount("email", e.target.value)}
              />
            </Box>
            <Box>
              <Label text="Password" />
              <TextField
                size="small"
                fullWidth
                type="password"
                value={data.account.password}
                onChange={(e) => setAccount("password", e.target.value)}
              />
            </Box>
            <Box>
              <Label text="Confirm Password" />
              <TextField
                size="small"
                fullWidth
                type="password"
                value={data.account.confirmPassword}
                onChange={(e) => setAccount("confirmPassword", e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/* SHOP DETAILS */}
        <Box>
          <SectionTitle title="Shop Details" />
          <Box className="flex flex-col gap-3">
            <Box>
              <Label text="Shop Name" />
              <TextField
                size="small"
                fullWidth
                value={data.shop.shopName}
                onChange={(e) => setShop("shopName", e.target.value)}
              />
            </Box>
            <Box>
              <Label text="Phone Number" />
              <TextField
                size="small"
                fullWidth
                value={data.shop.phone}
                onChange={(e) => setShop("phone", e.target.value)}
                slotProps={{ htmlInput: { maxLength: 10 } }}
              />
            </Box>
          </Box>
        </Box>

        {/* SHOP ADDRESS */}
        <Box>
          <SectionTitle title="Shop Address" />
          <Box className="flex flex-col gap-2">
            {/* Mock Map Image / Iframe container */}
            <Box className="w-full h-40 bg-gray-100 border border-gray-200 relative overflow-hidden flex items-center justify-center">
              <iframe
                title="map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${coords ? coords.lat : 22.7196},${coords ? coords.lng : 75.8577}&z=${coords ? 17 : 5}&output=embed`}
              />
            </Box>
            <Button
              variant="contained"
              disableElevation
              onClick={handleUseLocation}
              disabled={locationLoading}
              className="self-start text-[10px] py-1 px-3 min-w-0 bg-[#4a4a4a] hover:bg-[#333] text-white normal-case rounded-sm"
            >
              {locationLoading ? "Fetching..." : "Use Current Location"}
            </Button>
            <Box className="mt-2">
              <TextField
                size="small"
                fullWidth
                placeholder="Start typing address..."
                value={data.shop.address}
                onChange={(e) => setShop("address", e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/* PAN */}
        <Box>
          <SectionTitle title="PAN Verification" />

          <Box className="flex flex-col gap-2">
            <Label text="PAN Number" />

            <Box className="flex gap-2 items-center">
              <TextField
                size="small"
                fullWidth
                value={data.tax.pan || ""}
                onChange={(e) =>
                  setTax("pan", e.target.value.toUpperCase())
                }
                placeholder="ABCDE1234F"
                slotProps={{
                  htmlInput: { maxLength: 10 }
                }}
              />

              <Button
                variant="outlined"
                size="small"
                onClick={handleVerifyPan}
                disabled={panLoading || !data.tax.pan}
              >
                {panLoading ? "..." : "Verify"}
              </Button>
            </Box>

            {panError && (
              <Typography color="error" variant="caption">
                {panError}
              </Typography>
            )}
          </Box>
        </Box>

        {/* GST */}
        <Box>
          <SectionTitle title="GST" />
          <Box className="flex flex-col">
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  color="primary"
                  checked={data.tax.hasGst}
                  onChange={(e) => setTax("hasGst", e.target.checked)}
                />
              }
              label={
                <span className="text-xs font-semibold text-gray-800">
                  I have GST
                </span>
              }
              className="mb-1 ml-0"
            />

            {data.tax.hasGst ? (
              <Box className="flex flex-col gap-2">
                <Label text="GST Number" />

                <Box className="flex gap-2 items-center">
                  <TextField
                    size="small"
                    fullWidth
                    value={data.tax.gstin}
                    onChange={(e) =>
                      setTax("gstin", e.target.value.toUpperCase())
                    }
                    placeholder="Enter GSTIN"
                    slotProps={{ htmlInput: { maxLength: 15 } }}
                  />

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleVerifyGst}
                    disabled={gstLoading || !data.tax.gstin}
                    className="whitespace-nowrap"
                  >
                    {gstLoading ? "..." : "Verify"}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box className="flex flex-col gap-2 mt-2">
                <Box className="bg-amber-50 border border-amber-200 p-3 rounded-md">
                  <Typography
                    variant="caption"
                    className="font-semibold text-amber-800 block mb-1"
                  >
                    GST is mandatory for e-commerce sellers
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-amber-700 block leading-tight"
                  >
                    If you don't have GST, you must create an Enrollment ID (EID)
                    to comply with Indian law. Eligible if turnover &lt; ₹40
                    lakh/year &amp; selling intra-state.
                  </Typography>
                  <Button
                    component="a"
                    href="https://www.gst.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    color="primary"
                    size="small"
                    className="mt-2 text-[10px] normal-case py-0.5"
                  >
                    Create EID now →
                  </Button>
                </Box>
                <Box className="mt-2">
                  <Label text="Enrollment ID (EID)" />
                  <TextField
                    size="small"
                    fullWidth
                    value={data.tax.eid}
                    onChange={(e) => setTax("eid", e.target.value.toUpperCase())}
                    slotProps={{ htmlInput: { maxLength: 20 } }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {error && (
          <Typography color="error" variant="caption" className="mt-2">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          disableElevation
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 bg-[#007bff] hover:bg-blue-600 text-white normal-case font-medium py-2 rounded shadow-sm"
        >
          {loading ? "Sending OTP..." : "Register & Send OTP"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );


};

export default SellerRegistration;
