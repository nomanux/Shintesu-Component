import { Divider, Flex } from "antd";
import { SectionLabel } from "./helpers";
import CodeBlock from "./CodeBlock";

export default function IntroductionSection() {
  return (
    <Flex vertical gap={40}>

      {/* What is Shinetsu */}
      <div>
        <SectionLabel>What is Shinetsu?</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={{ fontSize: 14, color: "var(--gray-7)", lineHeight: 1.75, margin: 0 }}>
          Shinetsu is a production-ready UI component collection built on{" "}
          <strong style={{ color: "var(--gray-9)" }}>Ant Design v6</strong>. It provides
          a unified set of components backed by a single token file so your team ships
          consistent, on-brand UI across every project without re-declaring the same
          variables from scratch.
        </p>
      </div>

      {/* Design principles */}
      <div>
        <SectionLabel>Design Principles</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          {[
            { title: "One token system", body: "Every component reads from the same CSS variable file. Change --brand-6 once and the whole product updates." },
            { title: "Ant Design foundation", body: "Built on Ant Design v6 with curated theme overrides. All built-in accessibility and keyboard navigation come included." },
            { title: "TypeScript-safe", body: "Full prop types on every component. Errors surface in your editor, not in production." },
            { title: "Showcase-first", body: "Every variant is live. You see exactly what you get before copying the code." },
            { title: "Accessible by default", body: "Keyboard nav, focus rings, and ARIA are handled by Ant Design — you don't add them." },
          ].map((p) => (
            <div
              key={p.title}
              style={{
                padding: "14px 16px",
                border: "1px solid var(--gray-4)",
                borderRadius: 6,
                background: "var(--gray-1)",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-9)", marginBottom: 4 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
                {p.body}
              </div>
            </div>
          ))}
        </Flex>
      </div>

      {/* Quick start */}
      <div>
        <SectionLabel>Quick Start</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={{ fontSize: 14, color: "var(--gray-7)", lineHeight: 1.7, margin: "0 0 16px" }}>
          Wrap your app with the Shinetsu theme and you're ready to use any component.
        </p>
        <CodeBlock>{`import { ConfigProvider } from "antd";
import { shinetsuTheme } from "./theme";
import "./index.css";

export default function App() {
  return (
    <ConfigProvider theme={shinetsuTheme}>
      {/* your app here */}
    </ConfigProvider>
  );
}`}</CodeBlock>
      </div>

      {/* Included components */}
      <div>
        <SectionLabel>What's Included</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 8,
          }}
        >
          {[
            { name: "Foundations",      desc: "Tokens · Typography" },
            { name: "Frame",            desc: "App shell template" },
            { name: "Buttons",          desc: "Primary · States" },
            { name: "Inputs",           desc: "Text · Password · SpecialInput" },
            { name: "Select",           desc: "Dropdown" },
            { name: "Date Picker",      desc: "Calendar dates" },
            { name: "Form",             desc: "Validated layout" },
            { name: "Radio Button",     desc: "Tab-style group" },
            { name: "Table",            desc: "SplitTable · Freeze" },
            { name: "Modal",            desc: "Overlay dialogs" },
            { name: "Scroll",           desc: "Custom scrollbar" },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                padding: "10px 14px",
                border: "1px solid var(--gray-4)",
                borderRadius: 6,
                background: "var(--gray-2)",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-9)" }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "var(--gray-6)", marginTop: 2 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </Flex>
  );
}
