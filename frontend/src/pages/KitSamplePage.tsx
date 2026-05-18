/**
 * KitSamplePage — sample business screen
 * URL: /kit/sample
 *
 * Reproduces a typical Shinetsu data-entry screen:
 *  • Full nav bar with multiple menu items (keyboard shortcuts)
 *  • 2-column filter form using SpecialInput and Input
 *  • Table toolbar with row-action buttons
 *  • SplitTable with SpecialInput (#Value-C) and Input (#Value-L) cells
 *  • Ant Design Pagination
 *  • Footer with 更新 / 閉じる buttons
 */

import React from "react";
import {
  Button,
  Dropdown,
  Flex,
  Input,
  Pagination,
  Table,
} from "antd";
import type { MenuProps } from "antd";
import { SplitTable, SpecialInput, AppModal } from "../components";
import { TableHeaderCell } from "./showcase/Table";
import { modalWidth } from "../theme";
import shinetsuLogo from "../assets/shinetsu.svg";


/* ── Types ───────────────────────────────────────────────────────────────── */

type Row = {
  key: number;
  logonId: string;
  logonName: string;
  col1: string;
  level1: string;
  order: string;
  col2: string;
  screen2: string;
  col3: string;
  system3: string;
  level: string;
};

/* ── Sample data ─────────────────────────────────────────────────────────── */

const TOTAL_ROWS = 50;
const PAGE_SIZE_DEFAULT = 10;

const allData: Row[] = Array.from({ length: TOTAL_ROWS }, (_, i) => ({
  key: i + 1,
  logonId: "",
  logonName: "",
  col1: "",
  level1: "",
  order: "",
  col2: "",
  screen2: "",
  col3: "",
  system3: "",
  level: "",
}));

/* ── Down arrow icon ─────────────────────────────────────────────────────── */

