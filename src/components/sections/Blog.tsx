"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar, Eye } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { formatDateShort, getReadingTimeLabel } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogProps {
  posts: BlogPost[];
  showAll?: boolean;
}

const categoryLabel: Record<string, string> = {
  tech: "Tech",
  career: "Career",
  tutorial: "Tutorial",
  thoughts: "Thoughts",
  "open-source": "Open Source",
};

const categoryVariant: Record<string, "primary" | "success" | "warning" | "default"> = {
  tech: "primary",
  tutorial: "success",
  career: "warning",
  thoughts: "default",
  "open-source": "primary",
};

export function Blog({ posts, showAll = false }: BlogProps) {
  if (!posts.length) return null;

  const displayed = showAll ? posts : posts.slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-surface">
      <div className="container-section">
        <SectionHeader
          badge="Blog"
          title="Writing & Thoughts"
          subtitle="Sharing what I learn about engineering, career, and life as a developer."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayed.map((post) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <Card hoverable className="h-full flex flex-col">
                  {/* Cover gradient */}
                  <div className="h-40 -mx-6 -mt-6 mb-5 rounded-t-lg bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                    <div className="text-5xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                      {post.category === "tutorial" ? "📖" :
                       post.category === "career" ? "🎯" :
                       post.category === "tech" ? "⚡" :
                       post.category === "open-source" ? "🌐" : "💭"}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant={categoryVariant[post.category] ?? "default"}>
                        {categoryLabel[post.category]}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors duration-150">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-text-muted">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDateShort(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {getReadingTimeLabel(post.readingTime)}
                      </span>
                    </div>
                    {post.views && (
                      <span className="flex items-center gap-1">
                        <Eye size={11} />
                        {post.views.toLocaleString("en-US")}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {!showAll && posts.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <LinkButton href="/blog" variant="secondary" size="lg" rightIcon={<ArrowUpRight size={16} />}>
              View All Posts
            </LinkButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
