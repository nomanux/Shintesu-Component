/**
 * KitSamplePage — the Frame template with a sample search form on top
 * URL: /kit/sample
 *
 * Uses FrameTemplate (the same shell as the Demo Screen) with the LOGON
 * search form in place of the default search bar and the LOGON table in the
 * table area.
 */

import React from "react";
import { Button, Flex, Input, Radio, theme } from "antd";
import { AppTable, SpecialInput, AppModal } from "../components";
import type { AppColumn } from "../components";
import FrameTemplate from "./showcase/FrameTemplate";
import { colors, modalWidth } from "../theme";
import "./showcase/RadioTab.scss";

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

// AppColumn format — AppTable handles drag/resize/split automatically
const APP_COLUMNS: AppColumn<Row>[] = COLUMNS.map((c) => ({
  ...c,
  defaultWidth: c.width,
}));

/* ── Search form ─────────────────────────────────────────────────────────── */

const inlineLabel: React.CSSProperties = {
  fontSize: 13,
  color: "var(--gray-9)",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
};

function SampleSearchForm() {
  return (
    <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "6px 24px", alignItems: "center" }}>
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
  );
}

/* ── Table ───────────────────────────────────────────────────────────────── */

const TABS = ["起動画面一覧", "業務レベル一覧", "システム種別一覧", "事業所一覧"];

function SampleTable() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZE_DEFAULT);
  const [activeTab, setActiveTab] = React.useState(TABS[0]);
  const { token } = theme.useToken();

  return (
    <>
      {/* Toolbar — Radio Button (Tab) tabs on the left, row actions on the right */}
      <Flex align="flex-end" justify="space-between" style={{ flexShrink: 0 }}>
        <div style={{ lineHeight: 0, position: "relative", zIndex: 1, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <Radio.Group
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            buttonStyle="outline"
            size="small"
            style={{ display: "flex", gap: token.marginXXS }}
          >
            {TABS.map((tab) => (
              <Radio.Button key={tab} value={tab}>
                {tab}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <Flex gap={4} style={{ paddingBottom: 4 }}>
          <Button type="primary" size="small">行挿入(I)</Button>
          <Button type="primary" size="small">行複写(Y)</Button>
          <Button size="small">行削除(D)</Button>
        </Flex>
      </Flex>

      {/* Panel overlaps the tab bar by 1px to merge borders; AppTable has drag/resize/split built in */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${colors.brand[4]}`,
          marginTop: -1,
          position: "relative",
          zIndex: 2,
          background: colors.gray[1],
          padding: token.paddingSM,
        }}
      >
        <AppTable
          columns={APP_COLUMNS}
          dataSource={allData}
          height="fill"
          total={TOTAL_ROWS}
          page={page}
          pageSize={pageSize}
          onPageChange={(p, ps) => { setPage(p); setPageSize(ps as typeof pageSize); }}
        />
      </div>
    </>
  );
}

type Props = { onBack?: () => void };

export default function KitSamplePage({ onBack }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <FrameTemplate
        fullScreen
        filterBar={<SampleSearchForm />}
        table={<SampleTable />}
        onSave={() => setModalOpen(true)}
        headerExtra={
          onBack && (
            <Button size="small" onClick={onBack}>
              ← Back to Showcase
            </Button>
          )
        }
      />

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
    </>
  );
}
