// Mises en scène des 6 secteurs non téléphoniques, regroupées en 4 familles.
// Chaque famille suit le storyboard validé de ses secteurs, et se termine sur
// le même bloc de validation humaine partagé (shared.tsx).
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SURFACE } from "./theme";
import {
  AnonRow, Caption, CheckMark, CHECK_LEN, eased, formatEuro,
  GuardBanner, Reveal, Stage, useEnter, ValidationRow,
} from "./shared";
import type { AssemblySpec, ListSpec, QuoteSpec, ScheduleSpec } from "./sectors2";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: FONTS.body,
      fontSize: 27,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      color: COLORS.textMuted,
      marginBottom: 28,
      alignSelf: "flex-start",
    }}
  >
    {children}
  </div>
);

// ===========================================================================
// FAMILLE LISTE — pharmacie, opticien
// ===========================================================================
const ROW_H = 66;
const ROW_GAP = 10;

const RowStack: React.FC<{
  s: ListSpec;
  dims: number[];
  order?: number[];
  highlight?: boolean[];
}> = ({ s, dims, order, highlight }) => {
  const idx = order ?? s.rows.map((_, i) => i);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ROW_GAP }}>
      {idx.map((i, pos) => (
        <AnonRow
          key={i}
          initials={s.rows[i].initials}
          meta={s.rows[i].meta}
          dim={dims[pos]}
          highlighted={highlight?.[pos]}
          h={ROW_H}
        />
      ))}
    </div>
  );
};

export const ListShot1: React.FC<{ s: ListSpec }> = ({ s }) => {
  const f = useCurrentFrame();
  const dims = s.rows.map((_, i) => interpolate(f, [i * 2, i * 2 + 9], [0, 1], clamp));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {s.guard && <GuardBanner text={s.guard} />}
      <Stage width={1420} height={780} pad={40}>
        <SectionTitle>{s.listTitle}</SectionTitle>
        <RowStack s={s} dims={dims} />
      </Stage>
      <Caption delay={4}>{s.captions[0]}</Caption>
    </AbsoluteFill>
  );
};

export const ListShot2: React.FC<{ s: ListSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    {s.guard && <GuardBanner text={s.guard} />}
    <Stage width={1620} height={760} pad={64}>
      <Reveal at={3} span={16}>
        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 600,
            fontSize: 50,
            lineHeight: 1.3,
            color: COLORS.text,
            textAlign: "center",
            maxWidth: 1400,
          }}
        >
          {s.criterion}
        </div>
      </Reveal>
      <div style={{ marginTop: 54, display: "flex", flexDirection: "column", gap: ROW_GAP, opacity: 0.42 }}>
        {s.rows.slice(0, 4).map((r) => (
          <AnonRow key={r.initials} initials={r.initials} meta={r.meta} h={ROW_H} width={1300} />
        ))}
      </div>
    </Stage>
    <Caption delay={2}>{s.captions[1]}</Caption>
  </AbsoluteFill>
);

export const ListShot3: React.FC<{ s: ListSpec }> = ({ s }) => {
  const f = useCurrentFrame();
  const scanY = interpolate(f, [2, 40], [0, s.rows.length * (ROW_H + ROW_GAP)], clamp);
  const dims = s.rows.map((r, i) => {
    const passed = scanY > i * (ROW_H + ROW_GAP) + ROW_H / 2;
    const fade = interpolate(f, [0, 6], [1, 1], clamp);
    return passed && !r.eligible ? 0.2 : fade;
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {s.guard && <GuardBanner text={s.guard} />}
      <Stage width={1420} height={780} pad={40}>
        <SectionTitle>{s.listTitle}</SectionTitle>
        <div style={{ position: "relative" }}>
          <RowStack s={s} dims={dims} />
          <div
            style={{
              position: "absolute",
              left: -20,
              right: -20,
              top: scanY,
              height: 3,
              background: COLORS.accent,
              opacity: 0.9,
            }}
          />
        </div>
      </Stage>
      <Caption delay={2}>{s.captions[2]}</Caption>
    </AbsoluteFill>
  );
};

export const ListShot4: React.FC<{ s: ListSpec }> = ({ s }) => {
  const f = useCurrentFrame();
  const elig = s.rows.map((r, i) => (r.eligible ? i : -1)).filter((i) => i >= 0);
  const rest = s.rows.map((r, i) => (r.eligible ? -1 : i)).filter((i) => i >= 0);
  const order = [...elig, ...rest];
  const dims = order.map((i, pos) =>
    pos < elig.length ? 1 : interpolate(f, [4, 16], [1, 0.18], clamp)
  );
  const highlight = order.map((_, pos) => pos < elig.length);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {s.guard && <GuardBanner text={s.guard} />}
      <Stage width={1420} height={780} pad={40}>
        <SectionTitle>{s.listTitle}</SectionTitle>
        <RowStack s={s} dims={dims} order={order} highlight={highlight} />
      </Stage>
      <Caption delay={2}>{s.captions[3]}</Caption>
    </AbsoluteFill>
  );
};

