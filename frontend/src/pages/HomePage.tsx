import { useState } from "react";
import { Button as AntButton, ConfigProvider, Tag } from "antd";
import AppTable, { type AppColumn } from "../components/AppTable";
import SpecialInput from "../components/SpecialInput";
import "./HomePage.scss";

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
    body: "All your projects share the same Shinetsu theme. Onboard a new project in minutes. Consistency becomes automatic, not aspirational.",
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
    body: "All your company's projects use the same Shinetsu theme. Brand consistency across your entire product suite, automatically.",
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
            <span className="hp-logo-mark">S</span>
            <span className="hp-logo-text">
              Shin<em>etsu</em>
            </span>
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
      <ShinetsuHero onBrowse={onBrowse} />

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
          <p className="hp-eyebrow">Why Shinetsu</p>
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
              setting up the same components. With Shinetsu, we{" "}
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
            Add Shinetsu to your project, set your theme once and build with
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

/* ── Shinetsu Hero (interactive) ──────────────────────────────────────────── */

const BRAND = {
  color: "#0E9A89",
  tint: "#DEF5EE",
  strong: "#0a7969",
};

type Deal = {
  key: string;
  company: string;
  stage: "Won" | "Closing" | "Demo" | "Lost";
  owner: string;
  value: number;
  trend: number[];
};

const STAGE_COLOR: Record<Deal["stage"], string> = {
  Won: "green",
  Closing: "geekblue",
  Demo: "gold",
  Lost: "red",
};

