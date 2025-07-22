import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Heart, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobFilters, ExperienceLevels, JobTypes, SalaryRanges, RoleCategories } from "@/lib/types";
import { JobListing } from "@shared/schema";

interface JobSearchInterfaceProps {
  onQuickApply?: (job: JobListing) => void;
}

export default function JobSearchInterface({ onQuickApply }: JobSearchInterfaceProps) {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    location: "",
  });

  const { data: jobs = [], isLoading } = useQuery<JobListing[]>({
    queryKey: ["/api/jobs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      
      const response = await fetch(`/api/jobs?${params}`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      return response.json();
    },
  });

  const handleSearch = () => {
    // This will trigger a refetch due to the query key dependency
  };

  const getCompanyIcon = (company: string) => {
    const companyLower = company.toLowerCase();
    if (companyLower.includes('google')) return '🟦'; // Using emoji as fallback
    if (companyLower.includes('microsoft')) return '🟦';
    if (companyLower.includes('apple')) return '🍎';
    if (companyLower.includes('netflix')) return '🟥';
    return '🏢';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Search className="text-primary" size={20} />
          Job Search
        </h3>
        <p className="text-slate-600 mt-1">Search and filter job opportunities</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <Input
              placeholder="Job title, keywords, or company"
              value={filters.search || ""}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-10"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <Input
              placeholder="Location"
              value={filters.location || ""}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Search Jobs</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select 
            value={filters.experienceLevel || ""} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, experienceLevel: value }))}
          >
            <SelectTrigger className="w-auto min-w-[140px]">
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              {ExperienceLevels.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.jobType || ""} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}
          >
            <SelectTrigger className="w-auto min-w-[120px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {JobTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.salaryRange || ""} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, salaryRange: value }))}
          >
            <SelectTrigger className="w-auto min-w-[140px]">
              <SelectValue placeholder="Salary Range" />
            </SelectTrigger>
            <SelectContent>
              {SalaryRanges.map(range => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.roleCategory || ""} 
            onValueChange={(value) => setFilters(prev => ({ ...prev, roleCategory: value }))}
          >
            <SelectTrigger className="w-auto min-w-[140px]">
              <SelectValue placeholder="Role Category" />
            </SelectTrigger>
            <SelectContent>
              {RoleCategories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Results */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="job-card animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="flex gap-4">
                        <div className="h-4 bg-slate-200 rounded w-20"></div>
                        <div className="h-4 bg-slate-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <Search className="mx-auto text-slate-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No jobs found</h3>
              <p className="text-slate-500">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xl">
                      {getCompanyIcon(job.company)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 hover:text-primary cursor-pointer">
                        {job.title}
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        {job.company} • {job.location} • {job.jobType}
                      </p>
                      <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        {job.salary && (
                          <span className="text-sm text-green-600 font-medium">
                            {job.salary}
                          </span>
                        )}
                        {job.isRemote && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Remote OK
                          </span>
                        )}
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {ExperienceLevels.find(l => l.value === job.experienceLevel)?.label}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="p-2"
                    >
                      <Heart size={16} />
                    </Button>
                    {onQuickApply && (
                      <Button size="sm" onClick={() => onQuickApply(job)}>
                        Quick Apply
                      </Button>
                    )}
                    {job.applicationUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
