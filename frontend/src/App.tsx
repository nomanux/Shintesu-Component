import React from "react";
import { App as AntApp, ConfigProvider } from "antd";
import { getShinetsuTheme } from "./theme";
import ComponentShowcase from "./pages/ComponentShowcase";
import HomePage from "./pages/HomePage";
import DocsPage from "./pages/DocsPage";

type Page = "home" | "showcase" | "docs";

export default function App() {
  const [dark, setDark] = React.useState<boolean>(() => {
    try {
      const v = localStorage.getItem("shinetsu:dark");
      return v === "1";
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    try {
      if (dark) {
        localStorage.setItem("shinetsu:dark", "1");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        localStorage.removeItem("shinetsu:dark");
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch {
      // ignore
    }
  }, [dark]);

  const [page, setPage] = React.useState<Page>("showcase");
  const [activeSection, setActiveSection] = React.useState("frame");
  const [docsSection, setDocsSection] = React.useState("introduction");

  const handleBrowse = (section?: string) => {
    if (section) setActiveSection(section);
    setPage("showcase");
  };

  const handleDocs = (section?: string) => {
    if (section) setDocsSection(section);
    setPage("docs");
  };

  return (
    <ConfigProvider theme={getShinetsuTheme(dark)}>
      <AntApp>
        {page === "home" && (
          <HomePage onBrowse={handleBrowse} onDocs={handleDocs} />
        )}
        {page === "docs" && (
          <DocsPage
            initialSection={docsSection}
            onHome={() => setPage("home")}
            onShowcase={handleBrowse}
            // pass dark state so pages can reflect theme if needed
            dark={dark}
            onToggleDark={() => setDark((d) => !d)}
          />
        )}
        {page === "showcase" && (
          <ComponentShowcase
            initialSection={activeSection}
            onHome={() => setPage("home")}
            dark={dark}
            onToggleDark={() => setDark((d) => !d)}
          />
        )}
      </AntApp>
    </ConfigProvider>
  );
}
