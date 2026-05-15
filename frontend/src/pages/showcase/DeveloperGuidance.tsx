import React from "react";
import { colors } from "../../theme";
import { useLang, GUIDANCE_JA } from "../../contexts/lang";

type GuidanceProps = {
  bullets: React.ReactNode[];
  whenToUse?: string[];
  whenNotToUse?: string[];
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 1,
  marginBottom: 6,
  marginTop: 12,
};

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  fontSize: 13,
  lineHeight: 1.6,
};

export default function DeveloperGuidance({ bullets, whenToUse, whenNotToUse }: GuidanceProps) {
  const lang = useLang();
  const g = lang === "ja" ? GUIDANCE_JA : {
    forDevelopers: "For Developers",
    whenToUse:     "When to use",
    whenNotToUse:  "When not to use",
  };

  return (
    <div
      style={{
        padding: "14px 16px",
        marginBottom: 24,
        backgroundColor: "#F0F9FF",
        border: "1px solid #E0F2FE",
        borderRadius: 4,
        color: colors.gray[8],
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: colors.brand[6], marginBottom: 6 }}>
        {g.forDevelopers}
      </div>
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
  );
}
