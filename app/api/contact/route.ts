import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limit: 1 request per IP per minute
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);
  if (lastRequest && now - lastRequest < 60_000) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans une minute." },
      { status: 429 }
    );
  }
  rateLimitMap.set(ip, now);

  // Clean old entries every 100 requests
  if (rateLimitMap.size > 100) {
    for (const [key, time] of rateLimitMap) {
      if (now - time > 120_000) rateLimitMap.delete(key);
    }
  }

  try {
    const body = await req.json();
    const { nom, email, societe, message, typeProjet } = body;

    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "NBHC Contact <contact@nbhc.fr>",
      to: "harou@nbhc.fr",
      subject: `[NBHC] Nouveau contact — ${typeProjet || "Non spécifié"}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f0f11; color: #f0ede6; border-radius: 12px;">
          <h2 style="color: #C4973A; margin-bottom: 24px; font-size: 20px;">Nouveau message depuis nbhc.fr</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #8C8880; width: 120px;">Nom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #f0ede6;">${escapeHtml(nom)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #8C8880;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07);"><a href="mailto:${escapeHtml(email)}" style="color: #C4973A;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #8C8880;">Société</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #f0ede6;">${escapeHtml(societe || "—")}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #8C8880;">Projet</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #f0ede6;">${escapeHtml(typeProjet || "Non spécifié")}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.04); border-radius: 8px; border: 1px solid rgba(255,255,255,0.07);">
            <div style="color: #8C8880; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</div>
            <div style="color: #f0ede6; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>
          </div>

          <div style="margin-top: 32px; font-size: 12px; color: #3E3D3A;">
            Envoyé depuis le formulaire de contact nbhc.fr · IP: ${escapeHtml(ip)}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Réessayez plus tard." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
