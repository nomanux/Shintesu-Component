import React from "react";
import { App as AntApp, ConfigProvider } from "antd";
import { shintetsuTheme } from "./theme";
import ComponentShowcase from "./pages/ComponentShowcase";
import HomePage from "./pages/HomePage";

type Page = "home" | "showcase";

export default function App() {
  const [page, setPage] = React.useState<Page>("home");
  const [activeSection, setActiveSection] = React.useState("foundations");

  const handleBrowse = (section?: string) => {
    if (section) setActiveSection(section);
    setPage("showcase");
  };

  return (
    <ConfigProvider theme={shintetsuTheme}>
      <AntApp>
        {page === "home" ? (
          <HomePage onBrowse={handleBrowse} />
        ) : (
          <ComponentShowcase
            initialSection={activeSection}
            onHome={() => setPage("home")}
          />
        )}
      </AntApp>
    </ConfigProvider>
  );
}
