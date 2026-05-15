import { useState } from "react";
import "./HomePage.scss";
import synetsuLogo from "../assets/synetsu.svg";

/* ── Data ─────────────────────────────────────────────────────────────────── */

type Category = "All" | "Data Entry" | "Display" | "Layout" | "Feedback";

type ComponentEntry = {
  key: string;
  label: string;
  icon: string;
  sub: string;
  category: Exclude<Category, "All">;
};

const CATEGORIES: Category[] = [
  "All",
  "Data Entry",
  "Display",
  "Layout",
  "Feedback",
];

const COMPONENTS: ComponentEntry[] = [
  {
    key: "foundations",
    label: "Foundations",
    icon: "◈",
    sub: "tokens · typography",
    category: "Display",
  },
  {
    key: "frame",
    label: "Frame",
    icon: "⊡",
    sub: "app shell · layout",
    category: "Layout",
  },
  {
    key: "buttons",
    label: "Buttons",
    icon: "◉",
    sub: "primary · states",
    category: "Feedback",
  },
  {
    key: "inputs",
    label: "Inputs",
    icon: "▭",
    sub: "text · password",
    category: "Data Entry",
  },
  {
    key: "select",
    label: "Select",
    icon: "▾",
    sub: "dropdown · styled",
    category: "Data Entry",
  },
  {
    key: "datepicker",
    label: "Date Picker",
    icon: "◫",
    sub: "calendar · dates",
    category: "Data Entry",
  },
  {
    key: "form",
    label: "Form",
    icon: "≡",
    sub: "validated · layout",
    category: "Data Entry",
  },
  {
    key: "radio-tab",
    label: "Radio Button",
    icon: "◎",
    sub: "tab-style group",
    category: "Feedback",
  },
  {
    key: "table",
    label: "Table",
    icon: "⊟",
    sub: "freeze · scroll",
    category: "Display",
  },
  {
    key: "modal",
    label: "Modal",
    icon: "⬚",
    sub: "dialogs · confirm",
    category: "Feedback",
  },
  {
    key: "scroll",
    label: "Scroll",
    icon: "⇕",
    sub: "custom scrollbar",
    category: "Display",
  },
];

const FEATURES = [
  {
    icon: "◈",
    title: "One token system",
    body: "Every component reads from the same CSS variable file. Change your brand colour once and the whole UI updates — no hunting through files.",
  },
  {
    icon: "⚡",
    title: "Ant Design core",
    body: "Powered by Ant Design v6. Curated theme overrides keep the look consistent while built-in a11y and keyboard navigation come included.",
  },
  {
    icon: "▶",
    title: "Live showcase",
    body: "Every variant ships with a live preview, copy-ready code snippet and developer guidance on exactly when — and when not — to use it.",
  },
  {
    icon: "⊟",
    title: "SplitTable",
    body: "Custom freeze-column table with synced vertical scroll, drag-to-resize columns and a horizontal scrollbar pinned to the bottom.",
  },
  {
    icon: "◎",
    title: "Cross-project theme",
    body: "All your projects share the same Synetsu theme. Onboard a new project in minutes. Consistency becomes automatic, not aspirational.",
  },
  {
    icon: "◉",
    title: "Accessible by default",
    body: "Keyboard navigation, focus rings and ARIA attributes are baked in. You ship accessible UI without adding any extra effort.",
    featured: true,
  },
];

const WHY_LIST = [
  {
    title: "One codebase, every project",
    body: "All your company's projects use the same Synetsu theme. Brand consistency across your entire product suite, automatically.",
  },
  {
    title: "Docs that actually help",
    body: "Every component comes with real guidance: when to use it, when not to, and the exact code to copy.",
  },
  {
    title: "No design debt",
    body: "Update your brand colour token once. Every component across every project picks it up instantly.",
  },
  {
    title: "TypeScript throughout",
    body: "Full type-safety. Your editor catches errors before they reach production.",
  },
];

/* ── Component ────────────────────────────────────────────────────────────── */

type Props = {
  onBrowse: (section?: string) => void;
  onDocs: (section?: string) => void;
};