const ProposalCard: React.FC<{ s: ListSpec; ticked: boolean[]; validation?: boolean }> = ({
  s,
  ticked,
  validation,
}) => {
  const kept = s.rows.filter((r) => r.eligible);
  return (
    <Stage width={1520} height={800} pad={50}>
      <SectionTitle>{s.proposalTitle}</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: ROW_GAP }}>
        {kept.map((r, i) => (
          <AnonRow
            key={r.initials}
            initials={r.initials}
            meta={r.meta}
            showBox
            checked={ticked[i]}
            highlighted={ticked[i]}
            h={ROW_H}
            width={1360}
          />
        ))}
      </div>
      {validation && (
        <ValidationRow
          awaitingLabel={s.awaitingLabel}
          validatedLabel={s.validatedLabel}
          buttonLabel={s.buttonLabel}
          width={1360}
        />
      )}
    </Stage>
  );
};

export const ListShot5: React.FC<{ s: ListSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    {s.guard && <GuardBanner text={s.guard} />}
    <ProposalCard s={s} ticked={s.ticked.map(() => false)} />
    <Caption delay={2}>{s.captions[4]}</Caption>
  </AbsoluteFill>
);

export const ListShot6: React.FC<{ s: ListSpec }> = ({ s }) => {
  const f = useCurrentFrame();
  // Les cases se cochent une à une — et celles que le pharmacien laisse de
  // côté restent vides jusqu'au bout. C'est le cœur du plan.
  const ticked = s.ticked.map((want, i) => (want ? f >= 8 + i * 7 : false));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {s.guard && <GuardBanner text={s.guard} />}
      <ProposalCard s={s} ticked={ticked} />
      <Caption delay={2}>{s.captions[5]}</Caption>
    </AbsoluteFill>
  );
};

export const ListShot7: React.FC<{ s: ListSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    {s.guardValidation && <GuardBanner text={s.guardValidation} />}
    <ProposalCard s={s} ticked={s.ticked} validation />
    <Caption delay={2}>{s.captions[6]}</Caption>
  </AbsoluteFill>
);

// ===========================================================================
// FAMILLE ASSEMBLAGE — formation, cosmétique
// ===========================================================================
const Chip: React.FC<{ label: string; style?: React.CSSProperties; accent?: boolean }> = ({
  label,
  style,
  accent,
}) => (
  <div
    style={{
      padding: "18px 30px",
      borderRadius: 16,
      background: accent ? COLORS.accentSoft : SURFACE.dim,
      border: `1px solid ${accent ? COLORS.accentBorder : SURFACE.borderSoft}`,
      fontFamily: FONTS.body,
      fontSize: 30,
      color: COLORS.text,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {label}
  </div>
);

const SCATTER = [
  { x: -520, y: -250, r: -7 },
  { x: 180, y: -300, r: 5 },
  { x: 520, y: -140, r: -4 },
  { x: -420, y: 90, r: 6 },
  { x: 60, y: 40, r: -3 },
  { x: 460, y: 200, r: 8 },
  { x: -180, y: 270, r: -6 },
];

export const AsmShot1: React.FC<{ s: AssemblySpec }> = ({ s }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Stage width={1760} height={880}>
        <div style={{ position: "relative", width: 1600, height: 760 }}>
          {s.items.map((it, i) => {
            const p = SCATTER[i % SCATTER.length];
            const o = interpolate(f, [i * 3, i * 3 + 10], [0, 1], clamp);
            const drift = interpolate(f, [0, 47], [0, 10], clamp);
            return (
              <div
                key={it}
                style={{
                  position: "absolute",
                  left: 800 + p.x,
                  top: 380 + p.y + drift * (i % 2 ? 1 : -1),
                  transform: `translate(-50%, -50%) rotate(${p.r}deg)`,
                  opacity: o,
                }}
              >
                <Chip label={it} />
              </div>
            );
          })}
        </div>
      </Stage>
      <Caption delay={4}>{s.captions[0]}</Caption>
    </AbsoluteFill>
  );
};

export const AsmShot2: React.FC<{ s: AssemblySpec }> = ({ s }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Stage width={1300} height={900} pad={56}>
        <SectionTitle>{s.targetsTitle}</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
          {s.targets.map((t, i) => {
            const o = interpolate(f, [2 + i * 3, 10 + i * 3], [0, 1], clamp);
            const x = interpolate(f, [2 + i * 3, 10 + i * 3], [-24, 0], clamp);
            return (
              <div key={t} style={{ opacity: o, transform: `translateX(${x}px)` }}>
                <Chip label={t} style={{ width: "100%", boxSizing: "border-box" }} />
              </div>
            );
          })}
        </div>
      </Stage>
      <Caption delay={2}>{s.captions[1]}</Caption>
    </AbsoluteFill>
  );
};

