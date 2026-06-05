// ─── Profile ─────────────────────────────────────────────────────────────────

export interface Profile {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  bio: string;
  shortBio: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  avatar: string;
  resumeUrl: string;
  availableForWork: boolean;
  availabilityNote: string;
  website: string;
  nationality: string;
  languages: string[];
  interests: string[];
  yearsOfExperience: number;
}

// ─── Social Links ─────────────────────────────────────────────────────────────

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  username: string;
  featured: boolean;
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export type ProficiencyLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  id: string;
  name: string;
  icon?: string;
  proficiency: ProficiencyLevel;
  yearsOfExperience: number;
  description?: string;
  featured: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

// ─── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceItem {
  id: string;
  company: string;
  companyLogo?: string;
  companyUrl?: string;
  role: string;
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  location: string;
  locationType: "remote" | "hybrid" | "onsite";
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
  featured: boolean;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectStatus = "live" | "in-progress" | "archived" | "private";
export type ProjectCategory = "web" | "mobile" | "backend" | "fullstack" | "game" | "tool" | "other";

export interface ProjectLink {
  type: "live" | "github" | "demo" | "case-study" | "npm";
  url: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  coverImage: string;
  images: string[];
  category: ProjectCategory;
  tags: string[];
  techStack: string[];
  links: ProjectLink[];
  status: ProjectStatus;
  featured: boolean;
  year: number;
  highlights: string[];
  role: string;
  duration: string;
  challenges: string;
  outcome: string;
  order: number;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string | null;
  content: string;
  rating: number;
  date: string;
  featured: boolean;
  linkedinUrl?: string | null;
}

// ─── Certifications ───────────────────────────────────────────────────────────

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string | null;
  date: string;
  expiryDate?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
  description: string;
  skills: string[];
  featured: boolean;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogCategory = "tech" | "career" | "tutorial" | "thoughts" | "open-source";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: BlogCategory;
  readingTime: number;
  featured: boolean;
  published: boolean;
  views?: number;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  siteKeywords: string[];
  ogImage: string;
  twitterHandle: string;
  googleAnalyticsId?: string;
  enableBlog: boolean;
  enableTestimonials: boolean;
  enableCertifications: boolean;
  navigation: NavigationItem[];
  footerLinks: NavigationItem[];
  accentColor: string;
  copyrightYear: number;
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface BaseProps {
  className?: string;
}

export interface SectionProps extends BaseProps {
  id?: string;
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "outline";

export interface BadgeProps extends BaseProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

// ─── Animation ────────────────────────────────────────────────────────────────

export interface AnimationVariants {
  hidden: object;
  visible: object;
}
