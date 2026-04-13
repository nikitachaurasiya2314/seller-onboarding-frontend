import React from "react";
import MetricCardComponent from "../components/dashboard/MetricCard";
import TaskQueue from "../components/dashboard/TaskQueue";
import DisputeChart from "../components/dashboard/DisputeChart";
import SLABreachesTable from "../components/dashboard/SLABreachesTable";
import ContentModerationTable from "../components/dashboard/ContentModerationTable";
import { METRICS } from "../data/mockData";

const DashboardPage: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      {/* Row 1: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((metric) => (
          <MetricCardComponent key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Row 2: Task Queue + Right panels */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Task Queue - 6 cols */}
        <div className="lg:col-span-6">
          <TaskQueue />
        </div>

        {/* Right side - 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <DisputeChart />
          <SLABreachesTable />
        </div>
      </div>

      {/* Row 3: Content Moderation */}
      <ContentModerationTable />
    </div>
  );
};

export default DashboardPage;
