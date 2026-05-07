import React from "react";
import { Divider, Flex, Typography } from "antd";
import { colors } from "../../theme";
import { SectionLabel, VariantLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

const { Text } = Typography;

export const foundationsGuidance = (
  <DeveloperGuidance
    bullets={[
      "Colors are exposed two ways: theme.ts (TS imports) and CSS variables (var(--brand-6))",
      "Always reference tokens by name — never hardcode hex values",
      "Brand 6 is the primary action color; brand 4 the disabled fill; brand 1 the soft fill",
      "Gray 9 for text, gray 7 secondary, gray 6 tertiary, gray 4 borders",
      "Use Ant Design's spacing tokens (token.marginSM/MD/LG) instead of magic numbers",
    ]}
    whenToUse={[
      "Reach for these tokens whenever you write a color, font size, or spacing value",
    ]}
    whenNotToUse={[
      "Never hardcode hex literals — they bypass theming and break dark mode",
    ]}
  />
);

// ── Colors ───────────────────────────────────────────────────────────────

type Palette = {
  name: "brand" | "gray";
  scale: Record<string | number, string>;
  /** Step ≥ this → use light text on the swatch (foreground contrast). */
  lightTextFrom: number;
};

const palettes: Palette[] = [
  { name: "brand", scale: colors.brand, lightTextFrom: 4 },
  { name: "gray", scale: colors.gray, lightTextFrom: 6 },
];

function ColorStrip({ palette }: { palette: Palette }) {
  return (
    <div className="swatch-strip">
      {Object.entries(palette.scale).map(([step, hex]) => {
        const stepNum = Number(step);
        const lightText = stepNum >= palette.lightTextFrom;
        return (
          <div key={step} className="swatch-card">
            <div
              className="swatch-color"
              style={{
                background: hex,
                color: lightText ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.7)",
              }}
            >
              {step}
            </div>
            <div className="swatch-meta">
              <div className="swatch-meta-hex">{hex.toUpperCase()}</div>
              <div className="swatch-meta-var">--{palette.name}-{step}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Typography ───────────────────────────────────────────────────────────

const typeScale = [
  { token: "Title level={1}", size: 38, weight: 600, line: 1.21 },
  { token: "Title level={2}", size: 30, weight: 600, line: 1.27 },
  { token: "Title level={3}", size: 24, weight: 600, line: 1.33 },
  { token: "Title level={4}", size: 20, weight: 600, line: 1.4 },
  { token: "Title level={5}", size: 16, weight: 600, line: 1.5 },
  { token: "Body (default)", size: 14, weight: 400, line: 1.57 },
  { token: "Text type=secondary", size: 14, weight: 400, line: 1.57, color: colors.gray[7] },
  { token: "Caption (small)", size: 12, weight: 400, line: 1.66, color: colors.gray[6] },
];

// ── Spacing ──────────────────────────────────────────────────────────────

const spacingTokens = [
  { name: "marginXXS", px: 4 },
  { name: "marginXS", px: 8 },
  { name: "marginSM", px: 12 },
  { name: "marginMD", px: 16 },
  { name: "marginLG", px: 24 },
  { name: "marginXL", px: 32 },
];

const heightTokens = [
  { name: "controlHeightSM", px: 24 },
  { name: "controlHeight", px: 32 },
  { name: "controlHeightLG", px: 40 },
];

// ── Component ────────────────────────────────────────────────────────────

export default function FoundationsSection() {
  return (
    <Flex vertical gap={32}>
      {/* Colors */}
      <div>
        <SectionLabel>Colors</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        {palettes.map((p) => (
          <div key={p.name} style={{ marginBottom: 20 }}>
            <VariantLabel style={{ marginBottom: 8, textTransform: "capitalize" }}>
              {p.name}
            </VariantLabel>
            <ColorStrip palette={p} />
          </div>
        ))}

        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`// TypeScript
import { colors } from "./theme";
const teal = colors.brand[6]; // "#009B94"

// CSS
.button {
  background: var(--brand-6);
  color: var(--gray-1);
}`}</CodeBlock>
        </div>
      </div>

      {/* Typography */}
      <div>
        <SectionLabel>Typography</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        <div className="type-grid">
          {typeScale.map((t) => (
            <React.Fragment key={t.token}>
              <span className="type-token">{t.token}</span>
              <span className="type-spec">
                {t.size}px / {t.weight} / {t.line}
              </span>
              <span
                style={{
                  fontSize: t.size,
                  fontWeight: t.weight,
                  lineHeight: t.line,
                  color: t.color ?? colors.gray[9],
                }}
              >
                The quick brown fox
              </span>
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Title level={3}>Section heading</Title>
<Paragraph>Body content goes here.</Paragraph>
<Text type="secondary">Secondary text</Text>`}</CodeBlock>
        </div>
      </div>

      {/* Spacing */}
      <div>
        <SectionLabel>Spacing</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        <Flex vertical gap={6} style={{ marginBottom: 16 }}>
          {spacingTokens.map((s) => (
            <Flex key={s.name} align="center" gap={16}>
              <span className="type-token" style={{ width: 110 }}>
                {s.name}
              </span>
              <div
                style={{
                  height: 12,
                  width: s.px,
                  background: colors.brand[6],
                }}
              />
              <Text type="secondary" style={{ fontSize: 11 }}>
                {s.px}px
              </Text>
            </Flex>
          ))}
        </Flex>

        <CodeBlock>{`const { token } = theme.useToken();

<div style={{ padding: token.paddingSM, gap: token.marginMD }}>
  ...
</div>`}</CodeBlock>
      </div>

      {/* Control Heights */}
      <div>
        <SectionLabel>Control Heights</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        <Flex vertical gap={8}>
          {heightTokens.map((s) => (
            <Flex key={s.name} align="center" gap={16}>
              <span className="type-token" style={{ width: 160 }}>
                {s.name}
              </span>
              <div
                style={{
                  height: s.px,
                  width: 160,
                  background: colors.brand[1],
                  border: `1px solid ${colors.brand[3]}`,
                }}
              />
              <Text type="secondary" style={{ fontSize: 11 }}>
                {s.px}px
              </Text>
            </Flex>
          ))}
        </Flex>
      </div>
    </Flex>
  );
}
