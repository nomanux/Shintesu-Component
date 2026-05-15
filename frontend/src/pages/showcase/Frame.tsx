import React from "react";
import "./Frame.scss";
import { Button, Divider, Dropdown, Flex, Typography } from "antd";
import type { MenuProps } from "antd";

const { Title } = Typography;
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import { GlobalTable } from "./Table";
import synetsuLogo from "../../assets/synetsu.svg";
import profileIcon from "../../assets/Profile.svg";

function DownArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.486251 3.1995C0.724828 2.94502 1.12452 2.93214 1.37899 3.1707L5.99974 7.50266L10.6204 3.1707C10.875 2.93214 11.2746 2.94502 11.5133 3.1995C11.7517 3.45398 11.7389 3.85367 11.4845 4.09224L6.4317 8.8292C6.18876 9.05695 5.81071 9.05695 5.56777 8.8292L0.515052 4.09224C0.260572 3.85367 0.247687 3.45398 0.486251 3.1995Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FrameGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Standard application page shell: header, title bar, content with drop frames",
        "Header: Synetsu logo (left), navigation items (center), staging tag + user (right)",
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

type NavItem = {
  key: string;
  label: string;
  menu: MenuProps["items"];
};

const navItems: NavItem[] = [
  {
    key: "n1",
    label: "Navigation Item",
    menu: [
      { key: "n1-1", label: "Submenu item 1" },
      { key: "n1-2", label: "Submenu item 2" },
      { key: "n1-3", label: "Submenu item 3" },
      { key: "n1-4", label: "Submenu item 4" },
    ],
  },
  {
    key: "n2",
    label: "Navigation Item",
    menu: [
      { key: "n2-1", label: "Submenu item 1" },
      { key: "n2-2", label: "Submenu item 2" },
      { key: "n2-3", label: "Submenu item 3" },
      { key: "n2-4", label: "Submenu item 4" },
    ],
  },
];

export default function FrameSection() {
  const [activeNav, setActiveNav] = React.useState("n1");

  return (
    <Flex vertical gap={24}>
      <div>
        <SectionLabel>Page frame template</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        <div className="frame-scroll-wrapper">
        <div className="frame-demo">
          {/* Header */}
          <div className="frame-header">
            <img src={synetsuLogo} alt="Synetsu" className="frame-logo" />

            <div className="frame-nav">
              {navItems.map((item) => (
                <Dropdown
                  key={item.key}
                  menu={{ items: item.menu }}
                  trigger={["hover"]}
                  placement="bottomLeft"
                >
                  <div
                    className={`frame-nav-item${activeNav === item.key ? " active" : ""}`}
                    onClick={() => setActiveNav(item.key)}
                  >
                    {item.label}
                    <DownArrow />
                  </div>
                </Dropdown>
              ))}
            </div>

            <Flex gap={32} align="center">
              <span className="frame-tag">Staging v0.1</span>
              <div className="frame-user">
                <img src={profileIcon} alt="User" width={24} height={24} />
                <span className="frame-user-name">hin01</span>
                <DownArrow />
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
              <Button size="small">Cancel</Button>
            </Flex>
          </div>
        </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`import synetsuLogo from "./assets/synetsu.svg";

<div className="frame-demo">
  <div className="frame-header">
    <img src={synetsuLogo} alt="Synetsu" className="frame-logo" />
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
    <div className="frame-dropzone">{/* top content */}</div>
    <Divider />
    <div className="frame-table-wrapper">
      <ShowcaseTable />
    </div>
    <div className="frame-dropzone">{/* bottom content */}</div>
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
