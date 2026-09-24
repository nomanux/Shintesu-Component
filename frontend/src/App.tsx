import React from "react";
import { App as AntApp, ConfigProvider } from "antd";
import { getShComponentTheme } from "./theme";
import ComponentShowcase from "./pages/ComponentShowcase";
import HomePage from "./pages/HomePage";
import DocsPage from "./pages/DocsPage";
import DemoScreen from "./pages/DemoScreen";
import KitGallery from "./pages/KitGallery";
import KitSamplePage from "./pages/KitSamplePage";

type Page = "home" | "showcase" | "docs" | "demo" | "kit";

/* ── URL helpers ─────────────────────────────────────────────────────────── */

/** Known showcase section keys — used to detect whether a path is a section. */
const SHOWCASE_SECTIONS = new Set([
  "foundations", "frame", "buttons", "inputs", "select", "datepicker",
  "form", "radio-tab", "table", "modal", "scroll",
  "introduction", "installation",
]);

/** Known docs section keys */
const DOCS_SECTIONS = new Set([
  "introduction", "installation", "tokens", "components",
]);

function parsePath(): { page: Page; section: string; docsSection: string } {
  const raw = window.location.pathname.replace(/^\//, ""); // strip leading /
  const segment = raw.split("/")[0];

  if (!segment || segment === "home") {
    return { page: "home", section: "frame", docsSection: "introduction" };
  }
  if (segment === "docs") {
    const sub = raw.split("/")[1] ?? "introduction";
    return { page: "docs", section: "frame", docsSection: DOCS_SECTIONS.has(sub) ? sub : "introduction" };
  }
  if (segment === "demo") {
    return { page: "demo", section: "frame", docsSection: "introduction" };
  }
  if (segment === "kit") {
    const sub = raw.split("/")[1] ?? "frametemplate";
    return { page: "kit", section: sub, docsSection: "introduction" };
  }
  if (SHOWCASE_SECTIONS.has(segment)) {
    return { page: "showcase", section: segment, docsSection: "introduction" };
  }
  // Fallback
  return { page: "showcase", section: "frame", docsSection: "introduction" };
}

function pushPath(page: Page, section: string, docsSection = "introduction") {
  let path: string;
  if (page === "home") path = "/";
  else if (page === "demo") path = "/demo";
  else if (page === "kit") path = `/kit/${section}`;
  else if (page === "docs") path = docsSection === "introduction" ? "/docs" : `/docs/${docsSection}`;
  else path = `/${section}`;

  if (window.location.pathname !== path) {
    history.pushState(null, "", path);
  }
}

/* ── App ─────────────────────────────────────────────────────────────────── */

export default function App() {
  const [dark, setDark] = React.useState<boolean>(() => {
    try { return localStorage.getItem("sh-component:dark") === "1"; }
    catch { return false; }
  });

  React.useEffect(() => {
    try {
      if (dark) {
        localStorage.setItem("sh-component:dark", "1");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        localStorage.removeItem("sh-component:dark");
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch { /* ignore */ }
  }, [dark]);

  // Initialise state from the current URL
  const initial = parsePath();
  const [page, setPage] = React.useState<Page>(initial.page);
  const [activeSection, setActiveSection] = React.useState(initial.section);
  const [docsSection, setDocsSection] = React.useState(initial.docsSection);

  // Keep state in sync when the user presses Back/Forward
  React.useEffect(() => {
    const onPop = () => {
      const p = parsePath();
      setPage(p.page);
      setActiveSection(p.section);
      setDocsSection(p.docsSection);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const handleBrowse = (section = "frame") => {
    setActiveSection(section);
    setPage("showcase");
    pushPath("showcase", section);
  };

  const handleDocs = (section = "introduction") => {
    setDocsSection(section);
    setPage("docs");
    pushPath("docs", "docs", section);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    pushPath("showcase", section);
  };

  const handleDocsSectionChange = (section: string) => {
    setDocsSection(section);
    pushPath("docs", "docs", section);
  };

  return (
    <ConfigProvider theme={getShComponentTheme(dark)}>
      <AntApp>
        {page === "home" && (
          <HomePage onBrowse={handleBrowse} onDocs={handleDocs} />
        )}
        {page === "docs" && (
          <DocsPage
            initialSection={docsSection}
            onHome={() => { setPage("home"); pushPath("home", "frame"); }}
            onShowcase={handleBrowse}
            onSectionChange={handleDocsSectionChange}
            dark={dark}
            onToggleDark={() => setDark((d) => !d)}
          />
        )}
        {page === "showcase" && (
          <ComponentShowcase
            initialSection={activeSection}
            onHome={() => { setPage("home"); pushPath("home", "frame"); }}
            onSectionChange={handleSectionChange}
            onOpenDemo={() => { setPage("demo"); pushPath("demo", "demo"); }}
            dark={dark}
            onToggleDark={() => setDark((d) => !d)}
          />
        )}
        {page === "demo" && (
          <DemoScreen
            onBack={() => { setPage("showcase"); setActiveSection("frame"); pushPath("showcase", "frame"); }}
          />
        )}
        {page === "kit" && activeSection !== "sample" && (
          <KitGallery
            onBack={() => { setPage("showcase"); setActiveSection("frame"); pushPath("showcase", "frame"); }}
          />
        )}
        {page === "kit" && activeSection === "sample" && (
          <KitSamplePage
            onBack={() => { setPage("showcase"); setActiveSection("installation"); pushPath("showcase", "installation"); }}
          />
        )}
      </AntApp>
    </ConfigProvider>
  );
}
