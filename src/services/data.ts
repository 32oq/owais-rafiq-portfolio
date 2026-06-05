import type {
  Profile,
  SocialLink,
  SkillCategory,
  ExperienceItem,
  Project,
  Testimonial,
  Certification,
  BlogPost,
  SiteSettings,
} from "@/types";

import profileData from "@/data/profile.json";
import socialLinksData from "@/data/social-links.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import testimonialsData from "@/data/testimonials.json";
import certificationsData from "@/data/certifications.json";
import blogsData from "@/data/blogs.json";
import settingsData from "@/data/settings.json";
import { getYearsFrom } from "@/lib/utils";

export function getProfile(): Profile {
  const base = profileData as Profile;
  // Dynamically calculate experience from Justdial start date
  const justdial = (experienceData as ExperienceItem[]).find(
    (e) => e.id === "justdial"
  );
  const yearsOfExperience = justdial
    ? getYearsFrom(justdial.startDate)
    : base.yearsOfExperience;
  return { ...base, yearsOfExperience };
}

export function getSocialLinks(featuredOnly = false): SocialLink[] {
  const links = socialLinksData as SocialLink[];
  return featuredOnly ? links.filter((l) => l.featured) : links;
}

export function getSkillCategories(): SkillCategory[] {
  return skillsData as SkillCategory[];
}

export function getAllSkills() {
  return getSkillCategories().flatMap((cat) => cat.skills);
}

export function getFeaturedSkills() {
  return getAllSkills().filter((s) => s.featured);
}

export function getExperience(featuredOnly = false): ExperienceItem[] {
  const items = experienceData as ExperienceItem[];
  const sorted = items.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  return featuredOnly ? sorted.filter((e) => e.featured) : sorted;
}

export function getAllProjects(): Project[] {
  const projects = projectsData as Project[];
  return projects.sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return getAllProjects();
  return getAllProjects().filter((p) => p.category === category);
}

export function getTestimonials(featuredOnly = false): Testimonial[] {
  const items = testimonialsData as Testimonial[];
  return featuredOnly ? items.filter((t) => t.featured) : items;
}

export function getCertifications(featuredOnly = false): Certification[] {
  const items = certificationsData as Certification[];
  return featuredOnly ? items.filter((c) => c.featured) : items;
}

// Strip full HTML content for listing pages — reduces RSC payload by ~30KB
function stripContent(post: BlogPost): BlogPost {
  // omit content field to keep listing payload small
  return { ...post, content: "" };
}

export function getAllBlogPosts(): BlogPost[] {
  const posts = blogsData as BlogPost[];
  return posts
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map(stripContent);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.featured);
}

// Full post with content — only used on detail page
export function getBlogPostFull(slug: string): BlogPost | undefined {
  const post = (blogsData as BlogPost[]).find((p) => p.slug === slug);
  return post;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getSettings(): SiteSettings {
  return settingsData as SiteSettings;
}

export function getAllProjectCategories(): string[] {
  const categories = getAllProjects().map((p) => p.category);
  return ["all", ...Array.from(new Set(categories))];
}

export function getAllBlogTags(): string[] {
  const tags = getAllBlogPosts().flatMap((p) => p.tags);
  return Array.from(new Set(tags));
}
