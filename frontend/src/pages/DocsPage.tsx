import { useState } from "react";
import "./DocsPage.scss";
import shinetsuLogo from "../assets/shinetsu.svg";

/* ── Nav structure ────────────────────────────────────────────────────────── */

type DocSection = "introduction" | "installation" | "components" | string; // component keys

const GETTING_STARTED = [
  { key: "introduction", label: "Introduction", icon: "📖" },
  { key: "installation", label: "Installation", icon: "📦" },
];

const COMPONENT_ITEMS = [
  { key: "foundations", label: "Foundations", icon: "🎨" },
  { key: "frame", label: "Frame", icon: "📐" },
  { key: "buttons", label: "Buttons", icon: "🔘" },
  { key: "inputs", label: "Inputs", icon: "⌨️" },
  { key: "select", label: "Select", icon: "📋" },
  { key: "datepicker", label: "Date Picker", icon: "📅" },
  { key: "form", label: "Form", icon: "📝" },
  { key: "radio-tab", label: "Radio Button", icon: "🔲" },
  { key: "table", label: "Table", icon: "📊" },
  { key: "modal", label: "Modal", icon: "💬" },
  { key: "scroll", label: "Scroll", icon: "🎯" },
];

/* ── Props ────────────────────────────────────────────────────────────────── */

