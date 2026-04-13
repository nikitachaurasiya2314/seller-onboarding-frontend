import React from "react";
import type { MetricCard } from "../../types";

interface MetricCardProps {
  metric: MetricCard;
}

const MetricCardComponent: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <div className="bg-white border border-neutral-200 p-5 flex flex-col justify-between min-h-[140px] hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
          {metric.label}
        </span>
        <span className="material-symbols-outlined text-neutral-400 text-[20px]">
          {metric.icon}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-4xl font-bold tracking-tight tabular-nums text-neutral-900">
          {metric.value}
        </h3>
        <p
          className={`text-[11px] font-semibold mt-1 uppercase ${
            metric.subtextVariant === "error" ? "text-red-600" : "text-neutral-500"
          }`}
        >
          {metric.subtext}
        </p>
      </div>
    </div>
  );
};

export default MetricCardComponent;
