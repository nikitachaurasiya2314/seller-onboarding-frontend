import React from "react";
import { DISPUTE_BREAKDOWN } from "../../data/mockData";

const DisputeChart: React.FC = () => {
  const total = DISPUTE_BREAKDOWN.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white border border-neutral-200 p-5">
      <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-neutral-900">
        Dispute Breakdown
      </h3>

      {/* Bar */}
      <div className="w-full flex h-8 rounded-sm overflow-hidden mb-6">
        {DISPUTE_BREAKDOWN.map((item) => (
          <div
            key={item.status}
            className="h-full transition-all"
            style={{
              width: `${(item.count / total) * 100}%`,
              backgroundColor: item.color,
            }}
            title={`${item.status}: ${item.count}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-y-3">
        {DISPUTE_BREAKDOWN.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div
              className="w-2 h-2 flex-shrink-0"
              style={{ backgroundColor: item.color, border: item.color === "#e5e7eb" ? "1px solid #d1d5db" : "none" }}
            />
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">
              {item.status === "Awaiting Seller"
                ? "Await Seller"
                : item.status === "Awaiting Buyer"
                ? "Await Buyer"
                : item.status}
              : {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisputeChart;
