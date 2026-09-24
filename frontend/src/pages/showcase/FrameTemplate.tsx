/**
 * FrameTemplate — the application page shell (header, page title, filter bar,
 * table, footer). Rendered by the Frame showcase section and, full screen, by
 * the Demo Screen, so both always show the same UI with the same class names.
 */

import React from "react";
import "./Frame.scss";
import { Button, Divider, Dropdown, Flex, Typography } from "antd";
import type { MenuProps } from "antd";
import { GlobalTable } from "./Table";
import FrameFilterBar from "./FrameFilterBar";
import logo from "../../assets/logo.svg";
import profileIcon from "../../assets/Profile.svg";

const { Title } = Typography;

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

type Props = {
  /** Fill the whole viewport; the table grows to the available height. */
  fullScreen?: boolean;
  /** Extra header content on the right, e.g. a "Back to Showcase" button. */
  headerExtra?: React.ReactNode;
  onSave?: () => void;
};

export default function FrameTemplate({ fullScreen, headerExtra, onSave }: Props) {
  const [activeNav, setActiveNav] = React.useState("n1");

  return (
    <div className={`frame-demo${fullScreen ? " frame-demo--full" : ""}`}>
      {/* Header */}
      <div className="frame-header">
        <img src={logo} alt="SH-Component" className="frame-logo" />

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
          {headerExtra}
        </Flex>
      </div>

      {/* Page title */}
      <div className="frame-page-title">
        <Title level={5} style={{ margin: 0, lineHeight: "20px" }}>
          Page title
        </Title>
      </div>

      {/* Content: filter bar + table */}
      <div className="frame-content">
        <FrameFilterBar />
        <Divider />
        <div className="frame-table-wrapper">
          <GlobalTable height={fullScreen ? "fill" : 400} />
        </div>
      </div>

      <div className="frame-footer">
        <Flex gap={8} justify="end">
          <Button size="small" type="primary" onClick={onSave}>
            Save
          </Button>
          <Button size="small">Cancel</Button>
        </Flex>
      </div>
    </div>
  );
}
