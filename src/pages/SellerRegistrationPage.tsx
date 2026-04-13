import React, { useState } from "react";
import SellerRegistration from "../components/seller/SellerRegistration";
import type { SellerFormData } from "../types";

const INITIAL_DATA: SellerFormData = {
  account: {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  shop: {
    shopName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  },
  tax: {
    hasGst: true,
    gstin: "",
    eid: "",
  },
  compliance: {
    turnoverDeclaration: false,
    intraStateDeclaration: false,
    termsAccepted: false,
  },
};

interface Props {
  onComplete?: () => void;
  onGoToLogin?: () => void;
}

const SellerRegistrationPage: React.FC<Props> = ({ onComplete, onGoToLogin }) => {
  const [formData, setFormData] = useState<SellerFormData>(INITIAL_DATA);

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-[#f0f2f5] min-h-screen font-sans">
      
      {/* Header Logo Area */}
      <div className="mb-2 w-full max-w-[400px] flex items-center justify-center">
        <h1 className="text-xl text-gray-600 flex items-center gap-1 font-light tracking-wide">
          <span className="font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text italic text-lg pr-1">Zopcial</span> 
          | Zopcial
        </h1>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-[400px] bg-white border border-gray-200">
        <div className="border-b border-[#007bff] py-2 text-center text-xs text-gray-600 font-medium tracking-wide">
          Register as a Seller
        </div>
        <div className="p-5">
          <SellerRegistration data={formData} onChange={setFormData} onSubmit={onComplete} />
          
          <div className="flex items-center justify-center pt-6 mt-4 border-t border-gray-100">
             <span className="text-xs text-gray-500">
               Already have an account?{" "}
               <span className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={onGoToLogin}>
                 Login instead
               </span>
             </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SellerRegistrationPage;
