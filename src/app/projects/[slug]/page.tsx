import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  User2,
  Tag,
  CheckCircle2,
  Lightbulb,
  Target,
} from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getAllProjects, getProjectBySlug } from "@/services/data";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import type { Project } from "@/types";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.tagline,
    path: `/projects/${project.slug}`,
  });
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const githubLink = project.links.find((l) => l.type === "github");
  const liveLink = project.links.find((l) => l.type === "live" || l.type === "demo");

  return (
    <article className="pt-24 pb-20">
      <div className="container-section max-w-4xl">
        {/* Back nav */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary mb-8 group transition-colors">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status === "live" && (
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              )}
              {getStatusLabel(project.status)}
            </span>
            <span className="tag">{project.category}</span>
            <span className="text-sm text-text-muted font-mono">{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
            {project.title}
          </h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-2xl">
            {project.tagline}
          </p>

          {/* Action links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {liveLink && (
              <LinkButton href={liveLink.url} external leftIcon={<ExternalLink size={14} />}>
                {liveLink.label}
              </LinkButton>
            )}
            {githubLink && (
              <LinkButton href={githubLink.url} external variant="secondary" leftIcon={<Github size={14} />}>
                {githubLink.label}
              </LinkButton>
            )}
          </div>
        </div>

        {/* Cover image placeholder */}
        <div className="h-72 sm:h-96 rounded-2xl bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-cyan-500/10 border border-border mb-12 flex items-center justify-center relative overflow-hidden">
          <span className="text-9xl opacity-30">
            {project.category === "game" ? "🎮" :
             project.category === "mobile" ? "📱" :
             project.category === "backend" ? "⚙️" :
             project.category === "fullstack" ? "🚀" : "🌐"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-4">Overview</h2>
              <p className="text-text-muted leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Highlights */}
            {project.highlights.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  Key Features
                </h2>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-text-muted">
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges & Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="space-y-3">
                <h3 className="font-semibold text-text-primary flex items-center gap-2">
                  <Lightbulb size={15} className="text-amber-500" />
                  Challenge
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{project.challenges}</p>
              </Card>
              <Card className="space-y-3">
                <h3 className="font-semibold text-text-primary flex items-center gap-2">
                  <Target size={15} className="text-green-500" />
                  Outcome
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{project.outcome}</p>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="space-y-5">
              <h3 className="font-semibold text-text-primary">Project Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <User2 size={14} className="text-text-muted shrink-0" />
                  <div>
                    <p className="text-text-muted text-xs">My Role</p>
                    <p className="font-medium text-text-primary">{project.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-text-muted shrink-0" />
                  <div>
                    <p className="text-text-muted text-xs">Duration</p>
                    <p className="font-medium text-text-primary">{project.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={14} className="text-text-muted shrink-0" />
                  <div>
                    <p className="text-text-muted text-xs">Year</p>
                    <p className="font-medium text-text-primary">{project.year}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="space-y-4">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <Tag size={14} />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </Card>

            <Card className="space-y-3">
              <h3 className="font-semibold text-text-primary">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </article>
  );
}
