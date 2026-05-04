import { ConfigProvider } from "antd";
import { shintetsuTheme } from "./theme";
import ComponentShowcase from "./pages/ComponentShowcase";

export default function App() {
  return (
    <ConfigProvider theme={shintetsuTheme}>
      <ComponentShowcase />
    </ConfigProvider>
  );
}
