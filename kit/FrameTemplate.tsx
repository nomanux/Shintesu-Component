/**
 * FrameTemplate.tsx  —  Shinetsu Kit
 * ─────────────────────────────────────────────────────────────────────────────
 * A complete, copy-paste page template.  Drop this into your project as
 * the shell for any new authenticated page.
 *
 * What's included:
 *   • Top header  (logo · navigation with dropdowns · staging badge · user)
 *   • Page title bar
 *   • Content area (placeholder frames you replace with real content)
 *   • SplitTable with freeze-column support
 *   • Footer with Save / Cancel buttons
 *
 * Customise:
 *   1. Replace NAV_ITEMS labels and menu items
 *   2. Replace "Page title" with your page name
 *   3. Swap the <SplitTable> data and columns for your own
 *   4. Remove or keep the top/bottom dropzone frames
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from "react";
import { Button, Dropdown, Flex, Table, Typography } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { modalWidth } from "./theme";
import { AppModal, SplitTable } from "./components";
import shinetsuLogo from "./shinetsu.svg";
import "./index.css";

const { Title } = Typography;

/* ── Types ───────────────────────────────────────────────────────────────── */

type NavItem = {
  key: string;
  label: string;
  menu: MenuProps["items"];
};

/* ── Sample data (replace with real data) ────────────────────────────────── */

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

/** Sample columns — replace with your real column definitions. */
const COLUMNS = [
  { title: "No.", key: "no", width: 60, onCell: () => ({ className: "cell-text" }), render: (_: unknown, __: unknown, i: number) => i + 1 },
  { title: "Name",   dataIndex: "name",   key: "name",   onCell: () => ({ className: "cell-text" }) },
  { title: "Status", dataIndex: "status", key: "status", onCell: () => ({ className: "cell-text" }) },
  { title: "Date",   dataIndex: "date",   key: "date",   onCell: () => ({ className: "cell-text" }) },
];

/** Sample rows — replace with your real data source. */
const SAMPLE_DATA = Array.from({ length: 30 }, (_, i) => ({
  key: i + 1,
  name:   `Row ${i + 1}`,
  status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Closed",
  date:   `2025-01-${String(i + 1).padStart(2, "0")}`,
}));

/* ── Inner table (passed to SplitTable) ──────────────────────────────────── */

function DataTable({ data }: { data: typeof SAMPLE_DATA }) {
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);

  return (
    <Table
      bordered
      size="small"
      columns={COLUMNS}
      dataSource={data}
      scroll={{ x: 600, y: 320 }}
      pagination={false}
      rowClassName={(r) => (selectedKeys.includes(r.key) ? "row-selected" : "")}
      onRow={(r) => ({
        onClick: () =>
          setSelectedKeys((prev) =>
            prev.includes(r.key)
              ? prev.filter((k) => k !== r.key)
              : [...prev, r.key],
          ),
        style: { cursor: "pointer" },
      })}
    />
  );
}

/* ── FrameTemplate ───────────────────────────────────────────────────────── */

export default function FrameTemplate() {
  const [activeNav, setActiveNav] = React.useState("n1");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [modalOpen, setModalOpen] = React.useState(false);

  const pagedData = SAMPLE_DATA.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "var(--gray-2)",
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        style={{
          height: 56,
          background: "var(--gray-1)",
          borderBottom: "1px solid var(--gray-4)",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 24,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <img src={shinetsuLogo} alt="Shinetsu" style={{ height: 22, width: "auto", cursor: "pointer" }} />

        {/* Nav items */}
        <div style={{ display: "flex", height: "100%", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
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
                  fontWeight: activeNav === item.key ? 600 : 400,
                  color: activeNav === item.key ? "var(--brand-6)" : "var(--gray-9)",
                  borderBottom: activeNav === item.key ? "2px solid var(--brand-6)" : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {item.label}
                <DownOutlined style={{ fontSize: 10 }} />
              </div>
            </Dropdown>
          ))}
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
          <Flex gap={6} align="center" style={{ cursor: "pointer", fontSize: 14 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--gray-3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gray-7)",
              }}
            >
              <UserOutlined />
            </div>
            <span>hin01</span>
            <DownOutlined style={{ fontSize: 10 }} />
          </Flex>
        </Flex>
      </header>

      {/* ── Page title bar ───────────────────────────────────────────────── */}
      <div
        style={{
          padding: "8px 24px",
          background: "var(--gray-1)",
          borderBottom: "1px solid var(--gray-4)",
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          Page title
        </Title>
      </div>

      {/* ── Content area ─────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          padding: 16,
          background: "var(--st-gray)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Top frame — replace with your own content or remove */}
        <div
          style={{
            border: "1px dashed var(--gray-5)",
            background: "var(--gray-1)",
            padding: "14px 16px",
            fontSize: 13,
            color: "var(--gray-6)",
            borderRadius: 2,
          }}
        >
          Remove this frame and add your content — e.g. search filters, summary cards.
        </div>

        {/* Main content — SplitTable */}
        <div
          style={{
            background: "var(--gray-1)",
            border: "1px solid var(--gray-4)",
            padding: 12,
          }}
        >
          <div style={{ height: 360, border: "1px solid var(--gray-4)" }}>
            <SplitTable
              data={pagedData}
              dataTable={<DataTable data={pagedData} />}
            />
          </div>
          {/* Pagination sits outside SplitTable */}
          <Flex justify="center" style={{ marginTop: 8 }}>
            <table>
              <tbody>
                <tr>
                  <td style={{ padding: "0 4px", color: "var(--gray-7)", fontSize: 13 }}>
                    Page {page} / {Math.ceil(SAMPLE_DATA.length / pageSize)}
                  </td>
                  <td>
                    <Flex gap={4}>
                      <Button size="small" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>‹</Button>
                      <Button size="small" disabled={page >= Math.ceil(SAMPLE_DATA.length / pageSize)} onClick={() => setPage((p) => p + 1)}>›</Button>
                    </Flex>
                  </td>
                </tr>
              </tbody>
            </table>
          </Flex>
        </div>

        {/* Bottom frame — replace or remove */}
        <div
          style={{
            border: "1px dashed var(--gray-5)",
            background: "var(--gray-1)",
            padding: "14px 16px",
            fontSize: 13,
            color: "var(--gray-6)",
            borderRadius: 2,
          }}
        >
          Remove this frame and add your content — e.g. totals, action history.
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "12px 24px",
          background: "var(--gray-1)",
          borderTop: "1px solid var(--gray-4)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <Button size="small" type="primary" onClick={() => setModalOpen(true)}>
          Save
        </Button>
        <Button size="small">Cancel</Button>
      </div>

      {/* ── Confirm modal (example usage) ────────────────────────────────── */}
      <AppModal
        title="Confirm"
        width={modalWidth.sm}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="ok" type="primary" size="small" onClick={() => setModalOpen(false)}>
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
