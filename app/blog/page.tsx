import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Logo from "../../components/Logo";

export const metadata: Metadata = {
  title: "Blog — NBHC Studio IA & Automatisation",
  description:
    "Articles sur l'IA, l'automatisation et nos produits SaaS.",
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

function getAllPosts(): BlogPost[] {
  const contentDir = path.join(process.cwd(), "content", "blog");
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts: BlogPost[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      tags: (data.tags as string[]) || [],
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

function formatDateFR(dateStr: string): string {
  const months = [
    "janvier", "fevrier", "mars", "avril", "mai", "juin",
    "juillet", "aout", "septembre", "octobre", "novembre", "decembre",
  ];
  const d = new Date(dateStr);
  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = months[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "80px 40px",
        background: "var(--bg)",
        color: "var(--text-muted)",
        lineHeight: 1.8,
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          main { padding: 60px 20px !important; }
        }
        .blog-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px;
          background: var(--surface);
          transition: border-color 0.2s;
        }
        .blog-card:hover {
          border-color: var(--gold-border);
        }
        .blog-tag {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 12px;
          background: var(--gold-dim);
          color: var(--gold-light);
          border: 1px solid var(--gold-border);
        }
      `}</style>

      <Link
        href="/"
        style={{
          color: "var(--gold)",
          textDecoration: "none",
          fontSize: 14,
          display: "inline-block",
          marginBottom: 32,
        }}
      >
        &larr; Retour
      </Link>

      <div style={{ marginBottom: 48 }}>
        <Logo variant="footer" />
      </div>

      <h1
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "var(--gold)",
          marginBottom: 48,
        }}
      >
        Blog
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div className="blog-card">
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-dim)",
                  marginBottom: 8,
                }}
              >
                {formatDateFR(post.date)}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  marginBottom: 16,
                  lineHeight: 1.6,
                }}
              >
                {post.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
