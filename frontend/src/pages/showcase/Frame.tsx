import "./Frame.scss";
import { Button, Divider, Flex } from "antd";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import FrameTemplate from "./FrameTemplate";

export function FrameGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Standard application page shell: header, title bar, content with drop frames",
        "Header: SH-Component logo (left), navigation items (center), staging tag + user (right)",
        "Active nav item shows teal text with a teal underline",
        "Page title sits in its own bar below the header",
      ]}
      whenToUse={[
        "As the base template for every authenticated page in the app",
        "When the page belongs to the main app shell (not auth, not modal)",
      ]}
    />
  );
}

export default function FrameSection({ onOpenDemo }: { onOpenDemo?: () => void }) {
  return (
    <Flex vertical gap={24}>
      <div>
        <Flex justify="space-between" align="center" style={{ marginBottom: 0 }}>
          <SectionLabel>Page frame template</SectionLabel>
          {onOpenDemo && (
            <Button type="primary" size="small" onClick={onOpenDemo}>
              Go to Demo Screen →
            </Button>
          )}
        </Flex>
        <Divider style={{ margin: "8px 0 16px" }} />

        <div className="frame-scroll-wrapper">
        <FrameTemplate />
        </div>

        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`import logo from "./assets/logo.svg";

<div className="frame-demo">
  <div className="frame-header">
    <img src={logo} alt="SH-Component" className="frame-logo" />
    <div className="frame-nav">
      <Dropdown
        menu={{ items: [{ key: "1", label: "Submenu 1" }, /* ...3 more */] }}
        trigger={["hover"]}
        placement="bottomLeft"
      >
        <div className="frame-nav-item active">
          Navigation Item <DownOutlined />
        </div>
      </Dropdown>
      {/* …repeat for each nav item */}
    </div>
    <span className="frame-tag">Staging v0.1</span>
    <div className="frame-user">...</div>
  </div>

  <div className="frame-page-title">Page title</div>

  <div className="frame-content">
    <FrameFilterBar />
    <Divider />
    <div className="frame-table-wrapper">
      <GlobalTable />
    </div>
  </div>

  <div className="frame-footer">
    <Flex gap={8} justify="end">
      <Button size="small" type="primary">
        Save
      </Button>
      <Button size="small">
        Cancel
      </Button>
    </Flex>
  </div>
</div>`}</CodeBlock>
        </div>
      </div>
    </Flex>
  );
}
