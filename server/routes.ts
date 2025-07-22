import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertJobListingSchema,
  insertApplicationSchema,
  insertFollowUpSchema,
  insertTemplateSchema,
  insertSavedJobSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Job Listings routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const filters = {
        search: req.query.search as string,
        location: req.query.location as string,
        experienceLevel: req.query.experienceLevel as string,
        jobType: req.query.jobType as string,
        salaryRange: req.query.salaryRange as string,
        roleCategory: req.query.roleCategory as string,
      };

      const jobs = await storage.getJobListings(filters);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job listings" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJobListing(id);
      
      if (!job) {
        return res.status(404).json({ message: "Job listing not found" });
      }
      
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job listing" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const validatedData = insertJobListingSchema.parse(req.body);
      const job = await storage.createJobListing(validatedData);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ message: "Invalid job listing data" });
    }
  });

  // Applications routes
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  app.get("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getApplication(id);
      
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch application" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  app.patch("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertApplicationSchema.partial().parse(req.body);
      const application = await storage.updateApplication(id, updates);
      
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      res.json(application);
    } catch (error) {
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  app.delete("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteApplication(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete application" });
    }
  });

  // Follow-ups routes
  app.get("/api/followups", async (req, res) => {
    try {
      const followUps = await storage.getFollowUps();
      res.json(followUps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch follow-ups" });
    }
  });

  app.post("/api/followups", async (req, res) => {
    try {
      const validatedData = insertFollowUpSchema.parse(req.body);
      const followUp = await storage.createFollowUp(validatedData);
      res.status(201).json(followUp);
    } catch (error) {
      res.status(400).json({ message: "Invalid follow-up data" });
    }
  });

  app.patch("/api/followups/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertFollowUpSchema.partial().parse(req.body);
      const followUp = await storage.updateFollowUp(id, updates);
      
      if (!followUp) {
        return res.status(404).json({ message: "Follow-up not found" });
      }
      
      res.json(followUp);
    } catch (error) {
      res.status(400).json({ message: "Invalid follow-up data" });
    }
  });

  app.delete("/api/followups/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteFollowUp(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Follow-up not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete follow-up" });
    }
  });

  // Templates routes
  app.get("/api/templates", async (req, res) => {
    try {
      const type = req.query.type as string;
      const templates = await storage.getTemplates(type);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const validatedData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(validatedData);
      res.status(201).json(template);
    } catch (error) {
      res.status(400).json({ message: "Invalid template data" });
    }
  });

  app.patch("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertTemplateSchema.partial().parse(req.body);
      const template = await storage.updateTemplate(id, updates);
      
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(template);
    } catch (error) {
      res.status(400).json({ message: "Invalid template data" });
    }
  });

  app.delete("/api/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteTemplate(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete template" });
    }
  });

  // Saved jobs routes
  app.get("/api/saved-jobs", async (req, res) => {
    try {
      const savedJobs = await storage.getSavedJobs();
      res.json(savedJobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch saved jobs" });
    }
  });

  app.post("/api/saved-jobs", async (req, res) => {
    try {
      const validatedData = insertSavedJobSchema.parse(req.body);
      const savedJob = await storage.createSavedJob(validatedData);
      res.status(201).json(savedJob);
    } catch (error) {
      res.status(400).json({ message: "Invalid saved job data" });
    }
  });

  app.delete("/api/saved-jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSavedJob(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Saved job not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete saved job" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/stats", async (req, res) => {
    try {
      const stats = await storage.getApplicationStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
