import { useState } from "react";
import Header from "@/components/layout/header";
import StatsOverview from "@/components/dashboard/stats-overview";
import JobSearchInterface from "@/components/dashboard/job-search-interface";
import ApplicationTracker from "@/components/dashboard/application-tracker";
import FollowUpScheduler from "@/components/dashboard/follow-up-scheduler";
import ProfileTemplates from "@/components/dashboard/profile-templates";
import Analytics from "@/components/dashboard/analytics";
import QuickApplyModal from "@/components/modals/quick-apply-modal";
import { JobListing } from "@shared/schema";

export default function Dashboard() {
  const [quickApplyModal, setQuickApplyModal] = useState<{
    isOpen: boolean;
    job: JobListing | null;
  }>({
    isOpen: false,
    job: null,
  });

  const handleQuickApply = (job: JobListing) => {
    setQuickApplyModal({ isOpen: true, job });
  };

  const closeQuickApply = () => {
    setQuickApplyModal({ isOpen: false, job: null });
  };

  return (
    <>
      <Header 
        title="Dashboard" 
        subtitle="Track your job applications and manage your career search"
        onQuickApply={() => setQuickApplyModal({ isOpen: true, job: null })}
      />

      <div className="p-6 space-y-6">
        <StatsOverview />
        
        <JobSearchInterface onQuickApply={handleQuickApply} />
        
        <ApplicationTracker />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <FollowUpScheduler />
          <ProfileTemplates />
        </div>
        
        <Analytics />
      </div>

      <QuickApplyModal 
        isOpen={quickApplyModal.isOpen}
        onClose={closeQuickApply}
        job={quickApplyModal.job}
      />
    </>
  );
}
