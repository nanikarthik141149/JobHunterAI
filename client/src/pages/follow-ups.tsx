import Header from "@/components/layout/header";
import FollowUpScheduler from "@/components/dashboard/follow-up-scheduler";

export default function FollowUps() {
  return (
    <>
      <Header 
        title="Follow-ups" 
        subtitle="Stay on top of your application follow-ups and communication"
      />

      <div className="p-6">
        <FollowUpScheduler />
      </div>
    </>
  );
}
