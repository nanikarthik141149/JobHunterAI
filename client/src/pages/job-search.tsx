import { useState } from "react";
import Header from "@/components/layout/header";
import JobSearchInterface from "@/components/dashboard/job-search-interface";
import QuickApplyModal from "@/components/modals/quick-apply-modal";
import { JobListing } from "@shared/schema";

export default function JobSearch() {
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
        title="Job Search" 
        subtitle="Find and apply to software developer, AI, and ML engineer roles"
      />

      <div className="p-6">
        <JobSearchInterface onQuickApply={handleQuickApply} />
      </div>

      <QuickApplyModal 
        isOpen={quickApplyModal.isOpen}
        onClose={closeQuickApply}
        job={quickApplyModal.job}
      />
    </>
  );
}
