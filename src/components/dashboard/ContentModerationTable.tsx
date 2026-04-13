import React from "react";
import type { ContentType } from "../../types";
import { CONTENT_ITEMS } from "../../data/mockData";

const TypeBadge: React.FC<{ type: ContentType }> = ({ type }) => (
  <span
    className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-tighter ${
      type === "Reel" ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-800"
    }`}
  >
    {type}
  </span>
);

const ContentModerationTable: React.FC = () => {
  return (
    <div className="bg-white border border-neutral-200 flex flex-col">
      <div className="px-6 py-4 border-b border-neutral-100">
        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900">
          Content Moderation Queue
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-neutral-50">
            <tr>
              {["Type", "Creator", "Report Reason", "Reports", "Reported At", "Actions"].map(
                (header, i) => (
                  <th
                    key={header}
                    className={`px-6 py-4 text-[11px] font-bold text-neutral-500 uppercase tracking-widest ${
                      i === 3 ? "text-center" : i === 5 ? "text-right" : ""
                    }`}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {CONTENT_ITEMS.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50 transition-colors group">
                <td className="px-6 py-4">
                  <TypeBadge type={item.type} />
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs font-bold text-neutral-900">{item.creator}</p>
                  <p className="text-[10px] text-neutral-500">{item.followers}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-neutral-900">{item.reason}</p>
                </td>
                <td className="px-6 py-4 text-center tabular-nums">
                  <span
                    className={`text-xs font-bold ${
                      item.isHighReports ? "text-red-600" : "text-neutral-900"
                    }`}
                  >
                    {item.reports}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-neutral-500 tabular-nums">
                  {item.reportedAt}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 items-center">
                    <button className="text-[10px] font-bold uppercase text-pink-700 hover:underline">
                      Review
                    </button>
                    <span className="text-neutral-300">|</span>
                    <button className="text-[10px] font-bold uppercase text-neutral-500 hover:text-red-600 transition-colors">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentModerationTable;
