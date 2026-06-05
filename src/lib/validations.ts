import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1),
  handle: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  bio: z.string().min(1),
  shortBio: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  timezone: z.string().min(1),
  avatar: z.string(),
  resumeUrl: z.string(),
  availableForWork: z.boolean(),
  availabilityNote: z.string(),
  website: z.string().url(),
  nationality: z.string(),
  languages: z.array(z.string()),
  interests: z.array(z.string()),
  yearsOfExperience: z.number().min(0),
});

export const SocialLinkSchema = z.object({
  id: z.string().min(1),
  platform: z.string().min(1),
  label: z.string().min(1),
  url: z.string().min(1),
  icon: z.string().min(1),
  username: z.string().min(1),
  featured: z.boolean(),
});

export const SkillSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  icon: z.string().optional(),
  proficiency: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  yearsOfExperience: z.number().min(0),
  description: z.string().optional(),
  featured: z.boolean(),
});

export const SkillCategorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  skills: z.array(SkillSchema),
});

export const ExperienceSchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  companyLogo: z.string().nullable().optional(),
  companyUrl: z.string().nullable().optional(),
  role: z.string().min(1),
  type: z.enum(["full-time", "part-time", "contract", "internship", "freelance"]),
  location: z.string().min(1),
  locationType: z.enum(["remote", "hybrid", "onsite"]),
  startDate: z.string().min(1),
  endDate: z.string().nullable(),
  current: z.boolean(),
  description: z.string().min(1),
  achievements: z.array(z.string()),
  techStack: z.array(z.string()),
  featured: z.boolean(),
});

export const ProjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  coverImage: z.string(),
  images: z.array(z.string()),
  category: z.enum(["web", "mobile", "backend", "fullstack", "game", "tool", "other"]),
  tags: z.array(z.string()),
  techStack: z.array(z.string()),
  links: z.array(
    z.object({
      type: z.enum(["live", "github", "demo", "case-study", "npm"]),
      url: z.string().min(1),
      label: z.string().min(1),
    })
  ),
  status: z.enum(["live", "in-progress", "archived", "private"]),
  featured: z.boolean(),
  year: z.number(),
  highlights: z.array(z.string()),
  role: z.string().min(1),
  duration: z.string().min(1),
  challenges: z.string(),
  outcome: z.string(),
  order: z.number(),
});

export const BlogSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string(),
  coverImage: z.string(),
  author: z.string().min(1),
  publishedAt: z.string().min(1),
  updatedAt: z.string().nullable().optional(),
  tags: z.array(z.string()),
  category: z.enum(["tech", "career", "tutorial", "thoughts", "open-source"]),
  readingTime: z.number().min(1),
  featured: z.boolean(),
  published: z.boolean(),
  views: z.number().optional(),
});

export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.warn("Data validation warning:", result.error.format());
    return data as T;
  }
  return result.data;
}
