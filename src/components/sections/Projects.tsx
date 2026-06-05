"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import { PROJECT_CATEGORIES } from "@/constants";
import type { Project } from "@/types";

interface ProjectsProps {
  projects: Project[];
  showAll?: boolean;
}

export function Projects({ projects, showAll = false }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const availableCategories = PROJECT_CATEGORIES.filter(
    (cat) =>
      cat.value === "all" ||
      projects.some((p) => p.category === cat.value)
  );

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container-section">
        <SectionHeader
          badge="Projects"
          title="Things I've built"
          subtitle="A selection of projects that showcase my approach to solving problems with clean, scalable code."
        />

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10 justify-center"
        >
          {availableCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-accent text-white shadow-glow"
                  : "bg-surface text-text-muted hover:text-text-primary border border-border hover:border-accent/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all link (if not showing all) */}
        {!showAll && filtered.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <LinkButton href="/projects" variant="secondary" size="lg" rightIcon={<ArrowUpRight size={16} />}>
              View All Projects
            </LinkButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const githubLink = project.links.find((l) => l.type === "github");
  const liveLink = project.links.find((l) => l.type === "live" || l.type === "demo");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/projects/${project.slug}`} className="block group h-full">
        <Card hoverable className="h-full flex flex-col overflow-hidden p-0">
          {/* Image placeholder / cover */}
          <div className="relative h-48 bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-cyan-500/10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, rgba(99,102,241,0.3) 0%, transparent 60%),
                                   radial-gradient(circle at 70% 60%, rgba(139,92,246,0.3) 0%, transparent 60%)`,
              }}
            />
            {/* Project emoji/icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                {project.category === "game" ? "🎮" :
                 project.category === "mobile" ? "📱" :
                 project.category === "backend" ? "⚙️" :
                 project.category === "fullstack" ? "🚀" : "🌐"}
              </span>
            </div>
            {/* Status badge */}
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status === "live" && (
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                )}
                {getStatusLabel(project.status)}
              </span>
            </div>
            {/* Year */}
            <div className="absolute bottom-3 left-3">
              <span className="text-xs font-mono text-white/60">{project.year}</span>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-5 space-y-3">
            <div>
              <h3 className="font-semibold text-text-primary text-lg group-hover:text-accent transition-colors duration-150">
                {project.title}
              </h3>
              <p className="text-sm text-text-muted mt-1 line-clamp-2 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs text-text-muted font-mono">{project.role}</span>
              <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                {githubLink && (
                  <a
                    href={githubLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={14} />
                  </a>
                )}
                {liveLink && (
                  <a
                    href={liveLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
                    aria-label="Live site"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <div className="p-1.5 rounded-md text-text-muted group-hover:text-accent transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
