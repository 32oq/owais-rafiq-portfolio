"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { getLinkProps } from "@/lib/utils";
import type { Profile, SocialLink } from "@/types";

interface ContactProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

const socialIconMap: Record<string, LucideIcon> = {
  Github, Linkedin, Twitter, Mail,
};

export function Contact({ profile, socialLinks }: ContactProps) {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      description: "Best for project enquiries",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
      description: "Available during IST hours",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
      description: profile.timezone,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-section">
        <SectionHeader
          badge="Contact"
          title="Let's work together"
          subtitle="I'm always open to discussing new projects, interesting ideas, or opportunities to be part of your vision."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left — CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-text-muted leading-relaxed">
                Whether you&apos;ve got a project in mind, need technical consulting, or just want to chat about technology — my inbox is always open. I typically respond within 24 hours.
              </p>
              {profile.availableForWork && (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-green-500/30 bg-green-500/5">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      Available for opportunities
                    </p>
                    <p className="text-xs text-text-muted">{profile.availabilityNote}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact methods */}
            <div className="space-y-3">
              {contactMethods.map(({ icon: Icon, label, value, href, description }) => (
                <Card key={label} className="group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-muted mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-text-primary hover:text-accent transition-colors truncate block"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-text-primary">{value}</p>
                      )}
                    </div>
                    <p className="text-xs text-text-muted text-right shrink-0 hidden sm:block">{description}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <LinkButton href={`mailto:${profile.email}`} size="lg" leftIcon={<Mail size={16} />} rightIcon={<ArrowRight size={14} />}>
                Send an Email
              </LinkButton>
              <LinkButton href={profile.resumeUrl} external size="lg" variant="secondary" leftIcon={<Download size={14} />}>
                Resume
              </LinkButton>
            </div>
          </motion.div>

          {/* Right — Social links card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="space-y-6"
          >
            <Card className="relative overflow-hidden">
              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary text-lg mb-1">Find me online</h3>
                  <p className="text-sm text-text-muted">
                    I&apos;m active on these platforms — feel free to reach out or follow along.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {socialLinks.map((social) => {
                    const Icon = socialIconMap[social.icon];
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        {...getLinkProps(social.url)}
                        className="flex items-center gap-4 p-3 rounded-xl border border-border hover:border-accent/40 hover:bg-surface-2 transition-all duration-200 group"
                      >
                        <div className="h-9 w-9 rounded-lg bg-surface-2 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                          {Icon && <Icon size={16} className="text-text-muted group-hover:text-accent transition-colors" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">{social.platform}</p>
                          <p className="text-xs text-text-muted truncate">@{social.username}</p>
                        </div>
                        <ArrowRight size={14} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Quick note */}
            <Card className="bg-accent/5 border-accent/20">
              <p className="text-sm text-text-muted leading-relaxed">
                <span className="font-semibold text-text-primary">Quick note:</span> I&apos;m based in Kashmir, India (IST, UTC+5:30). I&apos;m open to remote opportunities worldwide. Response time is usually within 24 hours.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
