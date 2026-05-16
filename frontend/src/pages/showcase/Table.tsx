import React from "react";
import "./Table.scss";
import {
  Table,
  Input,
  Select,
  Checkbox,
  Divider,
  Flex,
  Button,
  Pagination,
} from "antd";
import { colors } from "../../theme";
import { SectionLabel, DownIcon } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";
import SplitTable from "../../components/SplitTable";
import SpecialInput from "../../components/SpecialInput";

const tableData = Array.from({ length: 50 }, (_, i) => ({ key: i + 1 }));

export function TableGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Every table in this project is a SplitTable — never render a bare <Table>",
        "Drag the handle at the bottom-left of the table to freeze left columns; both panels sync vertical scroll",
        "Drag column headers left/right to reorder columns",
        "Drag the right edge of a column header (visible divider) to resize",
        "Column order and widths persist to localStorage automatically",
        "Use cell-text className for text-only columns to get 8px horizontal padding",
        "Embed Select / Input / Checkbox in cells via the column render fn",
      ]}
      whenToUse={[
        "Listing structured data with multiple attributes per row",
        "When users need to sort, filter, or paginate the data",
      ]}
      whenNotToUse={[
        "For a single-column list of items — use a simple list",
        "For dashboards with charts and metrics — use Card layouts",
      ]}
    />
  );
}

const BASE_COLUMNS = [
  {
    title: "No.",
    key: "no",
    defaultWidth: 60,
    sorter: (a: { key: number }, b: { key: number }) => a.key - b.key,
    onCell: () => ({ className: "cell-text" }),
    render: (_: unknown, __: unknown, index: number) => `${index + 1}`,
  },
  {
    title: "Table header",
    key: "select",
    defaultWidth: 160,
    sorter: true,
    render: () => (
      <Select
        size="small"
        suffixIcon={<DownIcon />}
        style={{ width: "100%" }}
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
      />
    ),
  },
  {
    title: "Table header",
    key: "input",
    defaultWidth: 160,
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "Table header",
    key: "text",
    defaultWidth: 160,
    sorter: true,
    onCell: () => ({ className: "cell-text" }),
    render: () => <span>Table cell text</span>,
  },
  {
    title: "Table header",
    key: "checkbox",
    defaultWidth: 100,
    onCell: () => ({ className: "cell-checkbox" }),
    render: () => <Checkbox />,
  },
];

const TABLE_STATE_KEY = "showcase-table-state";

type TableState = {
  order: string[];
  widths: Record<string, number>;
};

function loadTableState(): TableState {
  const defaults: TableState = {
    order: BASE_COLUMNS.map((c) => c.key),
    widths: Object.fromEntries(
      BASE_COLUMNS.map((c) => [c.key, c.defaultWidth]),
    ),
  };
  try {
    const raw = localStorage.getItem(TABLE_STATE_KEY);
    if (!raw) return defaults;
    const saved = JSON.parse(raw) as Partial<TableState>;
    const validKeys = new Set(BASE_COLUMNS.map((c) => c.key));
    const order = saved.order?.filter((k) => validKeys.has(k)) ?? [];
    BASE_COLUMNS.forEach((c) => {
      if (!order.includes(c.key)) order.push(c.key);
    });
    return {
      order,
      widths: { ...defaults.widths, ...(saved.widths ?? {}) },
    };
  } catch {
    return defaults;
  }
}

/**
 * Custom header cell — supports:
 *   • Resize: drag the right edge to change column width
 *   • Reorder: drag the header itself to swap column positions
 */
