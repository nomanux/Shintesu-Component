import React from "react";
import { Divider, Flex } from "antd";
import { SectionLabel } from "./helpers";
import CodeBlock from "./CodeBlock";
import themeSource from "../../theme.ts?raw";

const GITHUB_ROOT = "https://github.com/nomanux/Shintesu-Component/tree/master";
const GITHUB_COMPONENTS = `${GITHUB_ROOT}/frontend/src/components`;
const GITHUB_THEME = `${GITHUB_ROOT}/frontend/src/theme.ts`;
const GITHUB_CSS = `${GITHUB_ROOT}/frontend/src/index.css`;

/* ── Shared helpers ─────────────────────────────────────────────────────── */

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

function GhLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ color: "var(--brand-6)", fontWeight: 600, textDecoration: "none" }}
    >
      {children}
    </a>
  );
}

function Step({
  num,
  title,
  children,
  optional,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: optional ? "var(--gray-5)" : "var(--brand-6)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {num}
        </div>
        <div style={{ width: 1, flex: 1, background: "var(--gray-4)", minHeight: 16, marginTop: 6 }} />
      </div>
      <div style={{ flex: 1, paddingBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-9)" }}>{title}</span>
          {optional && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 99,
                background: "var(--gray-3)",
                color: "var(--gray-6)",
                border: "1px solid var(--gray-4)",
              }}
            >
              OPTIONAL
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

function Note({ type = "info", children }: { type?: "info" | "warning" | "success"; children: React.ReactNode }) {
  const styles = {
    info:    { bg: "var(--brand-1)", border: "var(--brand-3)", color: "var(--brand-8)" },
    warning: { bg: "#fffbe6",        border: "#ffe58f",         color: "#7d5a00"        },
    success: { bg: "#f6ffed",        border: "#b7eb8f",         color: "#237804"        },
  }[type];

  return (
    <div
      style={{
        padding: "10px 14px",
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        borderRadius: 6,
        fontSize: 13,
        color: styles.color,
        lineHeight: 1.7,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function ComponentCard({
  icon,
  name,
  desc,
  files,
  href,
}: {
  icon: string;
  name: string;
  desc: string;
  files: string[];
  href: string;
}) {
  return (
    <div
      style={{
        padding: "14px 16px",
        border: "1px solid var(--gray-4)",
        borderRadius: 8,
        background: "var(--gray-1)",
        flex: "1 1 220px",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-9)" }}>{name}</span>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{ marginLeft: "auto", fontSize: 11, color: "var(--brand-6)", textDecoration: "none" }}
        >
          GitHub ↗
        </a>
      </div>
      <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--gray-6)", lineHeight: 1.6 }}>{desc}</p>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {files.map((f) => (
          <span
            key={f}
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              padding: "1px 6px",
              borderRadius: 4,
              background: "var(--gray-3)",
              color: "var(--gray-7)",
              border: "1px solid var(--gray-4)",
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function PathCard({
  icon,
  title,
  desc,
  tag,
  selected,
}: {
  icon: string;
  title: string;
  desc: string;
  tag?: string;
  selected?: boolean;
}) {
  return (
    <div
      style={{
        padding: "16px 20px",
        border: selected ? "2px solid var(--brand-5)" : "1px solid var(--gray-4)",
        borderRadius: 8,
        background: selected ? "var(--brand-1)" : "var(--gray-1)",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-9)" }}>{title}</span>
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
      <p style={{ margin: 0, fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function InstallationSection() {
  return (
    <Flex vertical gap={48}>

      {/* ── Hero ── */}
      <div
        style={{
          padding: "24px 28px",
          background: "linear-gradient(135deg, var(--brand-1) 0%, var(--gray-1) 100%)",
          border: "1px solid var(--brand-3)",
          borderRadius: 10,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--gray-9)", marginBottom: 8 }}>
          Get Started with Shinetsu Components
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--gray-7)", lineHeight: 1.7, maxWidth: 620 }}>
          Drop in production-ready Ant Design components with a consistent design token system.
          Two files to copy, zero runtime dependencies beyond <Mono>antd</Mono>.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Setup time",  value: "~5 min" },
            { label: "Dependencies", value: "antd only" },
            { label: "Components",  value: "5 ready-to-use" },
            { label: "Framework",   value: "React + TypeScript" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: 11, color: "var(--gray-5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--brand-7)" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── What's included ── */}
      <div>
        <SectionLabel>What's Included</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
          All components live in{" "}
          <GhLink href={GITHUB_COMPONENTS}>frontend/src/components/</GhLink> on GitHub.
          Copy only what you need.
        </p>
        <Flex gap={10} wrap>
          <ComponentCard
            icon="📊"
            name="AppTable"
            desc="Unified data table with drag-to-resize columns, column reorder, and frozen split panes."
            files={["AppTable.tsx"]}
            href={`${GITHUB_COMPONENTS}/AppTable.tsx`}
          />
          <ComponentCard
            icon="✏️"
            name="SpecialInput"
            desc="Click to edit inline. Double-click to open a full-edit modal. Keeps tables clean."
            files={["SpecialInput.tsx"]}
            href={`${GITHUB_COMPONENTS}/SpecialInput.tsx`}
          />
          <ComponentCard
            icon="✏️"
            name="SpecialInput2"
            desc="Alternate styling variant of SpecialInput for denser layouts."
            files={["SpecialInput2.tsx"]}
            href={`${GITHUB_COMPONENTS}/SpecialInput2.tsx`}
          />
          <ComponentCard
            icon="🪟"
            name="AppModal"
            desc="Standard dialog with styled header, scrollable body, and bordered footer."
            files={["AppModal.tsx"]}
            href={`${GITHUB_COMPONENTS}/AppModal.tsx`}
          />
          <ComponentCard
            icon="🔒"
            name="SplitTable"
            desc="Freeze-column table with drag-to-resize, reorder, and synced horizontal scroll."
            files={["SplitTable.tsx", "SplitTable.scss"]}
            href={`${GITHUB_COMPONENTS}/SplitTable.tsx`}
          />
        </Flex>
      </div>

      {/* ── Choose your path ── */}
      <div>
        <SectionLabel>Choose Your Path</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex gap={12} wrap>
          <PathCard
            icon="📦"
            title="Path A — Use in my project"
            desc="Copy 2 files (theme.ts + index.css) and then grab the components you need. No cloning, no running anything locally."
            tag="Recommended"
            selected
          />
          <PathCard
            icon="🖥️"
            title="Path B — Run showcase locally"
            desc="Clone the repo and run the full showcase on your machine to explore all components with hot-reload."
          />
        </Flex>
      </div>

      {/* ── PATH A ── */}
      <div>
        <SectionLabel>Path A — Use Components in Your Project</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Note>
          📦 Everything is in <GhLink href={GITHUB_ROOT}>github.com/nomanux/Shintesu-Component</GhLink>.
          You only need two shared files (<Mono>theme.ts</Mono> and <Mono>index.css</Mono>) plus the component files you want.
        </Note>

        <div>
          <Step num={1} title="Install Ant Design (skip if already installed)">
            <CodeBlock language="bash">{`npm install antd @ant-design/icons`}</CodeBlock>
          </Step>

          <Step num={2} title="Copy theme.ts → wrap your app in ConfigProvider">
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
              Download <GhLink href={GITHUB_THEME}>theme.ts</GhLink> → place it at <Mono>src/theme.ts</Mono>,
              then wrap your root component:
            </p>
            <CodeBlock language="tsx">{`// src/App.tsx
import { ConfigProvider } from "antd";
import { getShinetsuTheme } from "./theme";

export default function App() {
  return (
    <ConfigProvider theme={getShinetsuTheme()}>
      {/* your app */}
    </ConfigProvider>
  );
}`}</CodeBlock>
            <Note type="info">
              💡 <strong>Why?</strong> <Mono>getShinetsuTheme()</Mono> sets all Ant Design design tokens
              (colors, radius, font sizes) so every component looks consistent without extra CSS.
            </Note>
          </Step>

          <Step num={3} title="Copy index.css → import it once">
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
              Download <GhLink href={GITHUB_CSS}>index.css</GhLink> → place at <Mono>src/index.css</Mono>.
              Import it at your entry point:
            </p>
            <CodeBlock language="tsx">{`// src/main.tsx
import "./index.css";   // ← add this line (must come before antd imports)`}</CodeBlock>
            <Note type="info">
              💡 <strong>Why?</strong> <Mono>index.css</Mono> defines CSS custom properties
              (<Mono>--brand-6</Mono>, <Mono>--gray-4</Mono>, …) used by all components. Without it,
              colors and spacing will be missing.
            </Note>
          </Step>

          <Step num={4} title="Copy the components you need">
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
              Browse <GhLink href={GITHUB_COMPONENTS}>frontend/src/components/</GhLink> and copy the
              files you want into your project's <Mono>src/components/</Mono>. Each component is
              self-contained — copy only what you use.
            </p>
            <Note type="warning">
              ⚠️ <strong>SplitTable</strong> requires <Mono>SplitTable.scss</Mono> alongside it.
              You'll need a Sass loader (<Mono>npm install -D sass</Mono>) in your build config.
              All other components use plain CSS or inline styles — no Sass needed.
            </Note>
          </Step>

          <Step num={5} title="Browse the showcase for copy-ready code snippets" optional>
            <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
              Open any section in this showcase → click the <strong>Code</strong> tab → copy the
              snippet. Every variant has a live preview side-by-side with its source.
            </p>
          </Step>
        </div>
      </div>

      {/* ── PATH B ── */}
      <div>
        <SectionLabel>Path B — Run the Showcase Locally</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Note>
          Requires <strong>Node.js 18+</strong> and <strong>npm</strong>.
        </Note>

        <div>
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
              Opens at <Mono>http://localhost:5173</Mono>. The showcase auto-reloads on every save.
            </p>
          </Step>
        </div>
      </div>

      {/* ── Try it live ── */}
      <div
        style={{
          padding: "20px 24px",
          background: "var(--brand-1)",
          border: "1px solid var(--brand-3)",
          borderLeft: "4px solid var(--brand-6)",
          borderRadius: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span
            style={{
              padding: "2px 8px",
              background: "var(--brand-6)",
              color: "#fff",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            LIVE DEMO
          </span>
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--gray-9)" }}>Try It Live</span>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--gray-7)", lineHeight: 1.65 }}>
          Launch a full-page demo directly in this window — no setup required.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "▶ FrameTemplate", path: "/kit/frametemplate", primary: true },
            { label: "▶ Sample Screen",  path: "/kit/sample",        primary: false },
          ].map(({ label, path, primary }) => (
            <button
              key={path}
              onClick={() => {
                history.pushState(null, "", path);
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 20px",
                background: primary ? "var(--brand-6)" : "var(--gray-1)",
                color: primary ? "#fff" : "var(--gray-8)",
                border: primary ? "none" : "1px solid var(--brand-3)",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Source structure ── */}
      <div>
        <SectionLabel>Source Structure</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
          Files you need to copy are marked with <strong>←</strong>.
        </p>
        <CodeBlock language="bash">{`frontend/src/
├── theme.ts                    ← copy to your src/theme.ts
├── index.css                   ← copy to your src/index.css
└── components/
    ├── AppTable.tsx             ← copy if you use AppTable
    ├── AppModal.tsx             ← copy if you use AppModal
    ├── SpecialInput.tsx         ← copy if you use SpecialInput
    ├── SpecialInput2.tsx        ← copy if you use SpecialInput2
    ├── SplitTable.tsx           ← copy if you use SplitTable
    └── SplitTable.scss          ← required with SplitTable (needs sass)`}</CodeBlock>
      </div>

      {/* ── theme.ts full source ── */}
      <div>
        <SectionLabel>theme.ts — Full Source</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 }}>
          This is the <em>live</em> <Mono>theme.ts</Mono> bundled with this showcase — always
          in sync with the latest tokens. Copy it directly into your project.
        </p>
        <CodeBlock language="ts">{themeSource}</CodeBlock>
      </div>

    </Flex>
  );
}