/** Colonne items → colonne cibles, chaque item rejoignant sa cible. */
export const AsmShot3: React.FC<{ s: AssemblySpec }> = ({ s }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Stage width={1800} height={900} pad={54}>
        <div style={{ display: "flex", gap: 60, width: "100%", height: "100%", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
            {s.items.map((it, i) => {
              const sent = interpolate(f, [4 + i * 4, 14 + i * 4], [0, 1], clamp);
              return (
                <div key={it} style={{ transform: `translateX(${sent * 34}px)`, opacity: 1 - sent * 0.45 }}>
                  <Chip label={it} style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
            {s.targets.map((t, i) => {
              const got = interpolate(f, [10 + i * 4, 20 + i * 4], [0, 1], clamp);
              return (
                <div key={t} style={{ opacity: 0.45 + got * 0.55 }}>
                  <Chip label={t} accent={got > 0.6} style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
              );
            })}
          </div>
        </div>
      </Stage>
      <Caption delay={2}>{s.captions[2]}</Caption>
    </AbsoluteFill>
  );
};

const Checklist: React.FC<{
  s: AssemblySpec;
  checkedAt: (i: number) => number;
  emphasiseGaps?: boolean;
  validation?: boolean;
  ready?: boolean;
}> = ({ s, checkedAt, emphasiseGaps, validation, ready }) => {
  const f = useCurrentFrame();
  return (
    // Plan de validation légèrement plus court : sur la cosmétique, le
    // bandeau de garde-fou doit rester dégagé au-dessus de la carte.
    <Stage width={1520} height={validation ? 840 : 900} pad={validation ? 44 : 58}>
      <SectionTitle>{ready ? s.readyLabel : s.targetsTitle}</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
        {s.targets.map((t, i) => {
          const at = checkedAt(i);
          const isGap = s.gaps.includes(i);
          const drawn = at < 0 ? 0 : interpolate(f, [at, at + 8], [0, CHECK_LEN], clamp);
          const dim = emphasiseGaps && !isGap ? 0.38 : 1;
          return (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "16px 26px",
                borderRadius: 16,
                background: isGap && emphasiseGaps ? COLORS.accentSoft : SURFACE.dim,
                border: `1px solid ${isGap && emphasiseGaps ? COLORS.accent : SURFACE.borderSoft}`,
                opacity: dim,
                boxSizing: "border-box",
              }}
            >
              <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {at >= 0 ? (
                  <CheckMark drawn={drawn} />
                ) : (
                  <div style={{ width: 28, height: 28, borderRadius: 8, border: `2px solid ${SURFACE.border}` }} />
                )}
              </div>
              <span style={{ fontFamily: FONTS.body, fontSize: 30, color: COLORS.text }}>{t}</span>
            </div>
          );
        })}
      </div>
      {validation && (
        <ValidationRow
          awaitingLabel={s.awaitingLabel}
          validatedLabel={s.validatedLabel}
          buttonLabel={s.buttonLabel}
          width={1400}
        />
      )}
    </Stage>
  );
};

export const AsmShot4: React.FC<{ s: AssemblySpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <Checklist s={s} checkedAt={(i) => (s.gaps.includes(i) ? -1 : 4 + i * 5)} />
    <Caption delay={2}>{s.captions[3]}</Caption>
  </AbsoluteFill>
);

export const AsmShot5: React.FC<{ s: AssemblySpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    {/* Les manques sont montrés, pas masqués. */}
    <Checklist s={s} checkedAt={(i) => (s.gaps.includes(i) ? -1 : 0)} emphasiseGaps />
    <Caption delay={2}>{s.captions[4]}</Caption>
  </AbsoluteFill>
);

export const AsmShot6: React.FC<{ s: AssemblySpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <Checklist
      s={s}
      checkedAt={(i) => (s.gaps.includes(i) ? 10 + s.gaps.indexOf(i) * 12 : 0)}
    />
    <Caption delay={2}>{s.captions[5]}</Caption>
  </AbsoluteFill>
);

export const AsmShot7: React.FC<{ s: AssemblySpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    {s.guardValidation && <GuardBanner text={s.guardValidation} />}
    <Checklist s={s} checkedAt={() => 0} validation ready />
    <Caption delay={2}>{s.captions[6]}</Caption>
  </AbsoluteFill>
);

// ===========================================================================
// FAMILLE DEVIS — btp
// ===========================================================================

/** Ligne de devis : entrée échelonnée et décélérée, jamais un affichage sec. */
const QuoteLine: React.FC<{
  label: string;
  amount: number;
  at: number;
  reviewed?: boolean;
  dim?: number;
}> = ({ label, amount, at, reviewed, dim = 1 }) => {
  const enter = useEnter(at, 13, 16);
  return (
    <div
      style={{
        ...enter,
        opacity: (enter.opacity as number) * dim,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "20px 18px",
        borderRadius: 12,
        background: reviewed ? COLORS.accentSoft : "transparent",
        borderBottom: `1px solid ${SURFACE.borderSoft}`,
      }}
    >
      <span style={{ fontFamily: FONTS.body, fontSize: 30, color: COLORS.textMuted }}>{label}</span>
      <span style={{
          fontFamily: FONTS.display,
          fontWeight: 600,
          fontSize: 38,
          color: COLORS.text,
          wordSpacing: 3,
          whiteSpace: "nowrap",
        }}
      >
        {formatEuro(amount)}
      </span>
    </div>
  );
};

const QuoteCard: React.FC<{
  s: QuoteSpec;
  /** Frame d'entrée de chaque ligne, ou -1 pour la masquer. */
  lineAt: (i: number) => number;
  total?: number;
  totalSize?: number;
  discountAt?: number;
  draft?: boolean;
  reviewIndex?: number;
  corrected?: boolean;
  validation?: boolean;
  linesDim?: number;
}> = ({ s, lineAt, total, totalSize = 62, discountAt, draft, reviewIndex, corrected, validation, linesDim = 1 }) => {
  const f = useCurrentFrame();
  const head = useEnter(0, 10, 8);
  return (
    <Stage width={1620} height={900} pad={58}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", ...head }}>
        <SectionTitle>{s.title}</SectionTitle>
        {/* Les montants sont un exemple, et le disent. */}
        <div
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            border: `1px solid ${SURFACE.borderSoft}`,
            fontFamily: FONTS.body,
            fontSize: 24,
            color: COLORS.textMuted,
            marginBottom: 28,
          }}
        >
          {s.exampleTag}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        {s.lines.map((l, i) => {
          const at = lineAt(i);
          if (at < 0) return null;
          const amount = corrected && i === s.correctedIndex ? s.correctedAmount : l.amount;
          return (
            <QuoteLine
              key={l.label}
              label={l.label}
              amount={amount}
              at={at}
              reviewed={reviewIndex === i}
              dim={linesDim}
            />
          );
        })}
        {discountAt !== undefined && (
          <div
            style={{
              ...useEnter(discountAt, 12, 14),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "20px 18px",
              borderBottom: `1px solid ${SURFACE.borderSoft}`,
            }}
          >
            <span style={{ fontFamily: FONTS.body, fontSize: 30, color: COLORS.textMuted }}>{s.discountLabel}</span>
            <span
              style={{
                fontFamily: FONTS.display,
                fontWeight: 600,
                fontSize: 38,
                color: COLORS.accent,
                wordSpacing: 3,
                whiteSpace: "nowrap",
              }}
            >
              −{" "}{formatEuro(s.discountValue)}
            </span>
          </div>
        )}
        {total !== undefined && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 18px 0" }}>
            <span style={{ fontFamily: FONTS.body, fontSize: 32, color: COLORS.textMuted }}>Total</span>
            <span style={{
                fontFamily: FONTS.display,
                fontWeight: 600,
                fontSize: totalSize,
                color: COLORS.text,
                wordSpacing: 4,
                whiteSpace: "nowrap",
              }}
            >
              {formatEuro(total)}
            </span>
          </div>
        )}
        {draft && (
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 18, ...useEnter(4, 14, 10) }}>
            <div
              style={{
                padding: "14px 30px",
                borderRadius: 12,
                border: `2px solid ${COLORS.accent}`,
                background: COLORS.accentSoft,
                fontFamily: FONTS.display,
                fontWeight: 600,
                fontSize: 34,
                color: COLORS.text,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {s.draftLabel}
            </div>
            <span style={{ fontFamily: FONTS.body, fontSize: 29, color: COLORS.textMuted }}>{s.draftNote}</span>
          </div>
        )}
      </div>
      {validation && (
        <ValidationRow
          awaitingLabel={s.awaitingLabel}
          validatedLabel={s.validatedLabel}
          buttonLabel={s.buttonLabel}
          width={1480}
        />
      )}
    </Stage>
  );
};

