export const SITE_URL = "https://owaisrafiq.dev";
export const SITE_NAME = "Owais Rafiq";
export const SITE_DESCRIPTION =
  "Full Stack Engineer from Kashmir. Node.js · React · Flutter.";

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 1.0,
} as const;

export const ANIMATION_DELAY = {
  none: 0,
  xs: 0.05,
  sm: 0.1,
  md: 0.15,
  lg: 0.2,
  xl: 0.3,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  toast: 60,
  tooltip: 70,
} as const;

export const PROJECT_CATEGORIES = [
  { value: "all", label: "All" },
  { value: "fullstack", label: "Full Stack" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "backend", label: "Backend" },
  { value: "game", label: "Games" },
  { value: "tool", label: "Tools" },
] as const;

export const PROFICIENCY_LEVELS = {
  beginner: { label: "Beginner", color: "bg-slate-400", percent: 25 },
  intermediate: { label: "Intermediate", color: "bg-blue-500", percent: 50 },
  advanced: { label: "Advanced", color: "bg-indigo-500", percent: 75 },
  expert: { label: "Expert", color: "bg-violet-600", percent: 95 },
} as const;

export const SOCIAL_ICON_MAP: Record<string, string> = {
  Github: "Github",
  LinkedIn: "Linkedin",
  Twitter: "Twitter",
  Instagram: "Instagram",
  Email: "Mail",
};

export const EMAIL = "peerzadaowais36@gmail.com";
export const GITHUB_URL = "https://github.com/32oq";
export const LINKEDIN_URL = "https://linkedin.com/in/owais-rafiq-24b3a2146";
