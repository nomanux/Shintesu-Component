import React from "react";
import { colors } from "../../theme";
import { useLang, GUIDANCE_JA } from "../../contexts/lang";

type GuidanceProps = {
  bullets: React.ReactNode[];
  whenToUse?: string[];
  whenNotToUse?: string[];
};

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  fontSize: 13,
  lineHeight: 1.6,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 1,
  marginBottom: 6,
  marginTop: 12,
};

export default function DeveloperGuidance({ bullets, whenToUse, whenNotToUse }: GuidanceProps) {
  const [open, setOpen] = React.useState(false);
  const lang = useLang();
  const g = lang === "ja" ? GUIDANCE_JA : {
    forDevelopers: "For Developers",
    whenToUse:     "When to use",
    whenNotToUse:  "When not to use",
  };

  return (
    <div
      style={{
        marginBottom: 24,
        backgroundColor: "#F0F9FF",
        border: "1px solid #E0F2FE",
        borderRadius: 4,
        overflow: "hidden",
        color: colors.gray[8],
      }}
    >
      {/* ── Toggle header ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          borderBottom: open ? "1px solid #E0F2FE" : "none",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: colors.brand[6] }}>
          {g.forDevelopers}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: colors.brand[6],
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.47 4.22a.75.75 0 0 1 1.06 0L7 8.69l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* ── Collapsible body ── */}
      {open && (
        <div style={{ padding: "12px 16px 14px" }}>
          <ul style={listStyle}>
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          {whenToUse && whenToUse.length > 0 && (
            <>
              <div style={{ ...sectionTitleStyle, color: colors.brand[7] }}>
                ✓ {g.whenToUse}
              </div>
              <ul style={listStyle}>
                {whenToUse.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </>
          )}

          {whenNotToUse && whenNotToUse.length > 0 && (
            <>
              <div style={{ ...sectionTitleStyle, color: colors.gray[7] }}>
                ✗ {g.whenNotToUse}
              </div>
              <ul style={listStyle}>
                {whenNotToUse.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
