import { 
  JobListing, InsertJobListing, 
  Application, InsertApplication,
  FollowUp, InsertFollowUp,
  Template, InsertTemplate,
  SavedJob, InsertSavedJob,
  User, InsertUser
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Job Listing methods
  getJobListings(filters?: {
    search?: string;
    location?: string;
    experienceLevel?: string;
    jobType?: string;
    salaryRange?: string;
    roleCategory?: string;
  }): Promise<JobListing[]>;
  getJobListing(id: number): Promise<JobListing | undefined>;
  createJobListing(job: InsertJobListing): Promise<JobListing>;
  updateJobListing(id: number, job: Partial<InsertJobListing>): Promise<JobListing | undefined>;
  deleteJobListing(id: number): Promise<boolean>;

  // Application methods
  getApplications(): Promise<(Application & { job: JobListing })[]>;
  getApplication(id: number): Promise<(Application & { job: JobListing }) | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined>;
  deleteApplication(id: number): Promise<boolean>;

  // Follow-up methods
  getFollowUps(): Promise<(FollowUp & { application: Application & { job: JobListing } })[]>;
  getFollowUp(id: number): Promise<(FollowUp & { application: Application & { job: JobListing } }) | undefined>;
  createFollowUp(followUp: InsertFollowUp): Promise<FollowUp>;
  updateFollowUp(id: number, followUp: Partial<InsertFollowUp>): Promise<FollowUp | undefined>;
  deleteFollowUp(id: number): Promise<boolean>;

  // Template methods
  getTemplates(type?: string): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: number): Promise<boolean>;

  // Saved Job methods
  getSavedJobs(): Promise<(SavedJob & { job: JobListing })[]>;
  createSavedJob(savedJob: InsertSavedJob): Promise<SavedJob>;
  deleteSavedJob(id: number): Promise<boolean>;

  // Analytics methods
  getApplicationStats(): Promise<{
    totalApplications: number;
    interviewsScheduled: number;
    pendingResponses: number;
    responseRate: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private jobListings: Map<number, JobListing> = new Map();
  private applications: Map<number, Application> = new Map();
  private followUps: Map<number, FollowUp> = new Map();
  private templates: Map<number, Template> = new Map();
  private savedJobs: Map<number, SavedJob> = new Map();
  private currentUserId = 1;
  private currentJobId = 1;
  private currentApplicationId = 1;
  private currentFollowUpId = 1;
  private currentTemplateId = 1;
  private currentSavedJobId = 1;

  constructor() {
    // Initialize with some sample job listings and templates
    this.initializeData();
  }

  private initializeData() {
    // Add sample job listings
    const sampleJobs: InsertJobListing[] = [
      {
        title: "Senior ML Engineer - Computer Vision",
        company: "Google",
        location: "San Francisco, CA",
        salary: "$180k - $220k",
        jobType: "full-time",
        experienceLevel: "senior",
        roleCategory: "machine-learning",
        description: "Join our cutting-edge computer vision team to develop next-generation AI systems. Work with large-scale data and state-of-the-art deep learning models...",
        requirements: "5+ years experience in machine learning, PhD preferred, Python, TensorFlow, PyTorch",
        companyLogo: "google",
        isRemote: true,
        applicationUrl: "https://careers.google.com/jobs/123",
      },
      {
        title: "AI Research Scientist",
        company: "Microsoft Research",
        location: "Seattle, WA",
        salary: "$160k - $200k",
        jobType: "full-time",
        experienceLevel: "senior",
        roleCategory: "ai-data-science",
        description: "Lead groundbreaking research in artificial intelligence and machine learning. Publish top-tier papers and develop innovative AI solutions...",
        requirements: "PhD in Computer Science or related field, 3+ years research experience",
        companyLogo: "microsoft",
        isRemote: false,
        applicationUrl: "https://careers.microsoft.com/jobs/456",
      },
      {
        title: "Software Engineer - Machine Learning Platform",
        company: "Apple",
        location: "Cupertino, CA",
        salary: "$170k - $210k",
        jobType: "full-time",
        experienceLevel: "mid",
        roleCategory: "software-development",
        description: "Build and scale ML infrastructure powering Apple's products used by billions. Work on distributed systems and ML deployment...",
        requirements: "4+ years software engineering experience, distributed systems knowledge",
        companyLogo: "apple",
        isRemote: false,
        applicationUrl: "https://jobs.apple.com/jobs/789",
      },
    ];

    sampleJobs.forEach(job => {
      const id = this.currentJobId++;
      this.jobListings.set(id, {
        id,
        ...job,
        salary: job.salary || null,
        companyLogo: job.companyLogo || null,
        isRemote: job.isRemote || null,
        applicationUrl: job.applicationUrl || null,
        postedDate: new Date(),
      });
    });

    // Add sample templates
    const sampleTemplates: InsertTemplate[] = [
      {
        name: "ML Engineer Resume",
        type: "resume",
        content: "Technical resume template for ML engineering positions",
        isActive: true,
      },
      {
        name: "Technical Role Template",
        type: "cover-letter",
        content: "Cover letter template for technical positions",
        isActive: true,
      },
      {
        name: "Follow-up Email",
        type: "email",
        content: "Professional follow-up email template",
        isActive: false,
      },
      {
        name: "Thank You Note",
        type: "email",
        content: "Thank you email template after interviews",
        isActive: false,
      },
    ];

    sampleTemplates.forEach(template => {
      const id = this.currentTemplateId++;
      this.templates.set(id, {
        id,
        ...template,
        isActive: template.isActive || null,
        createdDate: new Date(),
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Job Listing methods
  async getJobListings(filters?: {
    search?: string;
    location?: string;
    experienceLevel?: string;
    jobType?: string;
    salaryRange?: string;
    roleCategory?: string;
  }): Promise<JobListing[]> {
    let jobs = Array.from(this.jobListings.values());

    if (filters) {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm)
        );
      }
      if (filters.location) {
        jobs = jobs.filter(job => job.location.toLowerCase().includes(filters.location!.toLowerCase()));
      }
      if (filters.experienceLevel) {
        jobs = jobs.filter(job => job.experienceLevel === filters.experienceLevel);
      }
      if (filters.jobType) {
        jobs = jobs.filter(job => job.jobType === filters.jobType);
      }
      if (filters.roleCategory) {
        jobs = jobs.filter(job => job.roleCategory === filters.roleCategory);
      }
    }

    return jobs.sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
  }

  async getJobListing(id: number): Promise<JobListing | undefined> {
    return this.jobListings.get(id);
  }

  async createJobListing(insertJob: InsertJobListing): Promise<JobListing> {
    const id = this.currentJobId++;
    const job: JobListing = {
      ...insertJob,
      id,
      salary: insertJob.salary || null,
      companyLogo: insertJob.companyLogo || null,
      isRemote: insertJob.isRemote || null,
      applicationUrl: insertJob.applicationUrl || null,
      postedDate: new Date(),
    };
    this.jobListings.set(id, job);
    return job;
  }

  async updateJobListing(id: number, updates: Partial<InsertJobListing>): Promise<JobListing | undefined> {
    const job = this.jobListings.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updates };
    this.jobListings.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJobListing(id: number): Promise<boolean> {
    return this.jobListings.delete(id);
  }

  // Application methods
  async getApplications(): Promise<(Application & { job: JobListing })[]> {
    const applications = Array.from(this.applications.values());
    const result: (Application & { job: JobListing })[] = [];

    for (const app of applications) {
      const job = await this.getJobListing(app.jobId);
      if (job) {
        result.push({ ...app, job });
      }
    }

    return result.sort((a, b) => b.appliedDate.getTime() - a.appliedDate.getTime());
  }

  async getApplication(id: number): Promise<(Application & { job: JobListing }) | undefined> {
    const app = this.applications.get(id);
    if (!app) return undefined;

    const job = await this.getJobListing(app.jobId);
    if (!job) return undefined;

    return { ...app, job };
  }

  async createApplication(insertApp: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const app: Application = {
      ...insertApp,
      id,
      lastContactDate: insertApp.lastContactDate || null,
      salaryExpectation: insertApp.salaryExpectation || null,
      personalMessage: insertApp.personalMessage || null,
      resumeTemplate: insertApp.resumeTemplate || null,
      coverLetterTemplate: insertApp.coverLetterTemplate || null,
      availableStartDate: insertApp.availableStartDate || null,
      followUpEnabled: insertApp.followUpEnabled || null,
      notes: insertApp.notes || null,
      appliedDate: new Date(),
    };
    this.applications.set(id, app);
    return app;
  }

  async updateApplication(id: number, updates: Partial<InsertApplication>): Promise<Application | undefined> {
    const app = this.applications.get(id);
    if (!app) return undefined;

    const updatedApp = { ...app, ...updates };
    this.applications.set(id, updatedApp);
    return updatedApp;
  }

  async deleteApplication(id: number): Promise<boolean> {
    return this.applications.delete(id);
  }

  // Follow-up methods
  async getFollowUps(): Promise<(FollowUp & { application: Application & { job: JobListing } })[]> {
    const followUps = Array.from(this.followUps.values());
    const result: (FollowUp & { application: Application & { job: JobListing } })[] = [];

    for (const followUp of followUps) {
      const app = await this.getApplication(followUp.applicationId);
      if (app) {
        result.push({ ...followUp, application: app });
      }
    }

    return result.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }

  async getFollowUp(id: number): Promise<(FollowUp & { application: Application & { job: JobListing } }) | undefined> {
    const followUp = this.followUps.get(id);
    if (!followUp) return undefined;

    const app = await this.getApplication(followUp.applicationId);
    if (!app) return undefined;

    return { ...followUp, application: app };
  }

  async createFollowUp(insertFollowUp: InsertFollowUp): Promise<FollowUp> {
    const id = this.currentFollowUpId++;
    const followUp: FollowUp = { 
      ...insertFollowUp, 
      id,
      description: insertFollowUp.description || null,
      completed: insertFollowUp.completed || null,
      emailTemplate: insertFollowUp.emailTemplate || null,
    };
    this.followUps.set(id, followUp);
    return followUp;
  }

  async updateFollowUp(id: number, updates: Partial<InsertFollowUp>): Promise<FollowUp | undefined> {
    const followUp = this.followUps.get(id);
    if (!followUp) return undefined;

    const updatedFollowUp = { ...followUp, ...updates };
    this.followUps.set(id, updatedFollowUp);
    return updatedFollowUp;
  }

  async deleteFollowUp(id: number): Promise<boolean> {
    return this.followUps.delete(id);
  }

  // Template methods
  async getTemplates(type?: string): Promise<Template[]> {
    let templates = Array.from(this.templates.values());
    
    if (type) {
      templates = templates.filter(template => template.type === type);
    }

    return templates.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.currentTemplateId++;
    const template: Template = {
      ...insertTemplate,
      id,
      isActive: insertTemplate.isActive || null,
      createdDate: new Date(),
    };
    this.templates.set(id, template);
    return template;
  }

  async updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template | undefined> {
    const template = this.templates.get(id);
    if (!template) return undefined;

    const updatedTemplate = { ...template, ...updates };
    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteTemplate(id: number): Promise<boolean> {
    return this.templates.delete(id);
  }

  // Saved Job methods
  async getSavedJobs(): Promise<(SavedJob & { job: JobListing })[]> {
    const savedJobs = Array.from(this.savedJobs.values());
    const result: (SavedJob & { job: JobListing })[] = [];

    for (const savedJob of savedJobs) {
      const job = await this.getJobListing(savedJob.jobId);
      if (job) {
        result.push({ ...savedJob, job });
      }
    }

    return result.sort((a, b) => b.savedDate.getTime() - a.savedDate.getTime());
  }

  async createSavedJob(insertSavedJob: InsertSavedJob): Promise<SavedJob> {
    const id = this.currentSavedJobId++;
    const savedJob: SavedJob = {
      ...insertSavedJob,
      id,
      savedDate: new Date(),
    };
    this.savedJobs.set(id, savedJob);
    return savedJob;
  }

  async deleteSavedJob(id: number): Promise<boolean> {
    return this.savedJobs.delete(id);
  }

  // Analytics methods
  async getApplicationStats(): Promise<{
    totalApplications: number;
    interviewsScheduled: number;
    pendingResponses: number;
    responseRate: number;
  }> {
    const applications = Array.from(this.applications.values());
    const totalApplications = applications.length;
    const interviewsScheduled = applications.filter(app => app.status === 'interview').length;
    const pendingResponses = applications.filter(app => app.status === 'applied').length;
    const responded = applications.filter(app => app.status !== 'applied').length;
    const responseRate = totalApplications > 0 ? Math.round((responded / totalApplications) * 100) : 0;

    return {
      totalApplications,
      interviewsScheduled,
      pendingResponses,
      responseRate,
    };
  }
}

export const storage = new MemStorage();
