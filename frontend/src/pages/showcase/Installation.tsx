import { Divider, Flex } from "antd";
import { SectionLabel } from "./helpers";
import CodeBlock from "./CodeBlock";

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "var(--brand-1)",
          border: "1px solid var(--brand-3)",
          color: "var(--brand-7)",
          fontSize: 11,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-9)", marginBottom: 10 }}>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}

import React from "react";

export default function InstallationSection() {
  return (
    <Flex vertical gap={40}>

      {/* Prerequisites */}
      <div>
        <SectionLabel>Prerequisites</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <div
          style={{
            padding: "12px 16px",
            background: "var(--brand-1)",
            border: "1px solid var(--brand-3)",
            borderRadius: 6,
            fontSize: 13,
            color: "var(--brand-8)",
            lineHeight: 1.7,
          }}
        >
          Requires <strong>Node.js 18+</strong> and <strong>npm</strong> (or pnpm / yarn).
        </div>
      </div>

      {/* Steps */}
      <div>
        <SectionLabel>Setup Steps</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={28}>

          <Step num={1} title="Clone the repository">
            <CodeBlock>{`git clone https://github.com/your-org/shinetsu-component.git
cd shinetsu-component`}</CodeBlock>
          </Step>

          <Step num={2} title="Move into the frontend directory">
            <CodeBlock>{`cd frontend`}</CodeBlock>
          </Step>

          <Step num={3} title="Install dependencies">
            <CodeBlock>{`npm install`}</CodeBlock>
          </Step>

          <Step num={4} title="Start the development server">
            <CodeBlock>{`npm run dev`}</CodeBlock>
            <p style={{ fontSize: 13, color: "var(--gray-6)", marginTop: 8, lineHeight: 1.65 }}>
              The showcase opens at{" "}
              <code
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  background: "var(--gray-3)",
                  padding: "1px 6px",
                  borderRadius: 4,
                  border: "1px solid var(--gray-4)",
                  color: "var(--brand-7)",
                }}
              >
                http://localhost:5173
              </code>
            </p>
          </Step>

        </Flex>
      </div>

      {/* Using in your project */}
      <div>
        <SectionLabel>Using in Your Project</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          {[
            "Open any component in the showcase and click the Code tab.",
            "Copy the snippet into your own project.",
            "Copy src/theme.ts and wrap your app with ConfigProvider.",
            "Copy src/index.css and import it in your entry file.",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "var(--gray-3)",
                  border: "1px solid var(--gray-4)",
                  color: "var(--gray-7)",
                  fontSize: 11,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {i + 1}
              </div>
              <span style={{ fontSize: 13, color: "var(--gray-7)", lineHeight: 1.65 }}>{step}</span>
            </div>
          ))}
        </Flex>
      </div>

      {/* Project structure */}
      <div>
        <SectionLabel>Project Structure</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`frontend/
├── src/
│   ├── components/           # Shared components
│   │   ├── SplitTable.tsx    # Freeze-column table
│   │   ├── SpecialInput.tsx  # Click-to-edit input
│   │   └── SpecialInput2.tsx
│   ├── pages/
│   │   ├── showcase/         # One file per component
│   │   │   ├── Buttons.tsx
│   │   │   ├── Inputs.tsx
│   │   │   └── ...
│   │   └── ComponentShowcase.tsx
│   ├── theme.ts              # Ant Design token overrides
│   └── index.css             # CSS variables + global styles
└── package.json`}</CodeBlock>
      </div>

      {/* Key files */}
      <div>
        <SectionLabel>Key Files</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={8}>
          {[
            { file: "theme.ts",   desc: "All Ant Design token overrides. Start here when customising colours or sizing." },
            { file: "index.css",  desc: "CSS custom properties for the full brand palette. Referenced by every component." },
          ].map((f) => (
            <div
              key={f.file}
              style={{
                padding: "12px 16px",
                border: "1px solid var(--gray-4)",
                borderRadius: 6,
                background: "var(--gray-1)",
              }}
            >
              <code
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  background: "var(--gray-3)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: "1px solid var(--gray-4)",
                  color: "var(--brand-7)",
                  display: "inline-block",
                  marginBottom: 6,
                }}
              >
                {f.file}
              </code>
              <div style={{ fontSize: 13, color: "var(--gray-6)", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </Flex>
      </div>

    </Flex>
  );
}