function TableHeaderCell({
  colKey,
  onResizeStart,
  onDragStart,
  onDragOver,
  onDrop,
  children,
  ...rest
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  colKey?: string;
  onResizeStart?: (startX: number) => void;
  onDragStart?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
  onDrop?: React.DragEventHandler;
}) {
  const [resizeHovered, setResizeHovered] = React.useState(false);
  const [resizing, setResizing] = React.useState(false);

  if (!colKey) return <th {...rest}>{children}</th>;

  const dragDisabled = resizeHovered || resizing;

  return (
    <th
      {...rest}
      draggable={!dragDisabled}
      onDragStart={dragDisabled ? undefined : onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        ...rest.style,
        position: "relative",
        userSelect: "none",
        cursor: dragDisabled ? "col-resize" : "grab",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 8,
          cursor: "col-resize",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        draggable={false}
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setResizing(true);
          onResizeStart?.(e.clientX);
          const onUp = () => {
            setResizing(false);
            document.removeEventListener("mouseup", onUp);
          };
          document.addEventListener("mouseup", onUp);
        }}
        onMouseEnter={() => setResizeHovered(true)}
        onMouseLeave={() => setResizeHovered(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          style={{
            position: "absolute",
            width: "1px",
            height: "60%",
            backgroundColor:
              resizeHovered || resizing ? colors.brand[6] : colors.gray[4],
            opacity: resizeHovered || resizing ? 1 : 0.6,
            transition: "all 0.2s",
            right: "3.5px",
            pointerEvents: "none",
          }}
        />
      </span>
    </th>
  );
}

export default function ShowcaseTable() {
  const [selectedKey, setSelectedKey] = React.useState<React.Key | null>(null);
  const initial = React.useMemo(() => loadTableState(), []);
  const [order, setOrder] = React.useState<string[]>(initial.order);
  const [widths, setWidths] = React.useState<Record<string, number>>(
    initial.widths,
  );

  React.useEffect(() => {
    try {
      localStorage.setItem(TABLE_STATE_KEY, JSON.stringify({ order, widths }));
    } catch {
      // ignore
    }
  }, [order, widths]);

  const dragKey = React.useRef<string | null>(null);

  const startResize = (key: string, startX: number) => {
    const startW = widths[key];
    const onMove = (e: MouseEvent) => {
      setWidths((prev) => ({
        ...prev,
        [key]: Math.max(60, startW + e.clientX - startX),
      }));
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const columns = order.map((key) => {
    const col = BASE_COLUMNS.find((c) => c.key === key)!;
    const currentWidth = widths[key];
    return {
      ...col,
      width: currentWidth,
      onHeaderCell: () => ({
        colKey: key,
        style: { width: currentWidth },
        onResizeStart: (x: number) => startResize(key, x),
        onDragStart: (e: React.DragEvent) => {
          dragKey.current = key;
          e.dataTransfer.effectAllowed = "move";
        },
        onDragOver: (e: React.DragEvent) => e.preventDefault(),
        onDrop: () => {
          if (!dragKey.current || dragKey.current === key) return;
          setOrder((prev) => {
            const from = prev.indexOf(dragKey.current!);
            const to = prev.indexOf(key);
            const next = [...prev];
            next.splice(from, 1);
            next.splice(to, 0, dragKey.current!);
            return next;
          });
          dragKey.current = null;
        },
      }),
    };
  });

  return (
    <Table
      bordered
      size="small"
      components={{ header: { cell: TableHeaderCell } }}
      columns={columns}
      dataSource={tableData}
      scroll={{ x: true }}
      rowClassName={(record) =>
        selectedKey === record.key ? "row-selected" : ""
      }
      onRow={(record) => ({
        onClick: () =>
          setSelectedKey((prev) => (prev === record.key ? null : record.key)),
        style: { cursor: "pointer" },
      })}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        placement: ["bottomCenter"],
        size: "small",
      }}
    />
  );
}

// ── Dummy data ────────────────────────────────────────────────────────────

type SplitRow = { key: number };

const splitTableData: SplitRow[] = Array.from({ length: 50 }, (_, i) => ({
  key: i + 1,
}));

const SELECT_OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

// ── Column definitions ─────────────────────────────────────────────────────

const SPLIT_COLS_BASE = [
  // No.
  {
    key: "no",
    label: "No.",
    width: 60,
    onCell: () => ({ className: "cell-text" }),
    render: (_: unknown, __: SplitRow, i: number) => i + 1,
  },
  // text cell
  {
    key: "select1",
    label: "Table header",
    width: 150,
    onCell: () => ({ className: "cell-text" }),
    render: (_: unknown, r: SplitRow) => `Text ${r.key}`,
  },
  // special input
  {
    key: "select2",
    label: "Table header",
    width: 150,
    render: () => <SpecialInput size="small" style={{ width: "100%" }} />,
  },
  {
    key: "select3",
    label: "Table header",
    width: 150,
    render: () => (
      <Select
        size="small"
        suffixIcon={<DownIcon />}
        style={{ width: "100%" }}
        options={SELECT_OPTIONS}
      />
    ),
  },
  // 2 disabled dropdowns
  {
    key: "select4",
    label: "Table header",
    width: 150,
    render: () => (
      <Select
        size="small"
        suffixIcon={<DownIcon />}
        style={{ width: "100%" }}
        disabled
        value="option1"
        options={SELECT_OPTIONS}
      />
    ),
  },
  {
    key: "select5",
    label: "Table header",
    width: 150,
    render: () => (
      <Select
        size="small"
        suffixIcon={<DownIcon />}
        style={{ width: "100%" }}
        disabled
        value="option1"
        options={SELECT_OPTIONS}
      />
    ),
  },
  // 2 inputs
  {
    key: "input1",
    label: "Table header",
    width: 130,
    render: () => <Input size="small" />,
  },
  {
    key: "input2",
    label: "Table header",
    width: 130,
    render: () => <Input size="small" />,
  },
  // 2 disabled inputs
  {
    key: "input3",
    label: "Table header",
    width: 130,
    render: () => <Input size="small" disabled value="Sample text" />,
  },
  {
    key: "input4",
    label: "Table header",
    width: 130,
    render: () => <Input size="small" disabled value="Sample text" />,
  },
  // 1 checkbox
  {
    key: "checkbox",
    label: "Table header",
    width: 80,
    onCell: () => ({ className: "cell-checkbox" }),
    render: () => <Checkbox />,
  },
];

const SPLIT_TOTAL_WIDTH = SPLIT_COLS_BASE.reduce((s, c) => s + c.width, 0);

// ── Shared context ─────────────────────────────────────────────────────────
// Both the left frozen panel and the right scrollable panel are separate React
// instances of ShowcaseTableForSplit. A context shares column order and widths
// so a drag in either panel updates both. Cross-panel drag uses dataTransfer.

type SplitTableCtx = {
  order: string[];
  setOrder: React.Dispatch<React.SetStateAction<string[]>>;
  widths: Record<string, number>;
  setWidths: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  // Shared row selection — both panels read/write the same keys
  selectedKeys: React.Key[];
  setSelectedKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
};

const SplitTableContext = React.createContext<SplitTableCtx | null>(null);

function useSplitTableState(): SplitTableCtx {
  const [order, setOrder] = React.useState<string[]>(() =>
    SPLIT_COLS_BASE.map((c) => c.key),
  );
  const [widths, setWidths] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(SPLIT_COLS_BASE.map((c) => [c.key, c.width])),
  );
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
  return { order, setOrder, widths, setWidths, selectedKeys, setSelectedKeys };
}

