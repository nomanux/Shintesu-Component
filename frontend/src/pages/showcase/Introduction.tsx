import { Divider, Flex } from "antd";
import { SectionLabel } from "./helpers";
import CodeBlock from "./CodeBlock";

export default function IntroductionSection() {
  return (
    <Flex vertical gap={40}>

      {/* What is SH-Component */}
      <div>
        <SectionLabel>What is SH-Component?</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={{ fontSize: 14, color: "var(--gray-7)", lineHeight: 1.75, margin: 0 }}>
          <strong style={{ color: "var(--gray-9)" }}>SH-Component</strong> is a UI component
          library for building ERP applications. It is built on{" "}
          <strong style={{ color: "var(--gray-9)" }}>Ant Design v6</strong> and customized
          with its own theme.
        </p>
        <p style={{ fontSize: 14, color: "var(--gray-7)", lineHeight: 1.75, margin: "12px 0 0" }}>
          Use these components instead of plain Ant Design when you build an ERP screen.
          Colors, typography and spacing come from one shared token file, so every
          application looks and behaves the same, and a theme change in one place updates
          them all.
        </p>
      </div>

      {/* Quick start */}
      <div>
        <SectionLabel>Quick Start</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={{ fontSize: 14, color: "var(--gray-7)", lineHeight: 1.7, margin: "0 0 16px" }}>
          Wrap your app with the SH-Component theme and you're ready to use any component.
        </p>
        <CodeBlock>{`import { ConfigProvider } from "antd";
import { shComponentTheme } from "./theme";
import "./index.css";

export default function App() {
  return (
    <ConfigProvider theme={shComponentTheme}>
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
