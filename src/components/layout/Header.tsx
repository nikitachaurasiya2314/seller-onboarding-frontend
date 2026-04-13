import React, { useState } from "react";

const Header: React.FC = () => {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="flex justify-between items-center h-16 w-full pl-[236px] pr-8 fixed top-0 bg-white/90 backdrop-blur-md z-40 border-b border-neutral-200">
      {/* Left: Title */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tighter">
          Manager Dashboard
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
          Wednesday, 9 April 2025
        </span>
      </div>

      {/* Right: Actions + Profile */}
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="material-symbols-outlined text-neutral-500 hover:text-pink-600 transition-colors relative"
          >
            notifications
          </button>
          <button className="material-symbols-outlined text-neutral-500 hover:text-pink-600 transition-colors">
            help_outline
          </button>
        </div>

        <div className="h-8 w-px bg-neutral-200" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-neutral-900">Nikita Chaurasiya</p>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase">Ops Manager</p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-pink-100 border border-neutral-200 flex items-center justify-center text-sm font-bold text-pink-600">
            NC
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
