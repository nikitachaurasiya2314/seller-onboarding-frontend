import React from "react";
import type { Task, Priority } from "../../types";
import { TASKS } from "../../data/mockData";

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  urgent: { label: "Urgent", color: "text-red-600" },
  high: { label: "High", color: "text-pink-600" },
  normal: { label: "Normal", color: "text-neutral-500" },
};

interface TaskRowProps {
  task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
  const priorityCfg = PRIORITY_CONFIG[task.priority];
  const isPrimaryAction = task.priority === "urgent" && task.ctaLabel === "Respond";

  return (
    <div className="p-4 hover:bg-neutral-50 transition-colors group border-b border-neutral-100 last:border-b-0">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase ${priorityCfg.color}`}>
              {priorityCfg.label}
            </span>
            <span className="text-[10px] font-bold text-neutral-400">{task.ref}</span>
          </div>
          <p className="text-sm text-neutral-900 font-medium leading-snug">{task.title}</p>
          <p className="text-xs text-neutral-500 mt-1 tabular-nums">
            {task.meta}
            {task.metaHighlight && (
              <span
                className={`font-semibold ${
                  task.metaHighlightColor === "error" ? "text-red-600" : "text-neutral-900"
                }`}
              >
                {task.metaHighlight}
              </span>
            )}
          </p>
        </div>
        <button
          className={`flex-shrink-0 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
            isPrimaryAction
              ? "bg-pink-700 text-white hover:bg-pink-800 active:opacity-80"
              : "border border-neutral-300 text-neutral-700 hover:border-pink-700 hover:text-pink-700"
          }`}
        >
          {task.ctaLabel}
        </button>
      </div>
    </div>
  );
};

const TaskQueue: React.FC = () => {
  const priorityCount = TASKS.filter((t) => t.priority === "urgent" || t.priority === "high").length;

  return (
    <div className="bg-white border border-neutral-200 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900">
          My Task Queue
        </h3>
        <span className="px-2 py-1 bg-pink-700 text-[10px] font-bold text-white uppercase tracking-tighter">
          {priorityCount} Priorities
        </span>
      </div>
      <div className="divide-y divide-neutral-100">
        {TASKS.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskQueue;
