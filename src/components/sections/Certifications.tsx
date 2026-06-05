"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils";
import type { Certification } from "@/types";

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  if (!certifications.length) return null;

  return (
    <section id="certifications" className="section-padding bg-background">
      <div className="container-section">
        <SectionHeader
          badge="Certifications"
          title="Credentials & Learning"
          subtitle="Formal recognition of skills acquired through structured learning and examination."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <Card hoverable className="h-full flex flex-col group">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Award size={20} className="text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary text-sm leading-snug mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium text-accent">{cert.issuer}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-text-muted leading-relaxed flex-1 mb-4">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Calendar size={11} />
                      <span>{formatDateShort(cert.date)}</span>
                    </div>
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-accent hover:underline"
                      >
                        <CheckCircle2 size={11} />
                        Verify
                        <ExternalLink size={10} />
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle2 size={11} />
                        Verified
                      </div>
                    )}
                  </div>
                  {cert.credentialId && (
                    <p className="text-xs text-text-muted font-mono truncate">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
