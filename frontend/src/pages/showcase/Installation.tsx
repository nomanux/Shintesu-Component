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
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "var(--brand-6)",
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
      <div style={{ flex: 1, minWidth: 0, paddingBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-9)", marginBottom: 10 }}>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}

function Note({ type = "info", children }: { type?: "info" | "warning"; children: React.ReactNode }) {
  const styles = {
    info:    { bg: "var(--brand-1)", border: "var(--brand-3)", color: "var(--brand-8)" },
    warning: { bg: "#fffbe6",        border: "#ffe58f",         color: "#7d5a00"        },
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

const bodyText: React.CSSProperties = { margin: "0 0 10px", fontSize: 13, color: "var(--gray-6)", lineHeight: 1.65 };

/* ── Component file list ────────────────────────────────────────────────── */

const COMPONENTS: { name: string; desc: string; files: string[] }[] = [
  {
    name: "AppModal",
    desc: "Dialog with styled header, scrollable body and bordered footer.",
    files: ["AppModal.tsx"],
  },
  {
    name: "SpecialInput",
    desc: "Click to edit inline, double-click to edit in a modal.",
    files: ["SpecialInput.tsx", "AppModal.tsx"],
  },
  {
    name: "SpecialInput2",
    desc: "Denser styling variant of SpecialInput.",
    files: ["SpecialInput2.tsx", "AppModal.tsx"],
  },
  {
    name: "SplitTable",
    desc: "Table with frozen columns, resize, reorder and synced scroll.",
    files: ["SplitTable.tsx", "SplitTable.scss"],
  },
  {
    name: "AppTable",
    desc: "Data table with resizable, reorderable and frozen columns.",
    files: ["AppTable.tsx", "SplitTable.tsx", "SplitTable.scss", "TableHeaderCell.tsx"],
  },
];

function ComponentFiles() {
  return (
    <div style={{ border: "1px solid var(--gray-4)", borderRadius: 8, overflow: "hidden" }}>
      {COMPONENTS.map((c, i) => (
        <div
          key={c.name}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
            padding: "12px 16px",
            borderTop: i === 0 ? "none" : "1px solid var(--gray-4)",
            background: "var(--gray-1)",
          }}
        >
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-9)" }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "var(--gray-6)", lineHeight: 1.6 }}>{c.desc}</div>
          </div>
          <div style={{ flex: "1 1 260px", display: "flex", gap: 4, flexWrap: "wrap", alignContent: "center" }}>
            {c.files.map((f) => (
              <span
                key={f}
                style={{
                  fontSize: 11,
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
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function InstallationSection() {
  return (
    <Flex vertical gap={48}>

      {/* ── How it works ── */}
      <div>
        <SectionLabel>How It Works</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Note>
          <strong>This is not an npm package.</strong> There is nothing to install by name.
          You copy the source files from the <GhLink href={GITHUB_ROOT}>GitHub repo</GhLink> into
          your own project and edit them like any other code.
        </Note>
        <p style={bodyText}>Your project needs:</p>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "var(--gray-7)", lineHeight: 1.9 }}>
          <li>React with TypeScript</li>
          <li><Mono>antd</Mono> v6</li>
          <li><Mono>sass</Mono>, only if you use SplitTable or AppTable</li>
        </ul>
      </div>

      {/* ── Steps ── */}
      <div>
        <SectionLabel>Add the Components to Your Project</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        <div>
          <Step num={1} title="Copy the theme files">
            <p style={bodyText}>
              Copy <GhLink href={GITHUB_THEME}>theme.ts</GhLink> to <Mono>src/theme.ts</Mono> and{" "}
              <GhLink href={GITHUB_CSS}>index.css</GhLink> to <Mono>src/index.css</Mono>. Every
              component needs both: <Mono>theme.ts</Mono> sets the Ant Design tokens and{" "}
              <Mono>index.css</Mono> defines the CSS variables (<Mono>--brand-6</Mono>,{" "}
              <Mono>--gray-4</Mono>, …).
            </p>
          </Step>

          <Step num={2} title="Load the theme in your app">
            <CodeBlock language="tsx">{`// src/main.tsx
import "./index.css";   // before any antd imports

// src/App.tsx
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

          <Step num={3} title="Copy the component files you need">
            <p style={bodyText}>
              Copy files from <GhLink href={GITHUB_COMPONENTS}>frontend/src/components/</GhLink> into
              your <Mono>src/components/</Mono>. Some components use other ones, so copy every file
              listed on the row.
            </p>
            <ComponentFiles />
            <Note type="warning">
              ⚠️ Keep the same folder layout. The components import the theme with{" "}
              <Mono>../theme</Mono>, so they must sit in <Mono>src/components/</Mono> next to{" "}
              <Mono>src/theme.ts</Mono>.
            </Note>
          </Step>

          <Step num={4} title="Use them">
            <CodeBlock language="tsx">{`import AppModal from "./components/AppModal";`}</CodeBlock>
            <p style={{ ...bodyText, marginTop: 10 }}>
              Each section of this showcase has a <strong>Code</strong> tab with a ready-to-copy
              example for every variant.
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

      {/* ── Run the showcase locally ── */}
      <div>
        <SectionLabel>Run This Showcase Locally (Optional)</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={bodyText}>
          Only needed if you want to change the components or this showcase. Requires Node.js 18+.
        </p>
        <CodeBlock language="bash">{`git clone https://github.com/nomanux/Shintesu-Component.git
cd Shintesu-Component/frontend
npm install
npm run dev`}</CodeBlock>
        <p style={{ ...bodyText, marginTop: 10 }}>
          Opens at <Mono>http://localhost:5173</Mono> and reloads on every save.
        </p>
      </div>

      {/* ── Source structure ── */}
      <div>
        <SectionLabel>Source Structure</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock language="bash">{`frontend/src/
├── theme.ts                 ← always copy
├── index.css                ← always copy
└── components/
    ├── AppModal.tsx
    ├── AppTable.tsx
    ├── SpecialInput.tsx
    ├── SpecialInput2.tsx
    ├── SplitTable.tsx
    ├── SplitTable.scss
    └── TableHeaderCell.tsx`}</CodeBlock>
      </div>

      {/* ── theme.ts full source ── */}
      <div>
        <SectionLabel>theme.ts — Full Source</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <p style={bodyText}>
          The current <Mono>theme.ts</Mono> used by this showcase. You can copy it from here
          instead of GitHub.
        </p>
        <CodeBlock language="ts">{themeSource}</CodeBlock>
      </div>

    </Flex>
  );
}
