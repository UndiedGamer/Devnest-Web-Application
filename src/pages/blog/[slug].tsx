import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import blogsData from "@/data/blogs.json";
import { ArrowLeft, Clock, Share2, User } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  readTime: string;
}

interface BlogDetailProps {
  blog: Blog;
  relatedBlogs: Blog[];
}

const blogs: Blog[] = blogsData.blogs;

export default function BlogDetailPage({ blog, relatedBlogs }: BlogDetailProps) {
  return (
    <Layout>
      <div className="min-h-screen py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex mb-8">
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="/blogs">
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Link>
            </Button>
          </div>

          <article className="glass-effect rounded-xl overflow-hidden">
            <div className="h-72 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-9xl">{blog.thumbnail}</div>
            </div>

            <div className="p-8 sm:p-12">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
                  {blog.category}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-poppins font-bold mb-6 glow-text">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {blog.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {blog.readTime}
                </div>
              </div>

              <p className="text-lg text-muted-foreground my-6 italic">{blog.excerpt}</p>

              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-foreground leading-relaxed mb-6">{blog.content}</p>
                <p className="text-foreground leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h2 className="text-2xl font-poppins font-bold mt-8 mb-4">Key Takeaways</h2>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>Point 1: Important insight from the article</li>
                  <li>Point 2: Another valuable takeaway</li>
                  <li>Point 3: Key learning to remember</li>
                </ul>
              </div>

              <div className="bg-primary/10 rounded-lg p-6 mb-12 border border-primary/20">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-poppins font-bold mb-1">Share this article</h3>
                    <p className="text-sm text-muted-foreground">Help others discover this content</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-poppins font-bold mb-3">About the Author</h3>
                <div className="flex gap-4">
                  <div className="text-4xl">{blog.thumbnail}</div>
                  <div>
                    <h4 className="font-semibold mb-1">{blog.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      Passionate tech enthusiast and core team member at DevNest. Loves sharing
                      knowledge and mentoring aspiring developers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-poppins font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="glass-effect rounded-lg overflow-hidden hover-lift transition-all group cursor-pointer h-full"
                  >
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="text-5xl group-hover:scale-110 transition-transform">
                        {relatedBlog.thumbnail}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-poppins font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogs.map((blog) => ({
      params: { slug: blog.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return { notFound: true };
  }

  const relatedBlogs = blogs.filter(
    (b) => b.category === blog.category && b.id !== blog.id,
  );

  return {
    props: {
      blog,
      relatedBlogs: relatedBlogs.slice(0, 2),
    },
  };
};
