import Header from "@/components/layout/header";
import ProfileTemplates from "@/components/dashboard/profile-templates";

export default function Profile() {
  return (
    <>
      <Header 
        title="Profile & Templates" 
        subtitle="Manage your resumes, cover letters, and email templates"
      />

      <div className="p-6">
        <ProfileTemplates />
      </div>
    </>
  );
}
