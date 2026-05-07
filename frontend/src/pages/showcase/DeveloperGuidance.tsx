import React from "react";
import { colors } from "../../theme";

type GuidanceProps = {
  /** Bullet list of usage rules / behaviors. */
  bullets: React.ReactNode[];
  /** When this component is the right choice. */
  whenToUse?: string[];
  /** When to reach for something else instead. */
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

export default function DeveloperGuidance({
  bullets,
  whenToUse,
  whenNotToUse,
}: GuidanceProps) {
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
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: colors.brand[6],
          marginBottom: 6,
        }}
      >
        For Developers
      </div>
      <ul style={listStyle}>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {whenToUse && whenToUse.length > 0 && (
        <>
          <div style={{ ...sectionTitleStyle, color: colors.brand[7] }}>
            ✓ When to use
          </div>
          <ul style={listStyle}>
            {whenToUse.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </>
      )}

      {whenNotToUse && whenNotToUse.length > 0 && (
        <>
          <div style={{ ...sectionTitleStyle, color: colors.gray[7] }}>
            ✗ When not to use
          </div>
          <ul style={listStyle}>
            {whenNotToUse.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
