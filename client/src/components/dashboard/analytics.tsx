import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Clock, Target, BarChart } from "lucide-react";
import { ApplicationStats, ApplicationWithJob } from "@/lib/types";

export default function Analytics() {
  const { data: stats } = useQuery<ApplicationStats>({
    queryKey: ["/api/analytics/stats"],
  });

  const { data: applications = [] } = useQuery<ApplicationWithJob[]>({
    queryKey: ["/api/applications"],
  });

  const getStatusDistribution = () => {
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = applications.length;
    
    return [
      { 
        status: "Applied", 
        count: statusCounts.applied || 0, 
        percentage: total > 0 ? Math.round(((statusCounts.applied || 0) / total) * 100) : 0,
        color: "bg-blue-500"
      },
      { 
        status: "Interview", 
        count: statusCounts.interview || 0, 
        percentage: total > 0 ? Math.round(((statusCounts.interview || 0) / total) * 100) : 0,
        color: "bg-yellow-500"
      },
      { 
        status: "Rejected", 
        count: statusCounts.rejected || 0, 
        percentage: total > 0 ? Math.round(((statusCounts.rejected || 0) / total) * 100) : 0,
        color: "bg-red-500"
      },
      { 
        status: "Offer", 
        count: statusCounts.offer || 0, 
        percentage: total > 0 ? Math.round(((statusCounts.offer || 0) / total) * 100) : 0,
        color: "bg-green-500"
      },
    ];
  };

  const statusDistribution = getStatusDistribution();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <BarChart className="text-primary" size={20} />
          Application Analytics
        </h3>
        <p className="text-slate-600 mt-1">Track your job search performance and trends</p>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Response Rate Chart Placeholder */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Response Rate Trends</h4>
            <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <div className="text-center text-slate-500">
                <BarChart size={48} className="mx-auto mb-2" />
                <p className="text-sm">Response Rate Chart</p>
                <p className="text-xs">{stats?.responseRate || 0}% avg response rate</p>
              </div>
            </div>
          </div>

          {/* Application Status Distribution */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Application Status</h4>
            <div className="space-y-3">
              {statusDistribution.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.status}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-900 w-8 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Best Performance</p>
                <p className="text-xs text-blue-700">ML Engineer roles (35% response)</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Clock className="text-white" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-900">Avg. Response Time</p>
                <p className="text-xs text-amber-700">8.5 days</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Target className="text-white" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Success Rate</p>
                <p className="text-xs text-green-700">
                  {applications.length > 0 
                    ? `${Math.round((statusDistribution.find(s => s.status === 'Offer')?.count || 0) / applications.length * 100)}% (${statusDistribution.find(s => s.status === 'Offer')?.count || 0} offers / ${applications.length} apps)`
                    : "0% (0 offers / 0 apps)"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
