import React from "react";
import { PULSE_ITEMS } from "../../data/mockData";

const PulseStream: React.FC = () => {
  return (
    <div className="fixed right-0 top-16 bottom-0 w-72 bg-white border-l border-neutral-200 hidden xl:flex flex-col">
      <div className="px-5 py-4 border-b border-neutral-100">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
          Pulse Stream
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {PULSE_ITEMS.map((item) => (
          <div key={item.id} className="relative pl-5">
            {item.isHighlighted && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-700" />
            )}
            <div className="flex flex-col gap-1">
              {item.tag && (
                <span className="text-[10px] font-bold text-pink-700 uppercase">{item.tag}</span>
              )}
              <p className="text-xs text-neutral-900 font-medium leading-snug">{item.message}</p>
              <p className="text-[10px] text-neutral-500 uppercase font-semibold">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PulseStream;
