import { useQuery } from "@tanstack/react-query";
import { UserCheck, Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Template } from "@shared/schema";

export default function ProfileTemplates() {
  const { data: templates = [], isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  const templatesByType = templates.reduce((acc, template) => {
    if (!acc[template.type]) acc[template.type] = [];
    acc[template.type].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  const getTemplateTypeTitle = (type: string) => {
    const titles = {
      resume: "Resume Templates",
      "cover-letter": "Cover Letter Templates", 
      email: "Email Templates",
    };
    return titles[type as keyof typeof titles] || type;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Profile & Templates</h3>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <UserCheck className="text-primary" size={20} />
          Profile & Templates
        </h3>
        <p className="text-slate-600 mt-1">Manage your application materials</p>
      </div>

      <div className="p-6 space-y-4">
        {Object.keys(templatesByType).length === 0 ? (
          <div className="text-center py-8">
            <UserCheck className="mx-auto text-slate-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No templates found</h3>
            <p className="text-slate-500">Create templates to streamline your applications</p>
          </div>
        ) : (
          Object.entries(templatesByType).map(([type, typeTemplates]) => (
            <div key={type} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-900">{getTemplateTypeTitle(type)}</h4>
                <Button variant="ghost" size="sm">
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                {typeTemplates.map((template) => (
                  <div key={template.id} className="flex justify-between items-center">
                    <span className="text-slate-600">{template.name}</span>
                    <span className={`text-xs ${template.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                      {template.isActive ? 'Active' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <Button className="w-full">
          <Upload size={16} className="mr-2" />
          Upload New Document
        </Button>
      </div>
    </div>
  );
}