/**
 * Plan 1 — la demande client.
 * Le cadre était nettement trop grand pour deux lignes : il paraissait
 * abandonné plutôt qu'aéré. Cadre resserré, texte agrandi, et un intitulé
 * discret au-dessus pour donner un point d'ancrage.
 */
export const QuoteShot1: React.FC<{ s: QuoteSpec }> = ({ s }) => {
  const head = useEnter(0, 12, 10);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Stage width={1500} height={600} pad={56}>
        <div
          style={{
            ...head,
            fontFamily: FONTS.body,
            fontSize: 27,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: COLORS.textMuted,
            marginBottom: 34,
          }}
        >
          Demande reçue
        </div>
        {s.request.map((line, i) => (
          <Reveal key={line} at={5 + i * 6} span={13}>
            <div
              style={{
                fontFamily: FONTS.display,
                fontWeight: 600,
                fontSize: 66,
                lineHeight: 1.28,
                color: COLORS.text,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {line}
            </div>
          </Reveal>
        ))}
      </Stage>
      <Caption delay={2}>{s.captions[0]}</Caption>
    </AbsoluteFill>
  );
};

/** Plan 2 — les postes se posent, échelonnés de 7 frames. */
export const QuoteShot2: React.FC<{ s: QuoteSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <QuoteCard s={s} lineAt={(i) => 2 + i * 7} />
    <Caption delay={2}>{s.captions[1]}</Caption>
  </AbsoluteFill>
);

/**
 * Plan 3 — le total.
 * Vrai compteur : la somme monte de 0 au sous-total avec décélération, au
 * lieu de sauter de palier en palier. Les lignes s'estompent pour qu'un seul
 * élément domine la scène.
 */
export const QuoteShot3: React.FC<{ s: QuoteSpec }> = ({ s }) => {
  const f = useCurrentFrame();
  const total = eased(f, [2, 38], [0, s.subtotal]);
  const dim = eased(f, [4, 20], [1, 0.55]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <QuoteCard s={s} lineAt={() => 0} total={total} totalSize={78} linesDim={dim} />
      <Caption delay={2}>{s.captions[2]}</Caption>
    </AbsoluteFill>
  );
};

/** Plan 4 — la remise entre, le total redescend en douceur. */
export const QuoteShot4: React.FC<{ s: QuoteSpec }> = ({ s }) => {
  const f = useCurrentFrame();
  const total = eased(f, [10, 34], [s.subtotal, s.subtotal - s.discountValue]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <QuoteCard s={s} lineAt={() => 0} discountAt={4} total={total} linesDim={0.62} />
      <Caption delay={2}>{s.captions[3]}</Caption>
    </AbsoluteFill>
  );
};

export const QuoteShot5: React.FC<{ s: QuoteSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <QuoteCard s={s} lineAt={() => 0} discountAt={0} total={s.subtotal - s.discountValue} draft linesDim={0.62} />
    <Caption delay={2}>{s.captions[4]}</Caption>
  </AbsoluteFill>
);

/** Plan 6 — relecture ligne à ligne, puis correction d'un montant. */
export const QuoteShot6: React.FC<{ s: QuoteSpec }> = ({ s }) => {
  const f = useCurrentFrame();
  const idx = Math.min(s.lines.length - 1, Math.floor(f / 7));
  const corrected = f >= 30;
  const delta = s.correctedAmount - s.lines[s.correctedIndex].amount;
  const total = eased(f, [30, 44], [s.subtotal - s.discountValue, s.subtotal - s.discountValue + delta]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <QuoteCard
        s={s}
        lineAt={() => 0}
        discountAt={0}
        total={total}
        draft
        reviewIndex={idx}
        corrected={corrected}
      />
      <Caption delay={2}>{s.captions[5]}</Caption>
    </AbsoluteFill>
  );
};

export const QuoteShot7: React.FC<{ s: QuoteSpec }> = ({ s }) => {
  const delta = s.correctedAmount - s.lines[s.correctedIndex].amount;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <QuoteCard
        s={s}
        lineAt={() => 0}
        discountAt={0}
        total={s.subtotal - s.discountValue + delta}
        corrected
        validation
      />
      <Caption delay={2}>{s.captions[6]}</Caption>
    </AbsoluteFill>
  );
};

