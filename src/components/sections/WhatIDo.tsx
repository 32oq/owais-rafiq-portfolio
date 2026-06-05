"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Server, Monitor, Smartphone, Link2, Database, Zap, Globe, Code2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const services = [
  {
    icon: Server,
    title: "Backend Engineering",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-900/50",
    iconBg: "bg-green-100 dark:bg-green-900/40",
    iconColor: "text-green-600 dark:text-green-400",
    description: "Building fast, scalable server-side systems that handle real traffic without breaking a sweat.",
    stack: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Redis", "Socket.io"],
  },
  {
    icon: Monitor,
    title: "Frontend Development",
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200 dark:border-indigo-900/50",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    description: "Crafting responsive, accessible UIs that feel fast and look sharp across every device.",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-900/50",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    iconColor: "text-violet-600 dark:text-violet-400",
    description: "One codebase, two platforms — shipping polished iOS and Android apps using Flutter.",
    stack: ["Flutter", "Dart", "Android", "iOS", "State Management", "Platform APIs"],
  },
  {
    icon: Database,
    title: "Database & API Design",
    color: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    border: "border-cyan-200 dark:border-cyan-900/50",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/40",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    description: "Designing clean data models, optimised queries, and developer-friendly API contracts.",
    stack: ["MongoDB", "SQL / MySQL", "Mongoose ODM", "Aggregation", "Indexing", "API Versioning"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

interface WhatIDoProps {
  yearsOfExperience: number;
}

export function WhatIDo({ yearsOfExperience }: WhatIDoProps) {
  return (
    <section id="whatido" className="section-padding bg-background overflow-hidden">
      <div className="container-section">
        <SectionHeader
          badge="What I Do"
          title="How I can help you"
          subtitle="From databases to UI — I build full-stack products end to end, and ship them."
        />

        {/* ── SVG Illustration Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-14 rounded-3xl overflow-hidden border border-indigo-100 dark:border-indigo-900/40"
          style={{
            background: "linear-gradient(135deg, #eef0ff 0%, #f3f0ff 50%, #edfaff 100%)",
          }}
        >
          {/* Dark mode gradient overlay */}
          <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-indigo-950/60 dark:via-violet-950/40 dark:to-cyan-950/30 pointer-events-none" />

          {/* Decorative label */}
          <div className="absolute top-5 left-6 z-10 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/60 dark:border-slate-700/60 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wide">
              Full Stack Engineer · Active
            </span>
          </div>

          {/* Tech pills — top right */}
          <div className="absolute top-5 right-6 z-10 hidden sm:flex items-center gap-2">
            {["Node.js", "React", "Flutter"].map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-slate-900/70 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>

          {/* SVG illustration */}
          <div className="relative flex items-center justify-center px-4 py-6 sm:py-4 sm:px-8">
            <Image
              src="/images/developer-activity.svg"
              alt="Developer activity illustration showing coding and development work"
              width={1144}
              height={617}
              className="w-full max-w-3xl h-auto object-contain mx-auto relative z-10"
              style={{ maxHeight: "320px" }}
            />
          </div>

          {/* Bottom info bar */}
          <div className="relative z-10 border-t border-indigo-100 dark:border-indigo-900/40 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm px-6 py-3 flex flex-wrap items-center gap-4 justify-center sm:justify-between">
            <div className="flex items-center gap-6">
              {[
                { icon: Code2, label: `${yearsOfExperience}+ yrs coding` },
                { icon: Zap, label: "Node.js expert" },
                { icon: Globe, label: "Remote ready" },
                { icon: Link2, label: "Full stack" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <Icon size={12} className="text-indigo-500" />
                  {label}
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-500 font-mono">
              peerzadaowais36@gmail.com
            </span>
          </div>
        </motion.div>

        {/* ── Service Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`group relative rounded-2xl border p-5 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${service.bg} ${service.border}`}
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 ${service.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={20} className={service.iconColor} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {service.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-600 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-text-muted text-sm">
            Got a project in mind? Let&apos;s talk about it.
          </p>
          <a
            href="mailto:peerzadaowais36@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Zap size={14} />
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
