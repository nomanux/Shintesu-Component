import React from "react";
import { Divider, Flex } from "antd";
import { SectionLabel } from "./helpers";
import CodeBlock from "./CodeBlock";
import themeSource from "../../theme.ts?raw";

/* ── Shared small helpers ────────────────────────────────────────────────── */

function Mono({ children }: { children: string }) {
  return (
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
      {children}
    </code>
  );
}

function Step({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "var(--brand-6)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--gray-9)",
            marginBottom: 10,
          }}
        >
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        background: "var(--brand-1)",
        border: "1px solid var(--brand-3)",
        borderRadius: 6,
        fontSize: 13,
        color: "var(--brand-8)",
        lineHeight: 1.7,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function PathCard({
  icon,
  title,
  desc,
  tag,
}: {
  icon: string;
  title: string;
  desc: string;
  tag?: string;
}) {
  return (
    <div
      style={{
        padding: "16px 20px",
        border: "1px solid var(--gray-4)",
        borderRadius: 8,
        background: "var(--gray-1)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span
          style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-9)" }}
        >
          {title}
        </span>
        {tag && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: 99,
              background: "var(--brand-1)",
              color: "var(--brand-7)",
              border: "1px solid var(--brand-3)",
              marginLeft: "auto",
            }}
          >
            {tag}
          </span>
        )}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
        {desc}
      </p>
    </div>
  );
}

function KitFile({
  file,
  desc,
}: {
  file: string;
  desc: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "10px 14px",
        border: "1px solid var(--gray-4)",
        borderRadius: 6,
        background: "var(--gray-1)",
      }}
    >
      <Mono>{file}</Mono>
      <span style={{ fontSize: 13, color: "var(--gray-6)", lineHeight: 1.6 }}>
        {desc}
      </span>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function InstallationSection() {
  return (
    <Flex vertical gap={48}>

      {/* ── Choose your path ── */}
      <div>
        <SectionLabel>Choose Your Path</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex gap={12} wrap>
          <PathCard
            icon="📦"
            title="Use components in my project"
            desc="Copy 2 files from the kit and start building. No cloning, no running anything locally."
            tag="Recommended"
          />
          <PathCard
            icon="🖥️"
            title="Run the showcase locally"
            desc="Clone the repo and run the showcase on your machine to explore all components."
          />
        </Flex>
      </div>

      {/* ── PATH A: Kit setup ── */}
      <div>
        <SectionLabel>Path A — Use Components in Your Project</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Note>
          📦 All you need is in the <strong>kit/</strong> folder on GitHub:{" "}
          <a
            href="https://github.com/nomanux/Shintesu-Component/tree/master/kit"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--brand-6)", fontWeight: 600 }}
          >
            github.com/nomanux/Shintesu-Component/tree/master/kit
          </a>
        </Note>

        <Flex vertical gap={24}>
          <Step num={1} title="Install Ant Design (if not already)">
            <CodeBlock language="bash">{`npm install antd @ant-design/icons`}</CodeBlock>
          </Step>

          <Step num={2} title="Copy theme.ts into your project">
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
              Download <Mono>kit/theme.ts</Mono> → paste into <Mono>src/theme.ts</Mono>, then wrap your app:
            </p>
            <CodeBlock>{`// src/App.tsx
import { ConfigProvider } from "antd";
import { getShinetsuTheme } from "./theme";

export default function App() {
  return (
    <ConfigProvider theme={getShinetsuTheme()}>
      {/* your app */}
    </ConfigProvider>
  );
}`}</CodeBlock>
          </Step>

          <Step num={3} title="Copy index.css and import it">
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
              Download <Mono>kit/index.css</Mono> → paste into <Mono>src/index.css</Mono>:
            </p>
            <CodeBlock>{`// src/main.tsx
import "./index.css";   // ← add this line`}</CodeBlock>
          </Step>

          <Step num={4} title="Copy the components you need">
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
              Copy from <Mono>kit/components/</Mono> into your project's <Mono>src/components/</Mono>:
            </p>
            <Note>
              ✅ The kit uses plain <strong>.css</strong> files — no <code style={{ fontFamily: "monospace", fontSize: 12 }}>sass</code> dependency needed.
            </Note>
            <Flex vertical gap={8}>
              <KitFile
                file="SplitTable.tsx + SplitTable.css"
                desc="Freeze-column table with drag-to-resize, reorder, and synced scroll."
              />
              <KitFile
                file="SpecialInput.tsx"
                desc="Click to edit inline, double-click to open full-edit modal."
              />
              <KitFile
                file="SpecialInput2.tsx"
                desc="Variant of SpecialInput with alternate styling."
              />
              <KitFile
                file="AppModal.tsx"
                desc="Standard dialog with styled header, body and footer borders."
              />
            </Flex>
          </Step>

          <Step num={5} title="Browse the showcase for code snippets">
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
              Open any section in this showcase → click the <strong>Code</strong> tab → copy the snippet directly into your project.
            </p>
            <Note>
              💡 The showcase is your living reference. Every variant has a working preview and copy-ready code.
            </Note>
          </Step>
        </Flex>
      </div>

      {/* ── PATH B: Run locally ── */}
      <div>
        <SectionLabel>Path B — Run the Showcase Locally</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Note>
          Requires <strong>Node.js 18+</strong> and <strong>npm</strong>.
        </Note>
        <Flex vertical gap={20}>
          <Step num={1} title="Clone the repository">
            <CodeBlock language="bash">{`git clone https://github.com/nomanux/Shintesu-Component.git
cd Shintesu-Component`}</CodeBlock>
          </Step>

          <Step num={2} title="Install dependencies">
            <CodeBlock language="bash">{`cd frontend
npm install`}</CodeBlock>
          </Step>

          <Step num={3} title="Start the development server">
            <CodeBlock language="bash">{`npm run dev`}</CodeBlock>
            <p style={{ fontSize: 13, color: "var(--gray-6)", marginTop: 8, lineHeight: 1.65 }}>
              Opens at <Mono>http://localhost:5173</Mono>
            </p>
          </Step>
        </Flex>
      </div>

      {/* ── Kit structure ── */}
      <div>
        <SectionLabel>Kit Structure</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock language="bash">{`kit/
├── README.md                  # Quick-start guide
├── theme.ts                   # All design tokens → wrap app in ConfigProvider
├── index.css                  # CSS variables + Ant Design overrides
└── components/
    ├── SplitTable.tsx         # Freeze-column table
    ├── SplitTable.scss
    ├── SpecialInput.tsx       # Click-to-edit input
    ├── SpecialInput2.tsx
    └── AppModal.tsx           # Styled modal wrapper`}</CodeBlock>
      </div>

      {/* ── theme.ts source ── */}
      <div>
        <SectionLabel>theme.ts — Full Source</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={{ fontSize: 13, color: "var(--gray-6)", marginBottom: 12, lineHeight: 1.65 }}>
          This is the live <Mono>theme.ts</Mono> file — always up to date. Copy it directly into your project.
        </p>
        <CodeBlock language="ts">{themeSource}</CodeBlock>
      </div>

    </Flex>
  );
}
