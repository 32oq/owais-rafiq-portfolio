import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import {
  getProfile,
  getSocialLinks,
  getSkillCategories,
  getExperience,
  getFeaturedProjects,
  getTestimonials,
  getCertifications,
  getFeaturedBlogPosts,
  getSettings,
} from "@/services/data";

export default function HomePage() {
  const profile = getProfile();
  const socialLinks = getSocialLinks();
  const skillCategories = getSkillCategories();
  const experience = getExperience();
  const featuredProjects = getFeaturedProjects();
  const testimonials = getTestimonials(true);
  const certifications = getCertifications(true);
  const blogPosts = getFeaturedBlogPosts();
  const settings = getSettings();

  return (
    <>
      <Hero profile={profile} socialLinks={socialLinks} />
      <WhatIDo yearsOfExperience={profile.yearsOfExperience} />
      <About profile={profile} />
      <Skills categories={skillCategories} />
      <Experience items={experience} />
      <Projects projects={featuredProjects} />
      {settings.enableTestimonials && <Testimonials testimonials={testimonials} />}
      {settings.enableCertifications && <Certifications certifications={certifications} />}
      {settings.enableBlog && <Blog posts={blogPosts} />}
      <Contact profile={profile} socialLinks={socialLinks} />
    </>
  );
}
