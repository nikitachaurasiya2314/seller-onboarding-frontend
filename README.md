# 🚀 Seller Onboarding Frontend (React + MUI)

Frontend application for seller onboarding with:

* OTP Authentication
* Seller Registration
* GST & PAN Verification
* Clean UI with Material UI

---

## 🧾 Features

### 🔐 Authentication

* OTP-based login
* Secure token storage

### 🏪 Seller Registration

* Account + shop details
* Address with map integration
* GST verification
* PAN verification

### ⚡ UX Enhancements

* Auto-fill shop name from GST
* Snackbar notifications
* Loading states

---

## 🛠 Tech Stack

* React (Vite)
* TypeScript
* Material UI
* React Router DOM
* Axios

---

## 🔄 Flow

```text
Login → Send OTP → Verify OTP → Dashboard
        ↓
Register → GST/PAN Verify → Submit → OTP → Verify → Dashboard
```

---

## ⚙️ Setup

```bash
npm install
npm run dev
```

---

## 🔌 Backend Connection

Make sure backend runs on:

```text
http://localhost:5000
```

---

## 🚀 Future Improvements

* Form validation (React Hook Form + Zod)
* Protected routes
* Better error handling
* UI polish

---
