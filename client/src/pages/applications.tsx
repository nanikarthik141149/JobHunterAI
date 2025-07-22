import Header from "@/components/layout/header";
import ApplicationTracker from "@/components/dashboard/application-tracker";

export default function Applications() {
  return (
    <>
      <Header 
        title="Applications" 
        subtitle="Track and manage all your job applications"
      />

      <div className="p-6">
        <ApplicationTracker />
      </div>
    </>
  );
}
