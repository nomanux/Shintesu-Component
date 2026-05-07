import { Divider, Flex, Typography } from "antd";
import { colors } from "../../theme";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

const { Title, Text, Paragraph } = Typography;

export const foundationsGuidance = (
  <DeveloperGuidance
    bullets={[
      "Colors are exposed two ways: theme.ts (TS imports) and CSS variables (var(--brand-6))",
      "Always reference tokens by name — never hardcode hex values",
      "Brand 6 is the action color; brand 4 the disabled fill; brand 1 the soft fill",
      "Gray 9 is the text color; gray 7 secondary; gray 6 tertiary; gray 4 borders",
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

type Palette = { name: string; scale: Record<string | number, string> };

const palettes: Palette[] = [
  { name: "Brand", scale: colors.brand },
  { name: "Gray", scale: colors.gray },
];

function Swatch({
  cssVar,
  hex,
  name,
}: {
  cssVar: string;
  hex: string;
  name: string;
}) {
  return (
    <div className="swatch">
      <div className="swatch-color" style={{ background: hex }} />
      <div className="swatch-meta">
        <div className="swatch-name">{name}</div>
        <div className="swatch-hex">{hex.toUpperCase()}</div>
        <div className="swatch-hex">{cssVar}</div>
      </div>
    </div>
  );
}

const spacingTokens: { name: string; px: number }[] = [
  { name: "marginXXS", px: 4 },
  { name: "marginXS", px: 8 },
  { name: "marginSM", px: 12 },
  { name: "marginMD", px: 16 },
  { name: "marginLG", px: 24 },
  { name: "marginXL", px: 32 },
];

export default function FoundationsSection() {
  return (
    <Flex vertical gap={32}>
      {/* Colors */}
      <div>
        <SectionLabel>Colors</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        {palettes.map((p) => (
          <div key={p.name} style={{ marginBottom: 24 }}>
            <Text strong style={{ display: "block", marginBottom: 8 }}>
              {p.name}
            </Text>
            <div className="swatch-grid">
              {Object.entries(p.scale).map(([step, hex]) => (
                <Swatch
                  key={step}
                  name={`${p.name.toLowerCase()}-${step}`}
                  cssVar={`--${p.name.toLowerCase()}-${step}`}
                  hex={hex}
                />
              ))}
            </div>
          </div>
        ))}
        <CodeBlock>{`// TypeScript
import { colors } from "./theme";
const teal = colors.brand[6]; // "#009B94"

// CSS
.button {
  background: var(--brand-6);
  color: var(--gray-1);
}`}</CodeBlock>
      </div>

      {/* Typography */}
      <div>
        <SectionLabel>Typography</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={4} style={{ marginBottom: 16 }}>
          <Title level={1} style={{ margin: 0 }}>
            Title — Level 1
          </Title>
          <Title level={2} style={{ margin: 0 }}>
            Title — Level 2
          </Title>
          <Title level={3} style={{ margin: 0 }}>
            Title — Level 3
          </Title>
          <Title level={4} style={{ margin: 0 }}>
            Title — Level 4
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            Title — Level 5
          </Title>
          <Paragraph style={{ margin: 0 }}>
            Body — paragraph text used for descriptions, content blocks, and
            regular reading.
          </Paragraph>
          <Text type="secondary">Secondary text — gray-7</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Caption — small annotation text
          </Text>
        </Flex>
        <CodeBlock>{`<Title level={3}>Section heading</Title>
<Paragraph>Body content goes here.</Paragraph>
<Text type="secondary">Secondary text</Text>`}</CodeBlock>
      </div>

      {/* Spacing */}
      <div>
        <SectionLabel>Spacing</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={8} style={{ marginBottom: 16 }}>
          {spacingTokens.map((s) => (
            <Flex key={s.name} align="center" gap={12}>
              <div
                style={{
                  width: 100,
                  fontSize: 12,
                  color: colors.gray[7],
                  fontFamily: "SF Mono, Monaco, monospace",
                }}
              >
                {s.name}
              </div>
              <div
                style={{
                  height: 12,
                  width: s.px,
                  background: colors.brand[6],
                }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
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

      {/* Heights */}
      <div>
        <SectionLabel>Control Heights</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={8} style={{ marginBottom: 16 }}>
          {[
            { name: "controlHeightSM", px: 24 },
            { name: "controlHeight", px: 32 },
            { name: "controlHeightLG", px: 40 },
          ].map((s) => (
            <Flex key={s.name} align="center" gap={12}>
              <div
                style={{
                  width: 160,
                  fontSize: 12,
                  color: colors.gray[7],
                  fontFamily: "SF Mono, Monaco, monospace",
                }}
              >
                {s.name}
              </div>
              <div
                style={{
                  height: s.px,
                  width: 120,
                  background: colors.brand[1],
                  border: `1px solid ${colors.brand[3]}`,
                }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {s.px}px
              </Text>
            </Flex>
          ))}
        </Flex>
      </div>
    </Flex>
  );
}
