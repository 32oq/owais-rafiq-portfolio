import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Blog } from "@/components/sections/Blog";
import { getAllBlogPosts } from "@/services/data";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Writing about full-stack development, Node.js, system design, and life as an engineer from Kashmir.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="pt-16">
      <div className="container-section py-12">
        <div className="mb-12">
          <span className="tag mb-3 inline-block">Writing</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Blog & Articles
          </h1>
          <p className="text-xl text-text-muted max-w-2xl">
            Thoughts on engineering, career, and the things I learn along the way.
          </p>
        </div>
      </div>
      <Blog posts={posts} showAll />
    </div>
  );
}
