import { useQuery } from "@tanstack/react-query";
import { ListTodo, Download, Plus, Eye, Mail, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApplicationWithJob } from "@/lib/types";

export default function ApplicationTracker() {
  const { data: applications = [], isLoading } = useQuery<ApplicationWithJob[]>({
    queryKey: ["/api/applications"],
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      applied: "status-applied",
      interview: "status-interview", 
      offer: "status-offer",
      rejected: "status-rejected",
    };
    
    const statusLabels = {
      applied: "Applied",
      interview: "Interview",
      offer: "Offer",
      rejected: "Rejected",
    };

    return (
      <Badge className={`status-badge ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </Badge>
    );
  };

  const getCompanyIcon = (company: string) => {
    const companyLower = company.toLowerCase();
    if (companyLower.includes('google')) return '🟦';
    if (companyLower.includes('microsoft')) return '🟦';
    if (companyLower.includes('apple')) return '🍎';
    if (companyLower.includes('netflix')) return '🟥';
    return '🏢';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Application Tracker</h3>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-4">
                <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                </div>
                <div className="w-16 h-6 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <ListTodo className="text-primary" size={20} />
            Application Tracker
          </h3>
          <p className="text-slate-600 mt-1">Monitor your job application progress</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="text-primary bg-blue-50 border border-blue-200">
            All ({applications.length})
          </Button>
          <Button variant="ghost" size="sm">
            Applied ({statusCounts.applied || 0})
          </Button>
          <Button variant="ghost" size="sm">
            Interview ({statusCounts.interview || 0})
          </Button>
          <Button variant="ghost" size="sm">
            Offer ({statusCounts.offer || 0})
          </Button>
          <Button variant="ghost" size="sm">
            Rejected ({statusCounts.rejected || 0})
          </Button>
        </div>
      </div>

      <div className="p-6">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <ListTodo className="mx-auto text-slate-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No applications yet</h3>
            <p className="text-slate-500">Start applying to jobs to track your progress</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="pb-3">Company & Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Applied Date</th>
                  <th className="pb-3">Last Contact</th>
                  <th className="pb-3">Salary</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg">
                          {getCompanyIcon(app.job.company)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{app.job.company}</p>
                          <p className="text-sm text-slate-500">{app.job.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="py-4 text-sm text-slate-500">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-sm text-slate-500">
                      {app.lastContactDate ? new Date(app.lastContactDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-4 text-sm text-slate-900 font-medium">
                      {app.salaryExpectation || app.job.salary || "-"}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="p-1">
                          <Eye size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Mail size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