// ── Table component ────────────────────────────────────────────────────────

function ShowcaseTableForSplit({
  dataSource,
  loading,
}: {
  dataSource: SplitRow[];
  loading?: boolean;
}) {
  const { order, setOrder, widths, setWidths, selectedKeys, setSelectedKeys } =
    React.useContext(SplitTableContext)!;
  const dragKey = React.useRef<string | null>(null);

  const startResize = (key: string, startX: number) => {
    const startW = widths[key];
    const onMove = (e: MouseEvent) =>
      setWidths((prev) => ({
        ...prev,
        [key]: Math.max(60, startW + e.clientX - startX),
      }));
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const columns = order.map((key) => {
    const col = SPLIT_COLS_BASE.find((c) => c.key === key)!;
    const w = widths[key];
    return {
      ...col,
      title: col.label,
      width: w,
      onHeaderCell: () => ({
        colKey: key,
        style: { width: w },
        onResizeStart: (x: number) => startResize(key, x),
        onDragStart: (e: React.DragEvent) => {
          dragKey.current = key;
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("splitColKey", key);
        },
        onDragOver: (e: React.DragEvent) => e.preventDefault(),
        onDrop: (e: React.DragEvent) => {
          // Same-panel: dragKey.current is set. Cross-panel: read from dataTransfer.
          const src = dragKey.current ?? e.dataTransfer.getData("splitColKey");
          dragKey.current = null;
          if (!src || src === key) return;
          setOrder((prev) => {
            const next = [...prev];
            const from = next.indexOf(src);
            const to = next.indexOf(key);
            if (from === -1 || to === -1) return prev;
            next.splice(from, 1);
            next.splice(to, 0, src);
            return next;
          });
        },
      }),
    };
  });

  return (
    <Table
      bordered
      size="small"
      loading={loading}
      components={{ header: { cell: TableHeaderCell } }}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: SPLIT_TOTAL_WIDTH, y: 360 }}
      pagination={false}
      rowClassName={(r) =>
        selectedKeys.includes((r as SplitRow).key) ? "row-selected" : ""
      }
      onRow={(r) => ({
        onClick: () =>
          setSelectedKeys((prev) => {
            const k = (r as SplitRow).key;
            return prev.includes(k)
              ? prev.filter((x) => x !== k)
              : [...prev, k];
          }),
        style: { cursor: "pointer" },
      })}
    />
  );
}

// ── Public components ──────────────────────────────────────────────────────

export function GlobalTable() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [splitWidth, setSplitWidth] = React.useState(0);
  const shared = useSplitTableState();
  const pagedData = splitTableData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <SplitTableContext.Provider value={shared}>
      <div>
        <div className="global-table-outer" style={{ border: "1px solid var(--gray-4)" }}>
          <SplitTable
            data={pagedData}
            dataTable={<ShowcaseTableForSplit dataSource={pagedData} />}
            splitWidth={splitWidth}
            onSplitWidthChange={setSplitWidth}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
        >
          <Pagination
            size="small"
            current={page}
            pageSize={pageSize}
            total={splitTableData.length}
            showSizeChanger
            showQuickJumper
            onChange={(p, ps) => {
              setPage(p);
              setPageSize(ps);
            }}
          />
        </div>
      </div>
    </SplitTableContext.Provider>
  );
}

