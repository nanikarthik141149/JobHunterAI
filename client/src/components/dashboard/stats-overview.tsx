import { useQuery } from "@tanstack/react-query";
import { Send, CalendarCheck, Hourglass, Percent } from "lucide-react";
import { ApplicationStats } from "@/lib/types";

export default function StatsOverview() {
  const { data: stats, isLoading } = useQuery<ApplicationStats>({
    queryKey: ["/api/analytics/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="stats-card animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
              <div>
                <div className="h-8 bg-slate-200 rounded w-12 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="stats-card">
        <p className="text-slate-500">Failed to load statistics</p>
      </div>
    );
  }

  const statItems = [
    {
      value: stats.totalApplications,
      label: "Applications Sent",
      icon: Send,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      value: stats.interviewsScheduled,
      label: "Interviews Scheduled",
      icon: CalendarCheck,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      value: stats.pendingResponses,
      label: "Pending Responses",
      icon: Hourglass,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      value: `${stats.responseRate}%`,
      label: "Response Rate",
      icon: Percent,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="stats-card">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`${item.iconColor}`} size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="text-sm text-slate-500">{item.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
