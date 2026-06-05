import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Eye, Tag } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getAllBlogPosts, getBlogPostFull } from "@/services/data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDate, getReadingTimeLabel } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostFull(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostFull(params.slug);
  if (!post) notFound();

  return (
    <article className="pt-24 pb-20">
      <div className="container-section max-w-3xl">
        {/* Back nav */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary mb-8 group transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">{post.category}</Badge>
            {post.tags.slice(0, 2).map((tag: string) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-text-muted leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted pt-2">
            <div className="flex items-center gap-1.5">
              <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                O
              </div>
              <span className="font-medium text-text-primary">{post.author}</span>
            </div>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {getReadingTimeLabel(post.readingTime)}
            </span>
            {post.views && (
              <span className="flex items-center gap-1">
                <Eye size={13} />
                {post.views.toLocaleString("en-US")} views
              </span>
            )}
          </div>
        </header>

        {/* Cover image placeholder */}
        <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-cyan-500/10 border border-border mb-12 flex items-center justify-center overflow-hidden">
          <span className="text-8xl opacity-40">
            {post.category === "tutorial" ? "📖" :
             post.category === "career" ? "🎯" :
             post.category === "tech" ? "⚡" :
             post.category === "open-source" ? "🌐" : "💭"}
          </span>
        </div>

        {/* Article content */}
        <div className="prose-custom space-y-6 text-text-muted leading-relaxed">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <Card className="border-dashed">
              <div className="text-center space-y-3 py-8">
                <div className="text-4xl">✍️</div>
                <h3 className="font-semibold text-text-primary">Full article coming soon</h3>
                <p className="text-sm text-text-muted max-w-sm mx-auto">
                  This article is being written. Follow{" "}
                  <a href="https://twitter.com/Owais__rafiq" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    @Owais__rafiq
                  </a>{" "}
                  for updates when it publishes.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Tags footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <Tag size={13} />
              Tags:
            </span>
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
