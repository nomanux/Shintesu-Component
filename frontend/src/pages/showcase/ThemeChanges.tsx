import React from "react";
import { Segmented, Tabs } from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { colors, shComponentTheme } from "../../theme";
import indexCss from "../../index.css?raw";
import { ANTD_DEFAULTS } from "./antdDefaults";
import CodeBlock from "./CodeBlock";

/* ── Data helpers ────────────────────────────────────────────────────────── */

type Value = string | number;

/** "#fff" → "#ffffff", lower-case, no spaces — so equal colors compare equal. */
function normalize(v: Value) {
  if (typeof v !== "string") return String(v);
  const s = v.toLowerCase().replace(/\s+/g, "");
  return /^#[0-9a-f]{3}$/.test(s) ? `#${s[1]}${s[1]}${s[2]}${s[2]}${s[3]}${s[3]}` : s;
}

/** Reverse lookup: hex → "brand-6" / "gray-5". */
const TOKEN_NAME: Record<string, string> = {};
for (const [scale, steps] of Object.entries({ brand: colors.brand, gray: colors.gray })) {
  for (const [step, hex] of Object.entries(steps)) TOKEN_NAME[normalize(hex)] = `${scale}-${step}`;
}

const isColor = (v: Value) => typeof v === "string" && /^(#|rgb)/i.test(v.trim());

type Row = { key: string; antd: Value; ours: Value };

/** Tokens in theme.ts that differ from Ant Design's default for one component. */
function changedTokens(component: string): Row[] {
  const ours: Record<string, Value> =
    component === "global"
      ? shComponentTheme.token
      : ((shComponentTheme.components as Record<string, Record<string, Value>>)[component] ?? {});
  const defaults = ANTD_DEFAULTS[component] ?? {};
  return Object.keys(ours)
    .filter((k) => k in defaults && normalize(defaults[k]) !== normalize(ours[k]))
    .map((k) => ({ key: k, antd: defaults[k], ours: ours[k] }));
}

/** One "/* ── Title ── *\/" section of index.css, by title. */
function cssSection(title: string): string {
  const lines = indexCss.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`/* ── ${title}`));
  if (start === -1) return "";
  const end = lines.findIndex((l, i) => i > start && l.startsWith("/* ── "));
  return lines.slice(start, end === -1 ? undefined : end).join("\n").trim();
}

/** "brand-6" → "colors.brand[6]" */
const colorsRef = (name: string) => name.replace(/^(\w+)-(\d+)$/, "colors.$1[$2]");

function configSnippet(components: string[], useThemeColors: boolean): string {
  const fmt = (v: Value) => {
    const name = TOKEN_NAME[normalize(v)];
    if (useThemeColors && name) return colorsRef(name);
    return typeof v === "string" ? JSON.stringify(v) : String(v);
  };
  const body = (rows: Row[], indent: string) =>
    rows.map((r) => `${indent}${r.key}: ${fmt(r.ours)},`).join("\n");

  const parts: string[] = [];
  const global = components.includes("global") ? changedTokens("global") : [];
  if (global.length) parts.push(`    token: {\n${body(global, "      ")}\n    },`);

  const comps = components.filter((c) => c !== "global" && changedTokens(c).length);
  if (comps.length) {
    const inner = comps
      .map((c) => `      ${c}: {\n${body(changedTokens(c), "        ")}\n      },`)
      .join("\n");
    parts.push(`    components: {\n${inner}\n    },`);
  }

  const usesColors = useThemeColors && /colors\.\w+\[/.test(parts.join("\n"));
  const header = usesColors ? `import { colors } from "./theme";\n\n` : "";

  return `${header}<ConfigProvider
  theme={{
${parts.join("\n")}
  }}
>
  {/* your app */}
</ConfigProvider>`;
}

/* ── UI ──────────────────────────────────────────────────────────────────── */

function ValueCell({ value, ours }: { value: Value; ours?: boolean }) {
  const name = ours ? TOKEN_NAME[normalize(value)] : undefined;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, minWidth: 0 }}>
      {isColor(value) && (
        <span
          style={{
            flexShrink: 0,
            width: 14,
            height: 14,
            background: String(value),
            border: "1px solid var(--gray-4)",
          }}
        />
      )}
      <span className="type-spec" style={{ whiteSpace: "normal", wordBreak: "break-all" }}>
        {String(value)}
      </span>
      {name && <span style={{ fontSize: 11, color: "var(--brand-7)", whiteSpace: "nowrap" }}>{name}</span>}
    </span>
  );
}

