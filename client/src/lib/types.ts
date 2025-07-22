import { 
  JobListing, 
  Application, 
  FollowUp, 
  Template, 
  SavedJob 
} from "@shared/schema";

export interface JobFilters {
  search?: string;
  location?: string;
  experienceLevel?: string;
  jobType?: string;
  salaryRange?: string;
  roleCategory?: string;
}

export interface ApplicationWithJob extends Application {
  job: JobListing;
}

export interface FollowUpWithApplication extends FollowUp {
  application: ApplicationWithJob;
}

export interface SavedJobWithJob extends SavedJob {
  job: JobListing;
}

export interface ApplicationStats {
  totalApplications: number;
  interviewsScheduled: number;
  pendingResponses: number;
  responseRate: number;
}

export const ExperienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead/Principal" },
] as const;

export const JobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "remote", label: "Remote" },
] as const;

export const SalaryRanges = [
  { value: "50k-75k", label: "$50k - $75k" },
  { value: "75k-100k", label: "$75k - $100k" },
  { value: "100k-150k", label: "$100k - $150k" },
  { value: "150k+", label: "$150k+" },
] as const;

export const RoleCategories = [
  { value: "software-development", label: "Software Development" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "ai-data-science", label: "AI/Data Science" },
  { value: "devops", label: "DevOps" },
] as const;

export const ApplicationStatuses = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
] as const;
