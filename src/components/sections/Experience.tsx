"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ChevronDown, ExternalLink, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getDateRange, calculateDuration } from "@/lib/utils";
import type { ExperienceItem } from "@/types";

interface ExperienceProps {
  items: ExperienceItem[];
}

const locationTypeLabel: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

const jobTypeLabel: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
  freelance: "Freelance",
};

export function Experience({ items }: ExperienceProps) {
  const [expandedId, setExpandedId] = useState<string>(items[0]?.id ?? "");

  return (
    <section id="experience" className="section-padding bg-surface">
      <div className="container-section">
        <SectionHeader
          badge="Work Experience"
          title="Where I've worked"
          subtitle="My professional journey building real-world products and solving complex engineering challenges."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-accent via-border to-transparent hidden md:block" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="space-y-6"
          >
            {items.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="md:pl-14 relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-3.5 top-6 h-3 w-3 rounded-full border-2 border-accent bg-background hidden md:block -translate-x-1/2" />

                  <Card
                    className={`cursor-pointer transition-all duration-200 ${isExpanded ? "border-accent/40" : ""}`}
                    onClick={() => setExpandedId(isExpanded ? "" : item.id)}
                  >
                    {/* Current job indicator */}
                    {item.current && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
                    )}

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="h-12 w-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center shrink-0">
                          <Briefcase size={20} className="text-text-muted" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold text-text-primary text-lg leading-tight">
                              {item.role}
                            </h3>
                            {item.current && (
                              <Badge variant="success">Current</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {item.companyUrl ? (
                              <a
                                href={item.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-accent hover:underline flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {item.company}
                                <ExternalLink size={12} />
                              </a>
                            ) : (
                              <span className="font-medium text-accent">{item.company}</span>
                            )}
                            <span className="text-border">·</span>
                            <span className="text-sm text-text-muted">{jobTypeLabel[item.type]}</span>
                            <span className="text-border">·</span>
                            <span className="text-sm text-text-muted">{locationTypeLabel[item.locationType]}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-text-muted">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {getDateRange(item.startDate, item.endDate, item.current)}
                            </span>
                            <span className="text-border">·</span>
                            <span>{calculateDuration(item.startDate, item.endDate)}</span>
                            <span className="text-border">·</span>
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {item.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-text-muted transition-transform duration-300 shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-border space-y-5"
                      >
                        <p className="text-text-muted leading-relaxed">{item.description}</p>

                        {item.achievements.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-text-primary">Key Achievements</h4>
                            <ul className="space-y-2">
                              {item.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
                                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-text-primary">Tech Stack</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {item.techStack.map((tech) => (
                              <span key={tech} className="tag">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