function ChevronDown({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.486 3.2C0.725 2.945 1.125 2.932 1.379 3.171L6 7.503L10.62 3.171C10.875 2.932 11.275 2.945 11.513 3.2C11.752 3.454 11.739 3.854 11.485 4.092L6.432 8.829C6.189 9.057 5.811 9.057 5.568 8.829L0.515 4.092C0.261 3.854 0.248 3.454 0.486 3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Nav items ───────────────────────────────────────────────────────────── */

const subMenu = (prefix: string): MenuProps["items"] =>
  Array.from({ length: 4 }, (_, i) => ({
    key: `${prefix}-${i + 1}`,
    label: `サブメニュー ${i + 1}`,
  }));

const NAV: { label: string; hasMenu?: boolean; active?: boolean }[] = [
  { label: "ファイル(F)" },
  { label: "ツール(T)" },
  { label: "業務(G)", hasMenu: true },
  { label: "マスタメンテナンス(M)", hasMenu: true },
  { label: "セキュリティ(S)", hasMenu: true, active: true },
  { label: "レイアウト(Z)" },
  { label: "ロック(L)" },
  { label: "ユーザメンテ(O)", hasMenu: true },
  { label: "ウィンドウ(W)", hasMenu: true },
  { label: "ヘルプ(H)" },
];

/* ── Table columns ───────────────────────────────────────────────────────── */

const COLUMNS = [
  {
    title: "No.",
    key: "no",
    width: 55,
    sorter: true,
    onCell: () => ({ className: "cell-text" }),
    render: (_: unknown, __: unknown, i: number) => i + 1,
  },
  {
    title: "LOGONID",
    key: "logonId",
    width: 130,
    sorter: true,
    render: () => <SpecialInput size="small" />,
  },
  {
    title: "LOGON者名称",
    key: "logonName",
    width: 160,
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "(1)",
    key: "col1",
    width: 100,
    sorter: true,
    render: () => <SpecialInput size="small" />,
  },
  {
    title: "(1)業務レベル",
    key: "level1",
    width: 120,
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "起動順",
    key: "order",
    width: 80,
    sorter: true,
    render: () => <Input size="small" style={{ textAlign: "right" }} />,
  },
  {
    title: "(2)",
    key: "col2",
    width: 100,
    sorter: true,
    render: () => <SpecialInput size="small" />,
  },
  {
    title: "(2)画面名称",
    key: "screen2",
    width: 160,
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "(3)",
    key: "col3",
    width: 100,
    sorter: true,
    render: () => <SpecialInput size="small" />,
  },
  {
    title: "(3)システム種別",
    key: "system3",
    width: 140,
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "LEVELCD1",
    key: "level",
    width: 100,
    sorter: true,
    render: () => <SpecialInput size="small" />,
  },
];

const DEFAULT_WIDTHS = Object.fromEntries(COLUMNS.map((c) => [c.key, c.width]));
const DEFAULT_ORDER = COLUMNS.map((c) => c.key);

/* ── Inner table — drag-to-reorder + resize + row selection ─────────────── */

function DataTable({ data }: { data: Row[] }) {
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
  const [order, setOrder] = React.useState<string[]>(DEFAULT_ORDER);
  const [widths, setWidths] = React.useState<Record<string, number>>(DEFAULT_WIDTHS);
  const dragKey = React.useRef<string | null>(null);

  const startResize = (key: string, startX: number) => {
    const startW = widths[key];
    const onMove = (e: MouseEvent) =>
      setWidths((prev) => ({ ...prev, [key]: Math.max(50, startW + e.clientX - startX) }));
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const columns = order.map((key) => {
    const col = COLUMNS.find((c) => c.key === key)!;
    const w = widths[key];
    return {
      ...col,
      width: w,
      onHeaderCell: () => ({
        colKey: key,
        style: { width: w },
        onResizeStart: (x: number) => startResize(key, x),
        onDragStart: (e: React.DragEvent) => {
          dragKey.current = key;
          e.dataTransfer.effectAllowed = "move";
        },
        onDragOver: (e: React.DragEvent) => e.preventDefault(),
        onDrop: (e: React.DragEvent) => {
          e.preventDefault();
          const src = dragKey.current;
          dragKey.current = null;
          if (!src || src === key) return;
          setOrder((prev) => {
            const next = [...prev];
            next.splice(next.indexOf(src), 1);
            next.splice(next.indexOf(key), 0, src);
            return next;
          });
        },
      }),
    };
  });

  const totalWidth = order.reduce((s, k) => s + widths[k], 0);

  return (
    <Table
      bordered
      size="small"
      components={{ header: { cell: TableHeaderCell } }}
      columns={columns}
      dataSource={data}
      scroll={{ x: totalWidth, y: 320 }}
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

/* ── KitSamplePage ───────────────────────────────────────────────────────── */

type Props = { onBack?: () => void };

export default function KitSamplePage({ onBack }: Props) {
  const [page, setPage] = React.useState(6);
  const [pageSize] = React.useState(PAGE_SIZE_DEFAULT);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [splitWidth, setSplitWidth] = React.useState(0);

  const pagedData = allData.slice((page - 1) * pageSize, page * pageSize);

  const inlineLabel: React.CSSProperties = {
    fontSize: 13,
    color: "var(--gray-9)",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: "var(--gray-1)",
        fontSize: 13,
      }}
    >
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header
        style={{
          height: 40,
          background: "var(--gray-1)",
          borderBottom: "1px solid var(--gray-4)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 0,
          flexShrink: 0,
        }}
      >
        <img src={shinetsuLogo} alt="Shinetsu" style={{ height: 18, width: "auto", marginRight: 12 }} />

        <div style={{ display: "flex", height: "100%", flex: 1 }}>
          {NAV.map((item) => {
            const content = (
              <div
                style={{
                  padding: "0 10px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: item.active ? 600 : 400,
                  color: item.active ? "var(--brand-6)" : "var(--gray-9)",
                  borderBottom: item.active
                    ? "2px solid var(--brand-6)"
                    : "2px solid transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
                {item.hasMenu && <ChevronDown size={9} />}
              </div>
            );

            return item.hasMenu ? (
              <Dropdown
                key={item.label}
                menu={{ items: subMenu(item.label) }}
                trigger={["click"]}
                placement="bottomLeft"
              >
                {content}
              </Dropdown>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        <Flex gap={10} align="center">
          <span
            style={{
              background: "var(--brand-1)",
              color: "var(--brand-7)",
              border: "1px solid var(--brand-2)",
              borderRadius: 10,
              padding: "2px 8px",
              fontSize: 11,
              whiteSpace: "nowrap",
            }}
          >
            Staging v0.1
          </span>
          <Flex gap={4} align="center" style={{ cursor: "pointer", fontSize: 12, color: "var(--gray-9)" }}>
            <span>hin01</span>
            <ChevronDown size={9} />
          </Flex>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                fontSize: 11,
                padding: "2px 8px",
                border: "1px solid var(--gray-4)",
                borderRadius: 3,
                background: "var(--gray-2)",
                color: "var(--gray-7)",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          )}
        </Flex>
      </header>

      {/* ── Page title ───────────────────────────────────────────────── */}
      <div
        style={{
          padding: "5px 16px",
          borderBottom: "1px solid var(--gray-4)",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--gray-9)",
          flexShrink: 0,
        }}
      >
        LOGON起動画面管理マスタ 直江津事業所 BJIT
      </div>

      {/* ── Filter form ──────────────────────────────────────────────── */}
      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid var(--gray-4)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "6px 24px", alignItems: "center" }}>
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...inlineLabel, width: 80, justifyContent: "flex-end" }}>LOGONID</span>
              <SpecialInput size="small" style={{ width: 120 }} />
              <Input size="small" style={{ flex: 1 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...inlineLabel, width: 80, justifyContent: "flex-end" }}>業務レベル</span>
              <SpecialInput size="small" style={{ width: 120 }} />
              <Input size="small" style={{ flex: 1 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...inlineLabel, width: 80, justifyContent: "flex-end" }}>システム種別</span>
              <Input size="small" defaultValue="100" style={{ flex: 1 }} />
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...inlineLabel, width: 64, justifyContent: "flex-end" }}>所属部門</span>
              <SpecialInput size="small" style={{ width: 100 }} />
              <Input size="small" style={{ flex: 1 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...inlineLabel, width: 64, justifyContent: "flex-end" }}>画面ID</span>
              <SpecialInput size="small" style={{ width: 80 }} />
              <Input size="small" style={{ flex: 1 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...inlineLabel, width: 64, justifyContent: "flex-end" }}>事業所</span>
              <Input size="small" defaultValue="11" style={{ width: 60 }} />
            </div>
          </div>

          {/* Buttons */}
          <Flex gap={6} align="flex-end" style={{ height: "100%", paddingBottom: 2 }}>
            <Button type="primary" size="small">検索(S)</Button>
            <Button size="small">クリア(L)</Button>
          </Flex>
        </div>
      </div>

      {/* ── Table area ───────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: "0 8px 8px",
        }}
      >
        {/* Toolbar */}
        <Flex
          align="center"
          justify="space-between"
          style={{ padding: "6px 0", flexShrink: 0 }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--gray-9)",
              background: "var(--gray-2)",
              border: "1px solid var(--gray-4)",
              borderBottom: "none",
              padding: "3px 12px",
            }}
          >
            起動画面一覧
          </div>
          <Flex gap={4}>
            <Button type="primary" size="small">行挿入(I)</Button>
            <Button type="primary" size="small">行複写(Y)</Button>
            <Button size="small">行削除(D)</Button>
          </Flex>
        </Flex>

        {/* SplitTable */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            border: "1px solid var(--gray-4)",
            overflow: "hidden",
          }}
        >
          <SplitTable
            data={pagedData}
            dataTable={<DataTable data={pagedData} />}
            splitWidth={splitWidth}
            onSplitWidthChange={setSplitWidth}
          />
        </div>

        {/* Pagination */}
        <Flex justify="center" style={{ padding: "6px 0", flexShrink: 0 }}>
          <Pagination
            size="small"
            current={page}
            pageSize={pageSize}
            total={TOTAL_ROWS}
            showQuickJumper
            showSizeChanger={false}
            onChange={(p) => setPage(p)}
          />
        </Flex>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "8px 16px",
          background: "var(--gray-1)",
          borderTop: "1px solid var(--gray-4)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <Button
          type="primary"
          size="small"
          onClick={() => setModalOpen(true)}
        >
          更新(U)
        </Button>
        <Button size="small" onClick={onBack}>閉じる(X)</Button>
      </div>

      {/* ── Confirm modal ─────────────────────────────────────────────── */}
      <AppModal
        title="確認"
        width={modalWidth.sm}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="ok" type="primary" size="small" onClick={() => setModalOpen(false)}>
            OK
          </Button>,
          <Button key="cancel" size="small" onClick={() => setModalOpen(false)}>
            キャンセル
          </Button>,
        ]}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--gray-8)" }}>
          変更を保存してもよろしいですか？
        </p>
      </AppModal>
    </div>
  );
}
