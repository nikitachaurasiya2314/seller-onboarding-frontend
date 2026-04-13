import React from "react";
import { NAV_ITEMS } from "../../data/mockData";
import type { NavItem } from "../../types";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const NavLink: React.FC<{ item: NavItem }> = ({ item }) => (
  <a
    href={item.href}
    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
      item.active
        ? "text-white font-semibold border-l-2 border-pink-600 bg-neutral-900"
        : "text-neutral-500 hover:bg-neutral-900 hover:text-neutral-200 border-l-2 border-transparent"
    }`}
  >
    <span
      className={`material-symbols-outlined text-[20px] ${item.active ? "text-pink-600" : ""}`}
    >
      {item.icon}
    </span>
    <span className="truncate">{item.label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] border-r border-neutral-800 bg-neutral-950 flex flex-col py-6 z-50">
      {/* Logo */}
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold tracking-tighter text-white uppercase">Zopcial</h1>
        <p className="text-[10px] text-neutral-500 font-semibold tracking-widest uppercase">
          Admin Console
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}

        {/* Bottom section */}
        <div className="mt-auto border-t border-neutral-800 pt-4">
          <a
            href="#"
            className="text-neutral-500 px-4 py-3 flex items-center gap-3 hover:bg-neutral-900 hover:text-neutral-200 transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="text-sm">System Settings</span>
          </a>
          <a
            href="#"
            className="text-neutral-500 px-4 py-3 flex items-center gap-3 hover:bg-neutral-900 hover:text-neutral-200 transition-colors duration-150"
          >
            <div className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
              NC
            </div>
            <span className="text-sm">Nikita Chaurasiya</span>
          </a>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
