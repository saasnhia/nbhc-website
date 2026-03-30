import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Logo from "../../../components/Logo";

const contentDir = path.join(process.cwd(), "content", "blog");

function getAllSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function getPost(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags as string[]) || [],
    content,
  };
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

function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  let html = "";
  let inList = false;
  let inTable = false;
  let tableHeader = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      if (inTable) {
        html += "</tbody></table>";
        inTable = false;
        tableHeader = false;
      }
      continue;
    }

    // Table rows
    if (line.trim().startsWith("|")) {
      // Check if this is the separator row (|---|---|)
      if (/^\|[\s-|]+\|$/.test(line.trim())) {
        tableHeader = false;
        continue;
      }

      const cells = line
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => inlineFormat(c.trim()));

      if (!inTable) {
        inTable = true;
        tableHeader = true;
        html += '<table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px">';
        html += "<thead><tr>";
        cells.forEach((c) => {
          html += `<th style="text-align:left;padding:10px 16px;border-bottom:2px solid var(--border);color:var(--gold);font-family:var(--font-syne)">${c}</th>`;
        });
        html += "</tr></thead><tbody>";
      } else {
        html += "<tr>";
        cells.forEach((c) => {
          html += `<td style="padding:8px 16px;border-bottom:1px solid var(--border);color:var(--text-muted)">${c}</td>`;
        });
        html += "</tr>";
      }
      continue;
    }

    if (inTable) {
      html += "</tbody></table>";
      inTable = false;
      tableHeader = false;
    }

    // Headings
    if (line.startsWith("### ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h3 style="font-family:var(--font-syne);font-size:18px;font-weight:600;color:var(--gold);margin:32px 0 12px">${inlineFormat(line.slice(4))}</h3>`;
      continue;
    }
    if (line.startsWith("## ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h2 style="font-family:var(--font-syne);font-size:22px;font-weight:600;color:var(--gold);margin:40px 0 16px">${inlineFormat(line.slice(3))}</h2>`;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<blockquote style="border-left:3px solid var(--gold);padding:12px 20px;margin:20px 0;color:var(--text-muted);font-style:italic;background:var(--surface);border-radius:0 8px 8px 0">${inlineFormat(line.slice(2))}</blockquote>`;
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      if (!inList) {
        inList = true;
        html += '<ul style="margin:12px 0;padding-left:24px">';
      }
      html += `<li style="margin:6px 0;color:var(--text-muted)">${inlineFormat(line.slice(2))}</li>`;
      continue;
    }

    // Close list if open
    if (inList) {
      html += "</ul>";
      inList = false;
    }

    // Paragraph
    html += `<p style="margin:16px 0;color:var(--text-muted)">${inlineFormat(line)}</p>`;
  }

  if (inList) html += "</ul>";
  if (inTable) html += "</tbody></table>";

  return html;
}

function inlineFormat(text: string): string {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text)">$1</strong>');
  // Links
  text = text.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" style="color:var(--gold);text-decoration:none" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return text;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: `${post.title} — NBHC`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const htmlContent = renderMarkdown(post.content);

  return (
    <main
      style={{
        maxWidth: 800,
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
        href="/blog"
        style={{
          color: "var(--gold)",
          textDecoration: "none",
          fontSize: 14,
          display: "inline-block",
          marginBottom: 32,
        }}
      >
        &larr; Retour au blog
      </Link>

      <div style={{ marginBottom: 48 }}>
        <Logo variant="footer" />
      </div>

      <div
        style={{
          fontSize: 13,
          color: "var(--text-dim)",
          marginBottom: 12,
        }}
      >
        {formatDateFR(post.date)}
      </div>

      <h1
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "var(--gold)",
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        {post.title}
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 48 }}>
        {post.tags.map((tag) => (
          <span key={tag} className="blog-tag">
            {tag}
          </span>
        ))}
      </div>

      <article dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </main>
  );
}
