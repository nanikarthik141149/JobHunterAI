import Header from "@/components/layout/header";
import Analytics from "@/components/dashboard/analytics";

export default function AnalyticsPage() {
  return (
    <>
      <Header 
        title="Analytics" 
        subtitle="Track your job search performance and identify trends"
      />

      <div className="p-6">
        <Analytics />
      </div>
    </>
  );
}
