import "./HomePage.scss";
import { Button } from "antd";
import { ArrowRightOutlined, GithubOutlined } from "@ant-design/icons";
import shinetsuLogo from "../assets/shinetsu.svg";

type SectionKey = string;

type ComponentEntry = {
  key: SectionKey;
  label: string;
  icon: string;
  description: string;
};

const components: ComponentEntry[] = [
  { key: "foundations",  label: "Foundations",       icon: "🎨", description: "Color tokens, typography, spacing" },
  { key: "frame",        label: "Frame",              icon: "🖥️", description: "Application page shell template" },
  { key: "buttons",      label: "Buttons",            icon: "🔲", description: "Primary, default, sizes & states" },
  { key: "inputs",       label: "Inputs",             icon: "⌨️", description: "Text, password, SpecialInput" },
  { key: "select",       label: "Select",             icon: "🔽", description: "Dropdown with design-system styling" },
  { key: "datepicker",   label: "Date Picker",        icon: "📅", description: "Calendar date selection" },
  { key: "form",         label: "Form",               icon: "📋", description: "Validated form layout" },
  { key: "radio-tab",    label: "Radio Button (Tab)", icon: "🗂️", description: "Tab-style radio group" },
  { key: "table",        label: "Table",              icon: "📊", description: "SplitTable with freeze & scroll" },
  { key: "modal",        label: "Modal",              icon: "💬", description: "Overlay dialogs & confirmations" },
  { key: "scroll",       label: "Scroll",             icon: "↕️", description: "Custom scrollbar utility" },
];

const features = [
  {
    icon: "🎨",
    title: "One token system",
    body: "Every component reads from the same CSS variable table. Change a brand color once and the whole UI follows — no hunting through files.",
  },
  {
    icon: "⚡",
    title: "Ant Design core",
    body: "Powered by Ant Design v6. Curated theme overrides keep the look consistent while all built-in a11y and keyboard nav come included.",
  },
  {
    icon: "👁️",
    title: "Live showcase",
    body: "Every variant ships with a live preview, copy-ready code snippet, and developer guidance on when and when not to use it.",
  },
  {
    icon: "📊",
    title: "SplitTable",
    body: "Custom freeze-column table with synced vertical scroll, drag-to-resize columns, and a horizontal scrollbar pinned to the bottom.",
  },
];

const stats = [
  { value: `${components.length}`, label: "Components" },
  { value: "Ant Design v6",        label: "Foundation" },
  { value: "TypeScript",           label: "Type-safe" },
  { value: "SCSS Tokens",          label: "Style system" },
];

type Props = {
  onBrowse: (section?: string) => void;
};

export default function HomePage({ onBrowse }: Props) {
  return (
    <div className="home-page">

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <nav className="home-nav">
        <div className="home-nav-inner">
          <div className="home-nav-logo" onClick={() => onBrowse()}>
            <img src={shinetsuLogo} alt="Shintesu" />
            <span>Shintesu</span>
          </div>

          <div className="home-nav-links">
            <span onClick={() => onBrowse()}>Components</span>
          </div>

          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            onClick={() => onBrowse()}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-badge">Built on Ant Design v6</div>

          <h1 className="home-hero-heading">
            Ship polished UI,<br />
            <span className="home-hero-accent">not from scratch.</span>
          </h1>

          <p className="home-hero-sub">
            Shintesu is a production-ready component collection built on Ant Design.
            Consistent design tokens, accessible by default, and documented with live
            previews so your team ships faster and stays on-brand.
          </p>

          <div className="home-hero-actions">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={() => onBrowse("buttons")}
            >
              Browse Components
            </Button>
            <Button size="large" icon={<GithubOutlined />}>
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="home-stats">
        <div className="home-stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="home-stat">
              <span className="home-stat-value">{s.value}</span>
              <span className="home-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="home-features">
        <div className="home-section-inner">
          <h2 className="home-section-heading">Why Shintesu?</h2>
          <p className="home-section-sub">
            A focused, opinionated system built for real product teams — not a generic kit.
          </p>

          <div className="home-features-grid">
            {features.map((f) => (
              <div key={f.title} className="home-feature-card">
                <div className="home-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Component grid ──────────────────────────────────────────────── */}
      <section className="home-components">
        <div className="home-section-inner">
          <h2 className="home-section-heading">Everything you need</h2>
          <p className="home-section-sub">
            {components.length} components across data entry, display, layout, and
            feedback — all styled, documented, and live-previewed.
          </p>

          <div className="home-components-grid">
            {components.map((c) => (
              <div
                key={c.key}
                className="home-component-card"
                onClick={() => onBrowse(c.key)}
              >
                <div className="home-component-icon">{c.icon}</div>
                <div>
                  <div className="home-component-name">{c.label}</div>
                  <div className="home-component-desc">{c.description}</div>
                </div>
                <ArrowRightOutlined className="home-component-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-logo">
            <img src={shinetsuLogo} alt="Shintesu" />
            <span>Shintesu Component</span>
          </div>
          <p className="home-footer-copy">
            Built with Ant Design · TypeScript · React · Vite
          </p>
        </div>
      </footer>

    </div>
  );
}