type Props = {
  initialSection?: DocSection;
  onHome: () => void;
  onShowcase: (section?: string) => void;
  dark?: boolean;
  onToggleDark?: () => void;
};

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function DocsPage({
  initialSection = "introduction",
  onHome,
  onShowcase,
}: Props) {
  const [section, setSection] = useState<DocSection>(initialSection);

  const isComponentSection = COMPONENT_ITEMS.some((c) => c.key === section);

  const handleSectionClick = (key: string) => {
    if (COMPONENT_ITEMS.some((c) => c.key === key)) {
      onShowcase(key);
    } else {
      setSection(key);
    }
  };

  return (
    <div className="docs" data-theme={dark ? "dark" : "light"}>
      {/* ── Top nav ──────────────────────────────────────────────────────── */}
      <header className="docs-topnav">
        <div className="docs-topnav-logo" onClick={onHome}>
          <img src={shinetsuLogo} alt="Shintesu" />
          <span>
            Shin<em>Etsu</em>
          </span>
        </div>

        <ul className="docs-topnav-links">
          <li onClick={onHome}>Home</li>
          <li className="active">Docs</li>
          <li onClick={() => onShowcase("foundations")}>Components</li>
          <li>GitHub</li>
        </ul>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="docs-body">
        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <aside className="docs-sidebar">
          <div className="docs-sidebar-group">
            <span className="docs-sidebar-group-label">Getting Started</span>
            {GETTING_STARTED.map((item) => (
              <button
                key={item.key}
                className={`docs-sidebar-item${section === item.key ? " active" : ""}`}
                onClick={() => setSection(item.key)}
              >
                <span className="docs-sidebar-icon">{item.icon}</span>
                <span className="docs-sidebar-label">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="docs-sidebar-group">
            <span className="docs-sidebar-group-label">Components</span>
            {COMPONENT_ITEMS.map((item) => (
              <button
                key={item.key}
                className={`docs-sidebar-item${isComponentSection && section === item.key ? " active" : ""}`}
                onClick={() => handleSectionClick(item.key)}
              >
                <span className="docs-sidebar-icon">{item.icon}</span>
                <span className="docs-sidebar-label">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* ── Content ────────────────────────────────────────────────────── */}
        <main className="docs-content">
          {section === "introduction" && (
            <IntroductionPage
              onNext={() => setSection("installation")}
              onShowcase={onShowcase}
            />
          )}
          {section === "installation" && (
            <InstallationPage onShowcase={onShowcase} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ── Introduction ─────────────────────────────────────────────────────────── */

function IntroductionPage({
  onNext,
  onShowcase,
}: {
  onNext: () => void;
  onShowcase: (s: string) => void;
}) {
  return (
    <>
      <h1 className="docs-h1">Introduction</h1>
      <p className="docs-lead">
        Shintesu is a production-ready UI component collection built on Ant
        Design v6. One token file, eleven components, zero drift across
        projects.
      </p>

      <h2 className="docs-h2">What is Shintesu?</h2>
      <p className="docs-p">
        Shintesu gives your team a shared design language — a single{" "}
        <code className="docs-inline-code">theme.ts</code> and a global{" "}
        <code className="docs-inline-code">index.css</code> that every component
        reads from. Change <code className="docs-inline-code">--brand-6</code>{" "}
        once and the whole product updates. No hunting, no drift.
      </p>
      <p className="docs-p">
        Every component ships with a <strong>live preview</strong>, a{" "}
        <strong>copy-ready code snippet</strong>, and developer guidance on
        exactly when and when not to use it.
      </p>

      <h2 className="docs-h2">Design principles</h2>
      <ul className="docs-ul">
        <li>
          <strong>One token system</strong> — CSS variables drive every colour,
          spacing, and radius. No hardcoded values.
        </li>
        <li>
          <strong>Ant Design foundation</strong> — Battle-tested components with
          curated overrides, not replacements.
        </li>
        <li>
          <strong>TypeScript-safe</strong> — Full prop types on every component.
          Errors surface in your editor, not in production.
        </li>
        <li>
          <strong>Showcase-first</strong> — Every variant is live. You see
          exactly what you get before you copy the code.
        </li>
        <li>
          <strong>Accessible by default</strong> — Keyboard nav, focus rings,
          and ARIA come from Ant Design — you don't add them.
        </li>
      </ul>

      <h2 className="docs-h2">What's included</h2>
      <div className="docs-cards">
        {[
          {
            label: "Foundations",
            desc: "Color tokens, typography scale, spacing",
          },
          { label: "Frame", desc: "Application page shell & header template" },
          { label: "Buttons", desc: "Primary, default, sizes, icons, loading" },
          {
            label: "Inputs",
            desc: "Text, password, SpecialInput, SpecialInput2",
          },
          { label: "Select", desc: "Dropdown with design-system styling" },
          { label: "Date Picker", desc: "Calendar date selection, read-only" },
          { label: "Form", desc: "Validated form layout with labels" },
          { label: "Radio Button", desc: "Tab-style radio group" },
          { label: "Table", desc: "SplitTable with freeze columns & scroll" },
          { label: "Modal", desc: "Overlay dialogs and confirmations" },
          { label: "Scroll", desc: "Custom scrollbar utility class" },
        ].map((c) => (
          <div
            key={c.label}
            className="docs-card"
            onClick={() =>
              onShowcase(
                c.label
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace("radio-button", "radio-tab")
                  .replace("date-picker", "datepicker"),
              )
            }
          >
            <div className="docs-card-title">{c.label}</div>
            <div className="docs-card-desc">{c.desc}</div>
          </div>
        ))}
      </div>

      <hr className="docs-divider" />

      <h2 className="docs-h2">Next steps</h2>
      <div className="docs-cards">
        <div className="docs-card" onClick={onNext}>
          <div className="docs-card-title">Installation →</div>
          <div className="docs-card-desc">
            Get the project running on your machine in under 2 minutes.
          </div>
        </div>
        <div className="docs-card" onClick={() => onShowcase("buttons")}>
          <div className="docs-card-title">Browse Components →</div>
          <div className="docs-card-desc">
            Open the live showcase and start copying code.
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Installation ─────────────────────────────────────────────────────────── */

function InstallationPage({ onShowcase }: { onShowcase: (s: string) => void }) {
  return (
    <>
      <h1 className="docs-h1">Installation</h1>
      <p className="docs-lead">
        Get Shintesu running locally in under two minutes.
      </p>

      <div className="docs-callout">
        Prerequisites: <code className="docs-inline-code">Node.js 18+</code> and{" "}
        <code className="docs-inline-code">npm</code> (or{" "}
        <code className="docs-inline-code">pnpm</code>).
      </div>

      <h2 className="docs-h2">Clone & install</h2>
      <div className="docs-steps">
        <div>
          <div className="docs-step-title">
            <span className="docs-step-num">1</span> Clone the repository
          </div>
          <CodeBlock lang="bash">{`git clone https://github.com/your-org/shintesu-component.git
cd shintesu-component`}</CodeBlock>
        </div>

        <div>
          <div className="docs-step-title">
            <span className="docs-step-num">2</span> Move into the frontend
            directory
          </div>
          <CodeBlock lang="bash">{`cd frontend`}</CodeBlock>
        </div>

        <div>
          <div className="docs-step-title">
            <span className="docs-step-num">3</span> Install dependencies
          </div>
          <CodeBlock lang="bash">{`npm install`}</CodeBlock>
        </div>

        <div>
          <div className="docs-step-title">
            <span className="docs-step-num">4</span> Start the development
            server
          </div>
          <CodeBlock lang="bash">{`npm run dev`}</CodeBlock>
          <p className="docs-p" style={{ marginTop: "0.75rem" }}>
            The showcase opens at{" "}
            <code className="docs-inline-code">http://localhost:5173</code>.
          </p>
        </div>
      </div>

      <hr className="docs-divider" />

      <h2 className="docs-h2">Using components in your project</h2>
      <p className="docs-p">
        Shintesu is a showcase — components are meant to be understood and
        copied into your own project. For each component you want to use:
      </p>
      <ul className="docs-ul">
        <li>
          Open the component in the live showcase and click the{" "}
          <strong>Code</strong> tab.
        </li>
        <li>Copy the snippet into your project.</li>
        <li>
          Copy <code className="docs-inline-code">src/theme.ts</code> and its{" "}
          <code className="docs-inline-code">shintetsuTheme</code> export into
          your app.
        </li>
        <li>
          Wrap your app root with{" "}
          <code className="docs-inline-code">
            {"<ConfigProvider theme={shintetsuTheme}>"}
          </code>
          .
        </li>
        <li>
          Copy <code className="docs-inline-code">src/index.css</code> and
          import it in your entry file.
        </li>
      </ul>

      <h2 className="docs-h2">Project structure</h2>
      <CodeBlock lang="text">{`frontend/
├── src/
│   ├── components/          # Shared components
│   │   ├── SplitTable.tsx   # Freeze-column table
│   │   ├── SpecialInput.tsx # Click-to-edit input
│   │   └── SpecialInput2.tsx
│   ├── pages/
│   │   ├── showcase/        # One file per component
│   │   │   ├── Buttons.tsx
│   │   │   ├── Inputs.tsx
│   │   │   └── ...
│   │   └── ComponentShowcase.tsx
│   ├── theme.ts             # Ant Design theme tokens
│   └── index.css            # CSS variables + global overrides
└── package.json`}</CodeBlock>

      <h2 className="docs-h2">Key files</h2>
      <div className="docs-cards">
        <div className="docs-card">
          <div className="docs-card-title">
            <code className="docs-inline-code">theme.ts</code>
          </div>
          <div className="docs-card-desc">
            All Ant Design token overrides. Start here when customising colours
            or sizing.
          </div>
        </div>
        <div className="docs-card">
          <div className="docs-card-title">
            <code className="docs-inline-code">index.css</code>
          </div>
          <div className="docs-card-desc">
            CSS custom properties for the full brand palette. Referenced by
            every component.
          </div>
        </div>
      </div>

      <hr className="docs-divider" />

      <div className="docs-callout">
        Ready to explore?{" "}
        <span
          style={{
            color: "var(--brand-7)",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => onShowcase("foundations")}
        >
          Open the component showcase →
        </span>
      </div>
    </>
  );
}

/* ── CodeBlock helper ─────────────────────────────────────────────────────── */

function CodeBlock({ lang, children }: { lang: string; children: string }) {
  return (
    <div className="docs-code-block">
      <div className="docs-code-label">{lang}</div>
      <pre>{children}</pre>
    </div>
  );
}
