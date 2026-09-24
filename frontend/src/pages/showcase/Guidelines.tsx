import { Divider, Flex } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { SectionLabel } from "./helpers";

/* ── Rules ───────────────────────────────────────────────────────────────── */

type RuleGroup = { title: string; dos: string[]; donts: string[] };

const GROUPS: RuleGroup[] = [
  {
    title: "Color",
    dos: [
      "Use a token for every color: var(--brand-6) in CSS, colors.brand[6] in TypeScript",
      "Use --brand-6 for the primary action and --brand-1 for hover and selected backgrounds",
      "Use --gray-9 for values people read (inputs, table cells, labels) and --gray-7 for secondary text",
    ],
    donts: [
      "Hardcode hex values. They skip the theme and break dark mode",
      "Use brand colors for decoration. Teal means \"you can act on this\" or \"this is selected\"",
    ],
  },
  {
    title: "Typography",
    dos: [
      "Use 14px for body, inputs and tables",
      "Use weight 500 for buttons and dropdown items, 600 for titles and strong text",
      "Use Ant Design's Title, Text and Paragraph so sizes come from the theme",
    ],
    donts: [
      "Set font sizes in px on individual elements when a Title level or Text type fits",
    ],
  },
  {
    title: "Shape & Spacing",
    dos: [
      "Keep corners square. borderRadius is 0 for all controls, cards and modals",
      "Space with the 4 / 8 / 12 / 16 / 24 / 32 steps (token.marginXXS to token.marginXL)",
      "Use 16px between inline form fields and 8px between stacked fields",
    ],
    donts: [
      "Add rounded corners or shadows to match another product",
      "Use spacing values outside the scale, such as 10px or 15px",
    ],
  },
  {
    title: "Buttons",
    dos: [
      "Use one primary button per view, for the main action",
      "Use default buttons for secondary actions",
      "Keep the 110px minimum width on buttons with text",
      "Show a loading state when an action takes more than about 200ms",
    ],
    donts: [
      "Put two primary buttons in the same view",
      "Use a button for navigation between pages. Use a link",
    ],
  },
  {
    title: "Inputs & Forms",
    dos: [
      "Use 32px controls by default, 24px inside table cells, 40px only where more space is needed",
      "Use Select when the value comes from a fixed list, Radio for 2–4 options shown at once",
      "Use Input.TextArea for multi-line text and InputNumber for numbers",
    ],
    donts: [
      "Mix control heights in one row",
      "Use Select for free text",
    ],
  },
  {
    title: "Tables",
    dos: [
      "Use tables for structured data with several attributes per row",
      "Use --brand-1 for selected rows",
      "Add the cell-text class to text-only columns for 8px horizontal padding",
    ],
    donts: [
      "Use a table for a single-column list",
    ],
  },
  {
    title: "Modals",
    dos: [
      "Pick a width from modalWidth (480, 640, 768, 960, 1200) instead of a custom value",
      "Give every modal a clear title and at least one primary action",
      "Keep one purpose per modal",
    ],
    donts: [
      "Put more than 5 form fields in a modal. Use a page or drawer",
      "Open a modal from inside another modal",
    ],
  },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

function RuleList({ kind, items }: { kind: "do" | "dont"; items: string[] }) {
  const isDo = kind === "do";
  return (
    <div style={{ flex: "1 1 280px", minWidth: 0 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
          color: isDo ? "var(--brand-7)" : "#b42318",
          marginBottom: 8,
        }}
      >
        {isDo ? "DO" : "DON'T"}
      </div>
      <Flex vertical gap={8}>
        {items.map((item) => (
          <div key={item} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--gray-8)", lineHeight: 1.6 }}>
            {isDo ? (
              <CheckOutlined style={{ color: "var(--brand-6)", marginTop: 4, flexShrink: 0 }} />
            ) : (
              <CloseOutlined style={{ color: "#d92d20", marginTop: 4, flexShrink: 0 }} />
            )}
            <span>{item}</span>
          </div>
        ))}
      </Flex>
    </div>
  );
}

export default function GuidelinesSection() {
  return (
    <Flex vertical gap={40}>
      <p style={{ margin: 0, fontSize: 14, color: "var(--gray-7)", lineHeight: 1.7 }}>
        Rules that keep every screen consistent. The theme handles colors and sizes for Ant
        Design components; these rules cover the choices the theme can't make for you.
        Exact values are on the <strong style={{ color: "var(--gray-9)" }}>Foundations</strong> page.
      </p>

      {GROUPS.map((g) => (
        <div key={g.title}>
          <SectionLabel>{g.title}</SectionLabel>
          <Divider style={{ margin: "8px 0 16px" }} />
          <Flex gap={24} wrap>
            <RuleList kind="do" items={g.dos} />
            <RuleList kind="dont" items={g.donts} />
          </Flex>
        </div>
      ))}
    </Flex>
  );
}