export default function HomePage({ onBrowse, onDocs }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? COMPONENTS
      : COMPONENTS.filter((c) => c.category === activeCategory);

  return (
    <div className="hp">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="hp-nav">
        <div className="hp-container hp-nav-inner">
          <div className="hp-logo" onClick={() => onBrowse()}>
            <img src={synetsuLogo} alt="Synetsu" />
          </div>
          <ul className="hp-nav-links">
            <li onClick={() => onBrowse()}>Components</li>
            <li onClick={() => onDocs()}>Docs</li>
            <li>GitHub</li>
          </ul>
          <div className="hp-nav-cta">
            <button className="hp-btn-ghost" onClick={() => onBrowse()}>
              Sign in
            </button>
            <button
              className="hp-btn-primary"
              onClick={() => onBrowse("buttons")}
            >
              Get Started ↗
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hp-hero">
        <div className="hp-container hp-hero-grid">
          <div className="hp-hero-left">
            <div className="hp-badge">
              <span className="hp-badge-dot" />
              Built on Ant Design v6
            </div>
            <h1 className="hp-h1">
              One theme. Every project.
              <br />
              <em>Zero drift.</em>
            </h1>
            <p className="hp-hero-desc">
              Your <code className="hp-inline-code">--color-brand</code> is
              already set. Stop re-declaring it across 6 different repos.
              Synetsu reads your token file directly — every component, every
              project, always in sync.
            </p>
            <div className="hp-hero-actions">
              <button className="hp-btn-lg" onClick={() => onBrowse("buttons")}>
                Browse Components →
              </button>
              <button className="hp-btn-outline-lg">
                <GithubIcon /> View on GitHub
              </button>
            </div>
          </div>
          <div className="hp-hero-right">
            <div className="hp-code-window">
              <div className="hp-code-bar">
                <span className="hp-dot hp-dot-r" />
                <span className="hp-dot hp-dot-y" />
                <span className="hp-dot hp-dot-g" />
                <span className="hp-code-filename">SplitTable.tsx</span>
              </div>
              <div className="hp-code-body">
                <pre>{`// One import. Full design system.

import { SplitTable, useTheme }
  from '@synetsu/core'

export function DataView() {
  const theme = useTheme()

  return (
    <SplitTable
      columns={columns}
      frozenLeft={2}
      syncedScroll
      resizable
    />
  )
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div className="hp-stats">
        <div className="hp-container hp-stats-grid">
          {[
            { val: "11", lbl: "Production components" },
            { val: "Ant Design v6", lbl: "Foundation" },
            { val: "TypeScript", lbl: "Type-safe by default" },
            { val: "SCSS Tokens", lbl: "One variable file" },
          ].map((s, i) => (
            <div key={i} className="hp-stat">
              <span className="hp-stat-val">{s.val}</span>
              <span className="hp-stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why ──────────────────────────────────────────────────────────── */}
      <section className="hp-section">
        <div className="hp-container">
          <p className="hp-eyebrow">Why Synetsu</p>
          <h2 className="hp-h2">Built for real product teams.</h2>
          <p className="hp-section-desc">
            Not a generic kit. A focused, opinionated system where every
            component ships with a live preview, copy-ready code and guidance on
            when to use it.
          </p>
          <div className="hp-features-grid">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`hp-feature-card${f.featured ? " featured" : ""}`}
              >
                <div className="hp-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Components ───────────────────────────────────────────────────── */}
      <section className="hp-comp-section">
        <div className="hp-container">
          <div className="hp-comp-header">
            <div>
              <p className="hp-eyebrow">Components</p>
              <h2 className="hp-h2">Everything you need.</h2>
            </div>
            <button
              className="hp-btn-primary"
              onClick={() => onBrowse("foundations")}
            >
              Browse all →
            </button>
          </div>
          <div className="hp-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`hp-tab${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="hp-comp-grid">
            {filtered.map((c) => (
              <div
                key={c.key}
                className="hp-comp-card"
                onClick={() => onBrowse(c.key)}
              >
                <div className="hp-comp-icon">{c.icon}</div>
                <div>
                  <div className="hp-comp-name">{c.label}</div>
                  <div className="hp-comp-sub">{c.sub}</div>
                </div>
              </div>
            ))}
            {activeCategory === "All" && (
              <div className="hp-comp-card hp-comp-card--more">
                <div
                  className="hp-comp-icon"
                  style={{
                    background: "var(--brand-3)",
                    color: "var(--brand-9)",
                  }}
                >
                  +
                </div>
                <div>
                  <div
                    className="hp-comp-name"
                    style={{ color: "var(--brand-8)" }}
                  >
                    More coming
                  </div>
                  <div
                    className="hp-comp-sub"
                    style={{ color: "var(--brand-6)" }}
                  >
                    in progress
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Trust ────────────────────────────────────────────────────────── */}
      <section className="hp-trust">
        <div className="hp-container hp-trust-grid">
          <div className="hp-trust-left">
            <p className="hp-eyebrow">Why teams choose it</p>
            <h2 className="hp-h2">
              Stop rebuilding the
              <br />
              same components.
            </h2>
            <ul className="hp-why-list">
              {WHY_LIST.map((w) => (
                <li key={w.title} className="hp-why-item">
                  <span className="hp-why-check">✓</span>
                  <div>
                    <div className="hp-why-title">{w.title}</div>
                    <div className="hp-why-body">{w.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="hp-quote">
            <blockquote>
              "We used to spend the first two sprints of every new project
              setting up the same components. With Synetsu, we{" "}
              <strong>start shipping features on day one.</strong> The token
              system means we've not had a brand consistency issue since."
            </blockquote>
            <div className="hp-quote-author">
              <div className="hp-avatar">RK</div>
              <div>
                <div className="hp-author-name">Rahel Kebede</div>
                <div className="hp-author-role">
                  Lead Engineer, Dakarai Systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="hp-cta">
        <div className="hp-container hp-cta-body">
          <h2>Ready to ship faster?</h2>
          <p>
            Add Synetsu to your project, set your theme once and build with
            components that are already production-ready, accessible and
            documented.
          </p>
          <div className="hp-cta-actions">
            <button
              className="hp-btn-white"
              onClick={() => onBrowse("buttons")}
            >
              Browse Components →
            </button>
            <button className="hp-btn-white-outline">View on GitHub</button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="hp-footer">
        <div className="hp-container hp-footer-inner">
          <div className="hp-footer-logo">
            Shin<span>Etsu</span>
          </div>
          <ul className="hp-footer-links">
            {["Components", "Docs", "GitHub", "Changelog"].map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
          <div className="hp-footer-tech">
            Built with Ant Design · TypeScript · React · Vite
          </div>
        </div>
      </footer>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