const INITIAL_DEALS: Deal[] = [
  { key: "1", company: "Acme Co",    stage: "Closing", owner: "AS", value: 42000, trend: [4, 6, 5, 8, 7, 9, 11] },
  { key: "2", company: "Globex",     stage: "Demo",    owner: "RM", value: 18500, trend: [2, 3, 2, 4, 5, 5, 6] },
  { key: "3", company: "Initech",    stage: "Won",     owner: "JK", value: 7200,  trend: [1, 2, 2, 3, 4, 5, 7] },
  { key: "4", company: "Umbrella",   stage: "Lost",    owner: "AS", value: 0,     trend: [6, 5, 4, 3, 2, 1, 1] },
  { key: "5", company: "Hooli",      stage: "Demo",    owner: "RM", value: 24800, trend: [3, 4, 6, 5, 7, 8, 8] },
  { key: "6", company: "Massive Dy", stage: "Closing", owner: "JK", value: 61400, trend: [5, 6, 7, 9, 8, 10, 12] },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 64;
  const h = 22;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const fmtMoney = (n: number) => (n === 0 ? "—" : `$${(n / 1000).toFixed(1)}k`);

function ShinetsuHero({ onBrowse }: { onBrowse: (k: string) => void }) {
  const [copied, setCopied] = useState(false);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [filter, setFilter] = useState("");

  const copyInstall = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText("npm i @shinetsu/core").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const filtered = filter
    ? deals.filter((d) => d.company.toLowerCase().includes(filter.toLowerCase()))
    : deals;

  const totalValue = filtered.reduce((s, d) => s + d.value, 0);

  const heroStyle = {
    ["--c-brand" as string]: BRAND.color,
    ["--c-brand-tint" as string]: BRAND.tint,
    ["--c-brand-strong" as string]: BRAND.strong,
  } as React.CSSProperties;

  const columns: AppColumn<Deal>[] = [
    {
      title: "Company",
      key: "company",
      defaultWidth: 150,
      sorter: (a, b) => a.company.localeCompare(b.company),
      render: (_, row) => (
        <span className="shero-table__company">
          <span className="shero-table__avatar" style={{ background: BRAND.tint, color: BRAND.strong }}>
            {row.company[0]}
          </span>
          <strong>{row.company}</strong>
        </span>
      ),
      onCell: () => ({ className: "cell-text" }),
    },
    {
      title: "Stage",
      key: "stage",
      defaultWidth: 100,
      sorter: (a, b) => a.stage.localeCompare(b.stage),
      render: (_, row) => <Tag color={STAGE_COLOR[row.stage]} style={{ margin: 0 }}>{row.stage}</Tag>,
      onCell: () => ({ className: "cell-text" }),
    },
    {
      title: "Owner",
      key: "owner",
      defaultWidth: 70,
      render: (_, row) => <span className="shero-table__owner">{row.owner}</span>,
      onCell: () => ({ className: "cell-text" }),
    },
    {
      title: "Value",
      key: "value",
      defaultWidth: 90,
      sorter: (a, b) => a.value - b.value,
      render: (_, row) => (
        <span className={`shero-table__value${row.value === 0 ? " is-zero" : ""}`}>{fmtMoney(row.value)}</span>
      ),
      onCell: () => ({ className: "cell-text" }),
    },
    {
      title: "Trend",
      key: "trend",
      defaultWidth: 90,
      render: (_, row) => <Sparkline data={row.trend} color={row.stage === "Lost" ? "#D63384" : BRAND.color} />,
      onCell: () => ({ className: "cell-text" }),
    },
  ];

  const onCommit = (newCompany: string) => {
    if (!newCompany.trim()) return;
    setDeals((prev) => [
      {
        key: String(Date.now()),
        company: newCompany.trim(),
        stage: "Demo",
        owner: "ME",
        value: Math.round((Math.random() * 30 + 5) * 1000),
        trend: [2, 3, 4, 5, 6, 7, 8],
      },
      ...prev,
    ]);
  };

  return (
    <section className="shero-wrap" style={heroStyle}>
    <div className="hp-container">
    <div className="shero" data-screen-label="01 Hero">
      <div className="shero__copy">
        <div className="shero-eyebrow">
          <span className="shero-chip">
            <span className="shero-chip__dot" />
            v6.2 · Built on Ant Design v6
          </span>
          <span className="shero-chip shero-chip--new">
            New &nbsp;·&nbsp; Theme Studio
          </span>
        </div>

        <h1 className="shero-h1">
          <span className="shero-line">One theme.</span>
          <span className="shero-line">Every project.</span>
          <span className="shero-line">
            <span className="shero-accent">Zero drift.</span>
          </span>
        </h1>

        <p className="shero-lede">
          Your <code className="shero-code-pill">--color-brand</code> is already
          set. Stop re-declaring it across six different repos — Shinetsu reads
          your token file directly, so every component in every project stays in
          sync.{" "}
          <strong style={{ color: "var(--c-ink-2)", fontWeight: 500 }}>
            Change the value below. Watch the page follow.
          </strong>
        </p>

        <div className="shero-ctas">
          <a href="#" className="shero-btn shero-btn--ink shero-btn--lg" onClick={copyInstall}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 17l6-6-6-6" />
              <path d="M12 19h8" />
            </svg>
            npm i @shinetsu/core
            <span className="shero-kbd">{copied ? "✓" : "⌘C"}</span>
          </a>
          <a
            href="#"
            className="shero-btn shero-btn--ghost shero-btn--lg"
            onClick={(e) => {
              e.preventDefault();
              onBrowse("buttons");
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.18 1.18A11 11 0 0 1 12 6.8c.98 0 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.57.23 2.73.11 3.02.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            Browse Components
          </a>
        </div>

        <div className="shero-trust">
          <span className="shero-trust__item">
            <svg className="shero-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
            </svg>
            <strong>3,412</strong>
            <span>stars</span>
          </span>
          <span className="shero-trust__item">
            <svg className="shero-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M4 20h16" />
            </svg>
            <strong>42k</strong>
            <span>weekly installs</span>
          </span>
          <span className="shero-trust__item"><strong>MIT</strong><span>license</span></span>
          <span className="shero-trust__item"><strong>TypeScript</strong><span>strict</span></span>
          <span className="shero-trust__item"><strong>4.1 kB</strong><span>core, tree-shaken</span></span>
        </div>
      </div>

      <div className="shero-stage">
        <ConfigProvider
          theme={{
            token: { colorPrimary: BRAND.color, colorInfo: BRAND.color, borderRadius: 10 },
          }}
        >
          <div className="shero-deck" aria-label="Live AppTable preview">
            <span className="shero-deck__pulse" />
            <div className="shero-deck__head">
              <div>
                <span className="shero-deck__eyebrow">AppTable · live</span>
                <h3 className="shero-deck__title">Pipeline · Q1 2026</h3>
              </div>
              <div className="shero-deck__metrics">
                <div>
                  <span className="shero-deck__metric-val">{filtered.length}</span>
                  <span className="shero-deck__metric-lbl">deals</span>
                </div>
                <div>
                  <span className="shero-deck__metric-val">{fmtMoney(totalValue)}</span>
                  <span className="shero-deck__metric-lbl">value</span>
                </div>
              </div>
            </div>

            <div className="shero-deck__toolbar">
              <span className="shero-deck__filter-label">Filter</span>
              <input
                className="shero-deck__filter"
                placeholder="Search company…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <AntButton type="primary" size="small">+ New deal</AntButton>
            </div>

            <div className="shero-deck__table">
              <AppTable<Deal>
                columns={columns}
                dataSource={filtered}
                height={260}
                rowKey="key"
                size="small"
              />
            </div>

            <div className="shero-deck__quick">
              <span className="shero-deck__quick-label">Quick add</span>
              <SpecialInput
                size="small"
                placeholder="Type a company name + Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onCommit((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
                style={{ flex: 1 }}
              />
              <span className="shero-deck__quick-hint">↵ to insert · dbl-click to expand</span>
            </div>

            <div className="shero-deck__foot">
              <span className="shero-deck__foot-dot" />
              <span>
                Drag column edges to resize · drag headers to reorder · sort by clicking
              </span>
            </div>
          </div>
        </ConfigProvider>
      </div>
    </div>
    </div>
    </section>
  );
}
