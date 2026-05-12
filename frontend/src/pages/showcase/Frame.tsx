import React from "react";
import { Button, Divider, Flex, Typography } from "antd";

const { Title } = Typography;
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ShowcaseTable from "./Table";
import shinetsuLogo from "../../assets/shinetsu.svg";

export function FrameGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Standard application page shell: header, title bar, content with drop frames",
        "Header: ShinEtsu logo (left), navigation items (center), staging tag + user (right)",
        "Active nav item shows teal text with a teal underline",
        "Page title sits in its own bar below the header",
        "Content area uses dashed-border drop zones for empty regions",
        "Replace any drop zone with the actual content (table, form, charts) when implementing",
      ]}
      whenToUse={[
        "As the base template for every authenticated page in the app",
        "When the page belongs to the main app shell (not auth, not modal)",
      ]}
      whenNotToUse={[
        "For login or onboarding screens — use a centered card layout",
        "For modal dialogs — use AppModal",
      ]}
    />
  );
}

const navItems = [
  { key: "n1", label: "Navigation Item" },
  { key: "n2", label: "Navigation Item" },
];

export default function FrameSection() {
  const [activeNav, setActiveNav] = React.useState("n1");

  return (
    <Flex vertical gap={24}>
      <div>
        <SectionLabel>Page frame template</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        <div className="frame-demo">
          {/* Header */}
          <div className="frame-header">
            <img src={shinetsuLogo} alt="ShinEtsu" className="frame-logo" />

            <div className="frame-nav">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className={`frame-nav-item${activeNav === item.key ? " active" : ""}`}
                  onClick={() => setActiveNav(item.key)}
                >
                  {item.label}
                  <DownOutlined style={{ fontSize: 10 }} />
                </div>
              ))}
            </div>

            <Flex gap={16} align="center">
              <span className="frame-tag">Staging v0.1</span>
              <div className="frame-user">
                <div className="frame-user-avatar">
                  <UserOutlined />
                </div>
                <span>hin01</span>
                <DownOutlined style={{ fontSize: 10 }} />
              </div>
            </Flex>
          </div>

          {/* Page title */}
          <div className="frame-page-title">
            <Title level={5} style={{ margin: 0 }}>
              Page title
            </Title>
          </div>

          {/* Content with drop zones */}
          <div className="frame-content">
            <div className="frame-dropzone">
              <div> Remove this frame and add your content</div>
            </div>
            <Divider />
            <div className="frame-table-wrapper">
              <ShowcaseTable />
            </div>
            <div className="frame-dropzone">
              Remove this frame and add your content
            </div>
          </div>
          <div className="frame-footer">
            <Flex gap={8} justify="end">
              <Button type="primary">Save</Button>
              <Button>Cancel</Button>
            </Flex>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`import shinetsuLogo from "./assets/shinetsu.svg";

<div className="frame-demo">
  <div className="frame-header">
    <img src={shinetsuLogo} alt="ShinEtsu" className="frame-logo" />
    <div className="frame-nav">
      <div className="frame-nav-item active">Navigation Item</div>
      <div className="frame-nav-item">Navigation Item</div>
    </div>
    <span className="frame-tag">Staging v0.1</span>
    <div className="frame-user">...</div>
  </div>

  <div className="frame-page-title">Page title</div>

  <div className="frame-content">
    <div className="frame-dropzone">{/* top content */}</div>
    <Divider />
    <div className="frame-table-wrapper">
      <ShowcaseTable />
    </div>
    <div className="frame-dropzone">{/* bottom content */}</div>
  </div>

  <div className="frame-footer">
    <Flex gap={8} justify="end">
      <Button type="primary">Save</Button>
      <Button>Cancel</Button>
    </Flex>
  </div>
</div>`}</CodeBlock>
        </div>
      </div>
    </Flex>
  );
}