/** Section label + divider + ExampleBlock — one variant per block. */
function Variant({
  label,
  preview,
  code,
}: {
  label: string;
  preview: React.ReactNode;
  code: string;
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <Divider style={{ margin: "8px 0 16px" }} />
      <ExampleBlock preview={preview} code={code} />
    </div>
  );
}

/** Standard project pattern: SplitTable + bottom pagination. */
function SplitTableDemo({
  data,
  loading,
  height = 400,
}: {
  data: SplitRow[];
  loading?: boolean;
  height?: number;
}) {
  const [splitWidth, setSplitWidth] = React.useState(0);
  const shared = useSplitTableState();
  return (
    <SplitTableContext.Provider value={shared}>
      <div style={{ height, border: "1px solid var(--gray-4)" }}>
        <SplitTable
          data={data}
          dataTable={
            <ShowcaseTableForSplit dataSource={data} loading={loading} />
          }
          splitWidth={splitWidth}
          onSplitWidthChange={setSplitWidth}
        />
      </div>
    </SplitTableContext.Provider>
  );
}

const SPLIT_USAGE_CODE = `import React from "react";
import { Pagination } from "antd";
import SplitTable from "@/components/SplitTable";
import YourTable from "./YourTable";

// Every table in this project is a SplitTable.
// Drag the handle at the bottom-left of the table to freeze columns.
// Both panels sync vertical scroll automatically.
export function TableDefault({ data }: { data: Row[] }) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const paged = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div style={{ height: 400 }}>
        <SplitTable
          data={paged}
          dataTable={<YourTable data={paged} />}
        />
      </div>
      <Pagination
        size="small"
        current={page}
        pageSize={pageSize}
        total={data.length}
        showSizeChanger
        showQuickJumper
        onChange={(p, ps) => { setPage(p); setPageSize(ps); }}
      />
    </>
  );
}`;

export function TableSection() {
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [splitPage, setSplitPage] = React.useState(1);
  const [splitPageSize, setSplitPageSize] = React.useState(10);
  const splitPagedData = splitTableData.slice(
    (splitPage - 1) * splitPageSize,
    splitPage * splitPageSize,
  );

  return (
    <Flex vertical gap={32}>
      {/* Usage */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{SPLIT_USAGE_CODE}</CodeBlock>
      </div>

      {/* Default — the standard SplitTable + pagination */}
      <Variant
        label="Default"
        preview={
          <>
            <SplitTableDemo data={splitPagedData} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              <Pagination
                size="small"
                current={splitPage}
                pageSize={splitPageSize}
                total={splitTableData.length}
                showSizeChanger
                showQuickJumper
                onChange={(page, pageSize) => {
                  setSplitPage(page);
                  setSplitPageSize(pageSize);
                }}
              />
            </div>
          </>
        }
        code={SPLIT_USAGE_CODE}
      />

      {/* Loading State */}
      <Variant
        label="Loading State"
        preview={
          <>
            <Flex gap={8} style={{ marginBottom: 12 }}>
              <Button onClick={() => setLoading((v) => !v)}>
                Toggle loading
              </Button>
            </Flex>
            <SplitTableDemo
              data={splitTableData.slice(0, 5)}
              loading={loading}
            />
          </>
        }
        code={`import SplitTable from "@/components/SplitTable";

export function LoadingTable({ isLoading, data }: { isLoading: boolean; data: Row[] }) {
  return (
    <div style={{ height: 400 }}>
      <SplitTable
        data={data}
        dataTable={<YourTable data={data} loading={isLoading} />}
      />
    </div>
  );
}`}
      />

      {/* Empty State */}
      <Variant
        label="Empty State"
        preview={
          <>
            <Flex gap={8} style={{ marginBottom: 12 }}>
              <Button onClick={() => setEmpty((v) => !v)}>Toggle empty</Button>
            </Flex>
            <SplitTableDemo data={empty ? [] : splitTableData.slice(0, 5)} />
          </>
        }
        code={`import SplitTable from "@/components/SplitTable";

// Empty state renders automatically when data is [].
export function EmptyTable() {
  return (
    <div style={{ height: 400 }}>
      <SplitTable data={[]} dataTable={<YourTable data={[]} />} />
    </div>
  );
}`}
      />
    </Flex>
  );
}
