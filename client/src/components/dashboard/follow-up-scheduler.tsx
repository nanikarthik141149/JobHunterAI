import { useQuery } from "@tanstack/react-query";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FollowUpWithApplication } from "@/lib/types";

export default function FollowUpScheduler() {
  const { data: followUps = [], isLoading } = useQuery<FollowUpWithApplication[]>({
    queryKey: ["/api/followups"],
  });

  const upcomingFollowUps = followUps.filter(f => !f.completed);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Upcoming Follow-ups</h3>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isOverdue = (dueDate: Date | string) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysUntil = (dueDate: Date | string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `In ${diffDays} days`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Calendar className="text-primary" size={20} />
          Upcoming Follow-ups
        </h3>
        <p className="text-slate-600 mt-1">Stay on top of your communication</p>
      </div>

      <div className="p-6 space-y-4">
        {upcomingFollowUps.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto text-slate-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No follow-ups scheduled</h3>
            <p className="text-slate-500">Create follow-up reminders for your applications</p>
          </div>
        ) : (
          upcomingFollowUps.map((followUp) => {
            const overdue = isOverdue(followUp.dueDate);
            const borderColor = overdue ? "border-amber-200" : "border-slate-200";
            const bgColor = overdue ? "bg-amber-50" : "bg-white";
            
            return (
              <div key={followUp.id} className={`flex items-center gap-4 p-3 ${bgColor} border ${borderColor} rounded-lg`}>
                <div className={`w-2 h-2 ${overdue ? 'bg-amber-500' : 'bg-slate-300'} rounded-full`}></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{followUp.title}</p>
                  <p className="text-sm text-slate-600">
                    {followUp.application.job.company} - {followUp.application.job.title}
                  </p>
                  <p className={`text-xs mt-1 ${overdue ? 'text-amber-700' : 'text-slate-500'}`}>
                    {getDaysUntil(followUp.dueDate)}
                    {followUp.description && ` • ${followUp.description}`}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant={overdue ? "default" : "outline"}
                  className={overdue ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}
                >
                  {overdue ? "Send Now" : "Schedule"}
                </Button>
              </div>
            );
          })
        )}

        <Button variant="outline" className="w-full mt-4">
          <Plus size={16} className="mr-2" />
          Add Follow-up
        </Button>
      </div>
    </div>
  );
}
