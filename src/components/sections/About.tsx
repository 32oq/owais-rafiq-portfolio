"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Globe, Clock, Heart, Code2, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Profile } from "@/types";

interface AboutProps {
  profile: Profile;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as number[] } },
};

const itemVariantsDelayed = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as number[], delay: 0.15 } },
};

export function About({ profile }: AboutProps) {
  const stats = [
    { icon: Briefcase, label: "Years Experience", value: `${profile.yearsOfExperience}+` },
    { icon: Code2, label: "Projects Built", value: "20+" },
    { icon: Heart, label: "Open Source", value: "Active" },
    { icon: Globe, label: "Languages Spoken", value: `${profile.languages.length}` },
  ];

  const details = [
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Globe, label: "Timezone", value: profile.timezone },
    { icon: Clock, label: "Availability", value: profile.availabilityNote },
  ];

  // Split bio into readable paragraphs — every 2 sentences form one paragraph
  const sentences = profile.bio.split(". ").filter(Boolean);
  const bioParagraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const pair = sentences.slice(i, i + 2);
    const text = pair.join(". ") + (pair[pair.length - 1].endsWith(".") ? "" : ".");
    bioParagraphs.push(text);
  }

  return (
    <section id="about" className="section-padding bg-surface">
      <div className="container-section">
        <SectionHeader
          badge="About Me"
          title="The story behind the code"
          subtitle="A passionate engineer building great products from the mountains of Kashmir."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Bio ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Developer illustration */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/40 p-4">
              <Image
                src="/images/developer-illustration.svg"
                alt="Developer at work illustration"
                width={480}
                height={320}
                className="w-full h-auto max-h-52 object-contain mx-auto"
              />
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-3 text-text-muted leading-relaxed">
              {bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Quick details */}
            <div className="space-y-3">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-accent" />
                  </div>
                  <span className="text-sm text-text-muted min-w-[90px]">{label}</span>
                  <span className="text-sm font-semibold text-text-primary">{value}</span>
                </div>
              ))}
            </div>

            {/* Interests + Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-text-primary uppercase tracking-widest">Interests</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="default">{interest}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-text-primary uppercase tracking-widest">Languages</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.languages.map((lang) => (
                    <Badge key={lang} variant="outline">{lang}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Stats + Cards ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariantsDelayed}
            className="space-y-5"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, label, value }) => (
                <Card key={label} hoverable className="group text-center space-y-3">
                  <div className="h-10 w-10 mx-auto rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{value}</p>
                    <p className="text-xs text-text-muted mt-0.5">{label}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quote card */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
              <blockquote className="text-text-muted italic leading-relaxed text-sm">
                &ldquo;Clean code is not just about making it work — it&apos;s about making it understandable, maintainable, and elegant. Every function should tell a story.&rdquo;
              </blockquote>
              <p className="mt-3 text-sm font-semibold text-text-primary">— Owais Rafiq</p>
            </Card>

            {/* Tech DNA */}
            <Card className="space-y-4">
              <h3 className="text-sm font-semibold text-text-primary">My Tech DNA</h3>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { emoji: "⚡", name: "Node.js" },
                  { emoji: "⚛️", name: "React" },
                  { emoji: "🍃", name: "MongoDB" },
                  { emoji: "🐦", name: "Flutter" },
                  { emoji: "▲", name: "Next.js" },
                  { emoji: "🔷", name: "TypeScript" },
                ].map(({ emoji, name }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 p-2 rounded-lg bg-surface-2 hover:bg-border transition-colors cursor-default"
                  >
                    <span className="text-base">{emoji}</span>
                    <span className="text-xs font-medium text-text-muted">{name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Nationality */}
            <Card className="flex items-center gap-4 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20 border-indigo-100/80 dark:border-indigo-900/30">
              <span className="text-4xl">🏔️</span>
              <div>
                <p className="font-semibold text-text-primary text-sm">Based in Kashmir, India</p>
                <p className="text-xs text-text-muted mt-0.5">
                  Building software from the valley — open to remote worldwide
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
