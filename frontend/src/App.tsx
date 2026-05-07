import { App as AntApp, ConfigProvider } from "antd";
import { shintetsuTheme } from "./theme";
import ComponentShowcase from "./pages/ComponentShowcase";

export default function App() {
  return (
    <ConfigProvider theme={shintetsuTheme}>
      <AntApp>
        <ComponentShowcase />
      </AntApp>
    </ConfigProvider>
  );
}
