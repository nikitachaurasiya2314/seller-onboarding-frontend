import React from "react";
import type { SLAStatus } from "../../types";
import { SLA_BREACHES } from "../../data/mockData";

const StatusBadge: React.FC<{ status: SLAStatus }> = ({ status }) => (
  <span
    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 border ${
      status === "Critical"
        ? "text-red-600 border-red-300"
        : "text-neutral-500 border-neutral-300"
    }`}
  >
    {status}
  </span>
);

const SLABreachesTable: React.FC = () => {
  return (
    <div className="bg-white border border-neutral-200 flex flex-col flex-1">
      <div className="px-5 py-4 border-b border-neutral-100">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
          Recent SLA Breaches
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-5 py-3 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                Seller
              </th>
              <th className="px-5 py-3 text-[10px] font-bold text-neutral-500 uppercase tracking-widest text-right">
                Time
              </th>
              <th className="px-5 py-3 text-[10px] font-bold text-neutral-500 uppercase tracking-widest text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {SLA_BREACHES.map((breach) => (
              <tr key={breach.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-[11px] font-bold text-neutral-900">{breach.seller}</p>
                  <p className="text-[10px] text-neutral-400 tabular-nums">
                    {breach.orderRef} • {breach.type}
                  </p>
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-[11px] font-semibold text-neutral-600">
                  {breach.time}
                </td>
                <td className="px-5 py-3 text-right">
                  <StatusBadge status={breach.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SLABreachesTable;