function TokenDiff({ component }: { component: string }) {
  const rows = changedTokens(component);
  if (!rows.length) return null;

  const cell: React.CSSProperties = { padding: "7px 12px", borderTop: "1px solid var(--gray-4)", minWidth: 0 };
  const head: React.CSSProperties = { padding: "7px 12px", fontSize: 11, fontWeight: 700, color: "var(--gray-7)", letterSpacing: 0.6 };

  return (
    <div style={{ marginBottom: 12 }}>
      {component !== "global" && (
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-9)", marginBottom: 6 }}>{component}</div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(140px, 1fr) minmax(120px, 1fr) minmax(140px, 1fr)",
          border: "1px solid var(--gray-4)",
          background: "var(--gray-1)",
          overflowX: "auto",
        }}
      >
        <span style={head}>TOKEN</span>
        <span style={head}>ANT DESIGN DEFAULT</span>
        <span style={head}>OUR VALUE</span>
        {rows.map((r) => (
          <React.Fragment key={r.key}>
            <span style={cell} className="type-token">{r.key}</span>
            <span style={cell}><ValueCell value={r.antd} /></span>
            <span style={cell}><ValueCell value={r.ours} ours /></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

type Props = {
  /** Ant Design component names as used in theme.components, or "global" for theme.token. */
  components: string[];
  /** index.css section titles that style this component beyond what tokens can do. */
  cssSections?: string[];
};

export default function ThemeChanges({ components, cssSections = [] }: Props) {
  const [open, setOpen] = React.useState(true);
  const [valueMode, setValueMode] = React.useState<"theme" | "hex">("theme");

  const tokenCount = components.reduce((n, c) => n + changedTokens(c).length, 0);
  const css = cssSections.map(cssSection).filter(Boolean).join("\n\n");
  if (!tokenCount && !css) return null;

  const items = [
    tokenCount > 0 && {
      key: "tokens",
      label: `Changed tokens (${tokenCount})`,
      children: (
        <>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--gray-7)", lineHeight: 1.6 }}>
            Only tokens that differ from Ant Design's default are listed. Set these in your{" "}
            <code>ConfigProvider</code> to get the same result.
          </p>
          {components.map((c) => <TokenDiff key={c} component={c} />)}
        </>
      ),
    },
    css && {
      key: "css",
      label: "CSS overrides",
      children: (
        <>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--gray-7)", lineHeight: 1.6 }}>
            Tokens can't express these, so <code>index.css</code> sets them. Add them to your global
            CSS as well, or the component won't match.
          </p>
          <CodeBlock language="css">{css}</CodeBlock>
        </>
      ),
    },
    tokenCount > 0 && {
      key: "config",
      label: "Copy config",
      children: (
        <>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--gray-7)", lineHeight: 1.6 }}>
            Only the changes on this page. If you already use our <code>theme.ts</code>, you don't
            need this.
          </p>
          <Segmented
            size="small"
            value={valueMode}
            onChange={(v) => setValueMode(v as "theme" | "hex")}
            options={[
              { label: "Theme colors", value: "theme" },
              { label: "Hex values", value: "hex" },
            ]}
            style={{ marginBottom: 8 }}
          />
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--gray-6)", lineHeight: 1.6 }}>
            {valueMode === "theme"
              ? <>Uses <code>colors</code> from <code>theme.ts</code>. Change a color there once and every component follows.</>
              : <>Plain values, no imports. Use this if you don't copy <code>theme.ts</code>.</>}
          </p>
          <CodeBlock language="tsx">{configSnippet(components, valueMode === "theme")}</CodeBlock>
        </>
      ),
    },
  ].filter(Boolean) as { key: string; label: string; children: React.ReactNode }[];

  return (
    <div style={{ marginBottom: 24, border: "1px solid var(--brand-3)", background: "var(--brand-1)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          font: "inherit",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--brand-7)",
        }}
      >
        What the theme changes from Ant Design
        {open ? <DownOutlined /> : <RightOutlined />}
      </button>
      {open && (
        <div style={{ padding: "0 16px 12px", background: "var(--gray-1)", borderTop: "1px solid var(--brand-3)" }}>
          <Tabs size="small" items={items} />
        </div>
      )}
    </div>
  );
}
