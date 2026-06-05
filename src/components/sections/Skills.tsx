"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Server, Smartphone, Wrench, Code, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getProficiencyPercent, formatYearsOfExperience } from "@/lib/utils";
import { PROFICIENCY_LEVELS } from "@/constants";
import type { SkillCategory } from "@/types";

interface SkillsProps {
  categories: SkillCategory[];
}

const categoryIconMap: Record<string, LucideIcon> = {
  Monitor, Server, Smartphone, Wrench, Code,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Skills({ categories }: SkillsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string>(categories[0]?.id ?? "");

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container-section">
        <SectionHeader
          badge="Technical Skills"
          title="What I work with"
          subtitle="A curated toolkit of technologies and frameworks I use to build scalable, maintainable software."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {categories.map((category) => {
            const Icon = categoryIconMap[category.icon] ?? Code;
            const isOpen = expandedCategory === category.id;
            const featuredSkills = category.skills.filter((s) => s.featured);
            const allSkills = category.skills;

            return (
              <motion.div key={category.id} variants={cardVariants}>
                <Card
                  className="overflow-hidden cursor-pointer"
                  onClick={() => setExpandedCategory(isOpen ? "" : category.id)}
                >
                  {/* Category header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{category.title}</h3>
                        <p className="text-sm text-text-muted">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Featured skill pills (desktop) */}
                      <div className="hidden md:flex flex-wrap gap-1.5">
                        {featuredSkills.slice(0, 4).map((skill) => (
                          <span key={skill.id} className="tag">{skill.name}</span>
                        ))}
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expanded skills */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {allSkills.map((skill) => {
                            const level = PROFICIENCY_LEVELS[skill.proficiency as keyof typeof PROFICIENCY_LEVELS];
                            const percent = getProficiencyPercent(skill.proficiency);

                            return (
                              <div key={skill.id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {skill.icon && (
                                      <span className="text-base leading-none">{skill.icon}</span>
                                    )}
                                    <span className="text-sm font-medium text-text-primary">
                                      {skill.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-text-muted font-mono">
                                      {formatYearsOfExperience(skill.yearsOfExperience)}
                                    </span>
                                    <span
                                      className={`text-xs px-1.5 py-0.5 rounded font-medium ${level?.color ?? "bg-indigo-500"} bg-opacity-20 text-text-muted`}
                                    >
                                      {level?.label}
                                    </span>
                                  </div>
                                </div>
                                <ProgressBar value={percent} animated />
                                {skill.description && (
                                  <p className="text-xs text-text-muted">{skill.description}</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