// ===========================================================================
// FAMILLE PLANNING — sport
// ===========================================================================
const CourseGrid: React.FC<{
  s: ScheduleSpec;
  showFull?: boolean;
  freed?: boolean;
  dim?: number;
}> = ({ s, showFull, freed, dim = 1 }) => (
  <div style={{ opacity: dim }}>
    <div style={{ display: "flex", gap: 18, marginBottom: 16 }}>
      <div style={{ width: 110 }} />
      {s.columns.map((c) => (
        <div
          key={c}
          style={{ width: 262, textAlign: "center", fontFamily: FONTS.body, fontSize: 27, color: COLORS.textMuted }}
        >
          {c}
        </div>
      ))}
    </div>
    {s.rows.map((r, row) => (
      <div key={r} style={{ display: "flex", gap: 18, marginBottom: 18 }}>
        <div
          style={{
            width: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontFamily: FONTS.body,
            fontSize: 27,
            color: COLORS.textMuted,
          }}
        >
          {r}
        </div>
        {s.columns.map((c, col) => {
          const isFull = showFull && row === s.fullRow && col === s.fullCol;
          return (
            <div
              key={c}
              style={{
                width: 262,
                height: 150,
                borderRadius: 18,
                background: isFull ? COLORS.accentSoft : SURFACE.dim,
                border: `1px solid ${isFull ? COLORS.accent : SURFACE.borderSoft}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.display,
                fontWeight: 600,
                fontSize: 30,
                color: COLORS.text,
              }}
            >
              {isFull ? (freed ? "1 place" : s.fullLabel) : (
                <div style={{ width: 120, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.20)" }} />
              )}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

export const SchedShot1: React.FC<{ s: ScheduleSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <Stage width={1780} height={800}>
      <CourseGrid s={s} />
    </Stage>
    <Caption delay={4}>{s.captions[0]}</Caption>
  </AbsoluteFill>
);

export const SchedShot2: React.FC<{ s: ScheduleSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <Stage width={1780} height={800}>
      <CourseGrid s={s} showFull />
    </Stage>
    <Caption delay={2}>{s.captions[1]}</Caption>
  </AbsoluteFill>
);

/**
 * Plan 3 — les rappels partent vers les inscrits.
 * Les pastilles étaient des ronds gris sans identité, posés sur le fond :
 * elles ne disaient pas « un rappel part ». Elles portent désormais la
 * cloche de notification, la bordure d'accent et une ombre, partent
 * échelonnées et décélèrent en s'éloignant.
 */
export const SchedShot3: React.FC<{ s: ScheduleSpec }> = ({ s }) => {
  const f = useCurrentFrame();
  const dots = Array.from({ length: 9 });
  const head = useEnter(0, 12, 12);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Stage width={1560} height={860}>
        <div style={{ position: "relative", width: 1400, height: 700 }}>
          <div
            style={{
              ...head,
              position: "absolute",
              left: "50%",
              top: 40,
              transform: `translateX(-50%) ${head.transform}`,
              padding: "24px 48px",
              borderRadius: 20,
              background: COLORS.accentSoft,
              border: `2px solid ${COLORS.accent}`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              fontFamily: FONTS.display,
              fontWeight: 600,
              fontSize: 40,
              color: COLORS.text,
            }}
          >
            {s.fullSlotLabel}
          </div>
          {dots.map((_, i) => {
            const start = 3 + i * 3;
            const p = eased(f, [start, start + 30], [0, 1]);
            const endX = 130 + (i / (dots.length - 1)) * 1140;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 700 + (endX - 700) * p,
                  top: 190 + p * 400,
                  width: 104,
                  height: 104,
                  borderRadius: "50%",
                  background: `linear-gradient(150deg, ${SURFACE.cardHi}, ${SURFACE.card})`,
                  border: `2px solid ${COLORS.accentBorder}`,
                  boxShadow: "0 16px 34px rgba(0,0,0,0.45)",
                  opacity: p > 0 ? Math.min(1, p * 4) * (1 - p * 0.3) : 0,
                  transform: `translate(-50%, -50%) scale(${(0.72 + p * 0.28).toFixed(3)})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3a5.5 5.5 0 0 0-5.5 5.5v3.2L5 15h14l-1.5-3.3V8.5A5.5 5.5 0 0 0 12 3Z"
                    stroke={COLORS.accent}
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path d="M10.2 17.6a1.9 1.9 0 0 0 3.6 0" stroke={COLORS.accent} strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>
            );
          })}
        </div>
      </Stage>
      <Caption delay={2}>{s.captions[2]}</Caption>
    </AbsoluteFill>
  );
};

export const SchedShot4: React.FC<{ s: ScheduleSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <Stage width={1780} height={800}>
      <CourseGrid s={s} showFull freed />
    </Stage>
    <Caption delay={2}>{s.captions[3]}</Caption>
  </AbsoluteFill>
);

const WaitList: React.FC<{ s: ScheduleSpec; promote?: boolean }> = ({ s, promote }) => {
  const f = useCurrentFrame();
  return (
    <Stage width={1420} height={660} pad={54}>
      <SectionTitle>Liste d'attente</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
        {s.waitlist.map((w, i) => {
          const first = i === 0;
          const enter = useEnter(2 + i * 6, 14, 18);
          const lift = promote && first ? eased(f, [8, 26], [0, -16]) : 0;
          return (
            <div key={w} style={{ ...enter, transform: `translateY(${(lift).toFixed(2)}px)` }}>
              <AnonRow
                initials={w}
                meta={first ? "1er sur la liste" : `${i + 1}e`}
                highlighted={!!promote && first}
                dim={promote && !first ? 0.42 : 1}
                width={1280}
                h={92}
              />
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

export const SchedShot5: React.FC<{ s: ScheduleSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <WaitList s={s} promote />
    <Caption delay={2}>{s.captions[4]}</Caption>
  </AbsoluteFill>
);

const ProposalSport: React.FC<{ s: ScheduleSpec; validation?: boolean }> = ({ s, validation }) => (
  <Stage width={1520} height={680} pad={54}>
    <SectionTitle>{s.proposalTitle}</SectionTitle>
    <div style={{ width: "100%" }}>
      {[
        { k: "Cours", v: s.fullSlotLabel },
        { k: "Places disponibles", v: "1" },
        { k: "Proposée à", v: s.proposalRow },
      ].map((row) => (
        <div
          key={row.k}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "26px 0",
            borderBottom: `1px solid ${SURFACE.borderSoft}`,
          }}
        >
          <span style={{ fontFamily: FONTS.body, fontSize: 32, color: COLORS.textMuted }}>{row.k}</span>
          <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 44, color: COLORS.text }}>{row.v}</span>
        </div>
      ))}
    </div>
    {validation && (
      <ValidationRow
        awaitingLabel={s.awaitingLabel}
        validatedLabel={s.validatedLabel}
        buttonLabel={s.buttonLabel}
        width={1400}
      />
    )}
  </Stage>
);

export const SchedShot6: React.FC<{ s: ScheduleSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <ProposalSport s={s} />
    <Caption delay={2}>{s.captions[5]}</Caption>
  </AbsoluteFill>
);

export const SchedShot7: React.FC<{ s: ScheduleSpec }> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <ProposalSport s={s} validation />
    <Caption delay={2}>{s.captions[6]}</Caption>
  </AbsoluteFill>
);
