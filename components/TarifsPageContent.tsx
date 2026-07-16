import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Nav from "./Nav";
import Footer from "./Footer";
import PricingPlanCard from "./PricingPlanCard";
import PricingSimulator from "./PricingSimulator";

const PILLAR_ICONS = ["🔍", "🔐", "🛠️", "🎓"] as const;

export default async function TarifsPageContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "tarifs" });
  const tA = await getTranslations({ locale, namespace: "tarifs.blocA" });
  const tB = await getTranslations({ locale, namespace: "tarifs.blocB" });
  const tSim = await getTranslations({ locale, namespace: "tarifs.simulator" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const pillars = [
    { title: tB("pillar1Title"), text: tB("pillar1Text") },
    { title: tB("pillar2Title"), text: tB("pillar2Text") },
    { title: tB("pillar3Title"), text: tB("pillar3Text") },
    { title: tB("pillar4Title"), text: tB("pillar4Text") },
  ];

  const tierLegend = [
    { amount: tB("legendRangeAmount"), desc: tB("legendRangeDesc") },
    { amount: tB("legendSurDevisAmount"), desc: tB("legendSurDevisDesc") },
  ];

  return (
    <main style={{ background: "var(--bg)" }}>
      <Nav />
      <div
        style={{ margin: "0 auto", padding: "160px 40px 100px" }}
        className="max-w-[900px] lg:max-w-[1120px] max-[700px]:!px-5"
      >
        <Link
          href={`/${locale}`}
          style={{
            color: "var(--gold)",
            textDecoration: "none",
            fontSize: 14,
            display: "inline-block",
            marginBottom: 32,
          }}
        >
          &larr; {tCommon("back")}
        </Link>

        {/* Hero */}
        <div
          className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
          style={{ color: "var(--gold)" }}
        >
          <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
          {t("eyebrow")}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-1.5px",
            color: "var(--text)",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          {t("h1")}
        </h1>
        <p
          style={{
            fontSize: 18,
            fontWeight: 300,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: 680,
            marginBottom: 56,
          }}
        >
          {t("intro")}
        </p>

        {/* Bloc A — Ce qu'on construit */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 10,
              letterSpacing: "-0.5px",
            }}
          >
            {tA("title")}
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 680,
            }}
          >
            {tA("intro")}
          </p>

          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-4">
            <PricingPlanCard
              badge={tA("essentielBadge")}
              tag={tA("essentielTag")}
              name={tA("essentielName")}
              price={tA("essentielPrice")}
              priceSub={tA("essentielPriceSub")}
              desc={tA("essentielDesc")}
              features={[
                tA("essentielFeature1"),
                tA("essentielFeature2"),
                tA("essentielFeature3"),
                tA("essentielFeature4"),
              ]}
            />
            <PricingPlanCard
              featured
              badge={tA("surMesureLegerBadge")}
              tag={tA("surMesureLegerTag")}
              name={tA("surMesureLegerName")}
              price={tA("surMesureLegerPrice")}
              desc={tA("surMesureLegerDesc")}
              features={[
                tA("surMesureLegerFeature1"),
                tA("surMesureLegerFeature2"),
                tA("surMesureLegerFeature3"),
                tA("surMesureLegerFeature4"),
                tA("surMesureLegerFeature5"),
              ]}
            />
            <PricingPlanCard
              badge={tA("surDevisBadge")}
              tag={tA("surDevisTag")}
              name={tA("surDevisName")}
              price={tA("surDevisPrice")}
              desc={tA("surDevisDesc")}
              features={[
                tA("surDevisFeature1"),
                tA("surDevisFeature2"),
                tA("surDevisFeature3"),
                tA("surDevisFeature4"),
                tA("surDevisFeature5"),
              ]}
              feeNote={tA("surDevisFeeNote")}
            />
          </div>

          <div
            style={{
              marginTop: 20,
              padding: "18px 20px",
              background: "rgba(196,151,58,0.05)",
              border: "1px solid var(--gold-border)",
              borderRadius: "var(--radius-sm)",
              fontSize: 13.5,
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 6,
              }}
            >
              <span>{tA("assoNote")}</span>
              <Link
                href={`/${locale}/automatisation-association-sportive`}
                style={{ color: "var(--gold-light)", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {tA("assoLink")} &rarr;
              </Link>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--text-dim)", margin: 0 }}>{tA("assoCondition")}</p>
          </div>
        </section>

        {/* Bloc B — Ce qu'on entretient */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 10,
              letterSpacing: "-0.5px",
            }}
          >
            {tB("title")}
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 680,
            }}
          >
            {tB("intro")}
          </p>

          <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-4">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "24px 24px 22px",
                }}
              >
                <span style={{ fontSize: 20, marginBottom: 12, display: "block" }}>
                  {PILLAR_ICONS[i]}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8, fontFamily: "var(--font-syne)" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 20,
              padding: "20px 22px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              fontSize: 13,
              color: "var(--text-dim)",
              lineHeight: 1.7,
            }}
          >
            <div style={{ marginBottom: 10, color: "var(--text-muted)", fontWeight: 600 }}>
              {tB("honestyIntro")}
            </div>
            <div style={{ marginBottom: 10 }}>{tB("honestyInfra")}</div>
            <div>{tB("honestyAccompagnement")}</div>

            <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-2.5" style={{ marginTop: 16 }}>
              {tierLegend.map((tier) => (
                <div
                  key={tier.amount}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "14px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: 6,
                      fontFamily: "var(--font-syne)",
                    }}
                  >
                    {tier.amount}
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.5 }}>{tier.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simulateur */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 10,
              letterSpacing: "-0.5px",
            }}
          >
            {tSim("title")}
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 680,
            }}
          >
            {tSim("intro")}
          </p>
          <PricingSimulator />
        </section>
      </div>
      <Footer />
    </main>
  );
}
