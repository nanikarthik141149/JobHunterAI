import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  salary: text("salary"),
  jobType: text("job_type").notNull(), // full-time, part-time, contract, remote
  experienceLevel: text("experience_level").notNull(), // entry, mid, senior, lead
  roleCategory: text("role_category").notNull(), // software-development, machine-learning, ai-data-science, devops
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  companyLogo: text("company_logo"),
  postedDate: timestamp("posted_date").defaultNow().notNull(),
  isRemote: boolean("is_remote").default(false),
  applicationUrl: text("application_url"),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobListings.id).notNull(),
  status: text("status").notNull(), // applied, interview, offer, rejected
  appliedDate: timestamp("applied_date").defaultNow().notNull(),
  lastContactDate: timestamp("last_contact_date"),
  salaryExpectation: text("salary_expectation"),
  personalMessage: text("personal_message"),
  resumeTemplate: text("resume_template"),
  coverLetterTemplate: text("cover_letter_template"),
  availableStartDate: timestamp("available_start_date"),
  followUpEnabled: boolean("follow_up_enabled").default(true),
  notes: text("notes"),
});

export const followUps = pgTable("follow_ups", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").references(() => applications.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  completed: boolean("completed").default(false),
  type: text("type").notNull(), // follow-up, thank-you, status-check
  emailTemplate: text("email_template"),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // resume, cover-letter, email
  content: text("content").notNull(),
  isActive: boolean("is_active").default(false),
  createdDate: timestamp("created_date").defaultNow().notNull(),
});

export const savedJobs = pgTable("saved_jobs", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobListings.id).notNull(),
  savedDate: timestamp("saved_date").defaultNow().notNull(),
});

// Insert schemas
export const insertJobListingSchema = createInsertSchema(jobListings).omit({
  id: true,
  postedDate: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  appliedDate: true,
});

export const insertFollowUpSchema = createInsertSchema(followUps).omit({
  id: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdDate: true,
});

export const insertSavedJobSchema = createInsertSchema(savedJobs).omit({
  id: true,
  savedDate: true,
});

// Types
export type InsertJobListing = z.infer<typeof insertJobListingSchema>;
export type JobListing = typeof jobListings.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export type InsertFollowUp = z.infer<typeof insertFollowUpSchema>;
export type FollowUp = typeof followUps.$inferSelect;

export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

export type InsertSavedJob = z.infer<typeof insertSavedJobSchema>;
export type SavedJob = typeof savedJobs.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
