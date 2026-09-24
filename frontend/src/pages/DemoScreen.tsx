/**
 * DemoScreen — full-page Frame UI
 * Shows the real application shell with no showcase chrome around it.
 * Navigate here from the Frame section in the showcase.
 */

import React from "react";
import { Button, Dropdown, Flex, Typography } from "antd";
import type { MenuProps } from "antd";
import { AppModal } from "../components";
import { GlobalTable } from "./showcase/Table";
import { modalWidth } from "../theme";
import logo from "../assets/logo.svg";
import profileIcon from "../assets/Profile.svg";

const { Title } = Typography;

/* ── Down arrow icon ─────────────────────────────────────────────────────── */

function DownArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.486 3.2C0.725 2.945 1.125 2.932 1.379 3.171L6 7.503L10.62 3.171C10.875 2.932 11.275 2.945 11.513 3.2C11.752 3.454 11.739 3.854 11.485 4.092L6.432 8.829C6.189 9.057 5.811 9.057 5.568 8.829L0.515 4.092C0.261 3.854 0.248 3.454 0.486 3.2Z"
        fill="var(--gray-5)"
      />
    </svg>
  );
}

/* ── Nav items ───────────────────────────────────────────────────────────── */

type NavItem = { key: string; label: string; menu: MenuProps["items"] };

const NAV_ITEMS: NavItem[] = [
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

/* ── DemoScreen ──────────────────────────────────────────────────────────── */

type Props = { onBack?: () => void };

export default function DemoScreen({ onBack }: Props) {
  const [activeNav, setActiveNav] = React.useState("n1");
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: "var(--gray-2)",
      }}
    >
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header
        style={{
          height: 52,
          background: "var(--gray-1)",
          borderBottom: "1px solid var(--gray-4)",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 24,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="SH-Component"
          style={{ height: 20, width: "auto" }}
        />

        {/* Nav */}
        <div style={{ display: "flex", height: "100%", flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const active = activeNav === item.key;
            return (
              <Dropdown
                key={item.key}
                menu={{ items: item.menu }}
                trigger={["hover"]}
                placement="bottomLeft"
              >
                <div
                  onClick={() => setActiveNav(item.key)}
                  style={{
                    padding: "0 16px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--brand-6)" : "var(--gray-9)",
                    borderBottom: active
                      ? "2px solid var(--brand-6)"
                      : "2px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  {item.label}
                  <DownArrow />
                </div>
              </Dropdown>
            );
          })}
        </div>

        {/* Right side */}
        <Flex gap={16} align="center">
          <span
            style={{
              background: "var(--brand-1)",
              color: "var(--brand-7)",
              border: "1px solid var(--brand-2)",
              borderRadius: 12,
              padding: "3px 10px",
              fontSize: 12,
              whiteSpace: "nowrap",
            }}
          >
            Staging v0.1
          </span>
          <Flex gap={6} align="center" style={{ cursor: "pointer" }}>
            <img
              src={profileIcon}
              alt="User"
              style={{ width: 24, height: 24, borderRadius: "50%" }}
            />
            <span style={{ fontSize: 14, color: "var(--gray-9)" }}>hin01</span>
            <DownArrow />
          </Flex>
          {/* Back to showcase */}
          {onBack && (
            <button
              onClick={onBack}
              style={{
                fontSize: 12,
                padding: "4px 10px",
                border: "1px solid var(--gray-4)",
                borderRadius: 4,
                background: "var(--gray-2)",
                color: "var(--gray-7)",
                cursor: "pointer",
                marginLeft: 8,
              }}
            >
              ← Back to Showcase
            </button>
          )}
        </Flex>
      </header>

      {/* ── Page title bar ───────────────────────────────────────────── */}
      <div
        style={{
          padding: "8px 24px",
          background: "var(--gray-1)",
          borderBottom: "1px solid var(--gray-4)",
          flexShrink: 0,
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          Page title
        </Title>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 12,
          background: "var(--st-gray)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Table — fills all remaining height */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            background: "var(--gray-1)",
            border: "1px solid var(--gray-4)",
            padding: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GlobalTable />
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "10px 24px",
          background: "var(--gray-1)",
          borderTop: "1px solid var(--gray-4)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <Button size="small" type="primary" onClick={() => setModalOpen(true)}>
          Save
        </Button>
        <Button size="small">Cancel</Button>
      </div>

      {/* ── Confirm modal ─────────────────────────────────────────────── */}
      <AppModal
        title="Confirm"
        width={modalWidth.sm}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key="ok"
            size="small"
            type="primary"
            onClick={() => setModalOpen(false)}
          >
            OK
          </Button>,
          <Button key="cancel" size="small" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        <p style={{ margin: 0, fontSize: 14, color: "var(--gray-8)" }}>
          Are you sure you want to save your changes?
        </p>
      </AppModal>
    </div>
  );
}
