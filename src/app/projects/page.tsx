import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";
import { buildMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/services/data";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "A showcase of full-stack web apps, mobile apps, and games built by Owais Rafiq.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="pt-16">
      <div className="container-section py-12">
        <div className="mb-12">
          <span className="tag mb-3 inline-block">All Projects</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Everything I&apos;ve Built
          </h1>
          <p className="text-xl text-text-muted max-w-2xl">
            From production backends to weekend experiments — each project taught me something new.
          </p>
        </div>
      </div>
      <Projects projects={projects} showAll />
    </div>
  );
}
