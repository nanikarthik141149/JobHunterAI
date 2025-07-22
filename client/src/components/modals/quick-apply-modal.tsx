import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { JobListing, Template, InsertApplication } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobListing | null;
}

export default function QuickApplyModal({ isOpen, onClose, job }: QuickApplyModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    personalMessage: "",
    salaryExpectation: "",
    availableStartDate: "",
    resumeTemplate: "",
    coverLetterTemplate: "",
    followUpEnabled: true,
    sendThankYou: true,
    autoCheck: false,
  });

  const { data: templates = [] } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
    enabled: isOpen,
  });

  const resumeTemplates = templates.filter(t => t.type === "resume");
  const coverLetterTemplates = templates.filter(t => t.type === "cover-letter");

  const createApplicationMutation = useMutation({
    mutationFn: async (applicationData: InsertApplication) => {
      const response = await apiRequest("POST", "/api/applications", applicationData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted!",
        description: "Your job application has been submitted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
      onClose();
      setFormData({
        personalMessage: "",
        salaryExpectation: "",
        availableStartDate: "",
        resumeTemplate: "",
        coverLetterTemplate: "",
        followUpEnabled: true,
        sendThankYou: true,
        autoCheck: false,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!job) return;

    const applicationData: InsertApplication = {
      jobId: job.id,
      status: "applied",
      salaryExpectation: formData.salaryExpectation || job.salary,
      personalMessage: formData.personalMessage,
      resumeTemplate: formData.resumeTemplate,
      coverLetterTemplate: formData.coverLetterTemplate,
      availableStartDate: formData.availableStartDate ? new Date(formData.availableStartDate) : null,
      followUpEnabled: formData.followUpEnabled,
      notes: "",
      lastContactDate: null,
    };

    createApplicationMutation.mutate(applicationData);
  };

  const getCompanyIcon = (company: string) => {
    const companyLower = company.toLowerCase();
    if (companyLower.includes('google')) return '🟦';
    if (companyLower.includes('microsoft')) return '🟦';
    if (companyLower.includes('apple')) return '🍎';
    if (companyLower.includes('netflix')) return '🟥';
    return '🏢';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quick Apply</DialogTitle>
        </DialogHeader>

        {job && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Info */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xl">
                  {getCompanyIcon(job.company)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{job.title}</h4>
                  <p className="text-slate-600">{job.company} • {job.location} • {job.salary}</p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="resumeTemplate">Resume Template</Label>
                <Select 
                  value={formData.resumeTemplate} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, resumeTemplate: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select resume template" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumeTemplates.map(template => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        {template.name} {template.isActive && "(Active)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="coverLetterTemplate">Cover Letter Template</Label>
                <Select 
                  value={formData.coverLetterTemplate} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, coverLetterTemplate: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cover letter template" />
                  </SelectTrigger>
                  <SelectContent>
                    {coverLetterTemplates.map(template => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="personalMessage">Personal Message (Optional)</Label>
              <Textarea
                id="personalMessage"
                placeholder="Add a personalized note for this application..."
                value={formData.personalMessage}
                onChange={(e) => setFormData(prev => ({ ...prev, personalMessage: e.target.value }))}
                className="h-24 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                <Input
                  id="salaryExpectation"
                  placeholder="e.g. $180k - $220k"
                  value={formData.salaryExpectation}
                  onChange={(e) => setFormData(prev => ({ ...prev, salaryExpectation: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="availableStartDate">Available Start Date</Label>
                <Input
                  id="availableStartDate"
                  type="date"
                  value={formData.availableStartDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, availableStartDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Auto Follow-up Settings */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-3">Auto Follow-up Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="followUpEnabled"
                    checked={formData.followUpEnabled}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, followUpEnabled: checked as boolean }))
                    }
                  />
                  <Label htmlFor="followUpEnabled">Schedule follow-up reminder in 1 week</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sendThankYou"
                    checked={formData.sendThankYou}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, sendThankYou: checked as boolean }))
                    }
                  />
                  <Label htmlFor="sendThankYou">Send thank you email after application</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoCheck"
                    checked={formData.autoCheck}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, autoCheck: checked as boolean }))
                    }
                  />
                  <Label htmlFor="autoCheck">Auto-check application status weekly</Label>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Save as Draft
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={createApplicationMutation.isPending}
              >
                {createApplicationMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
