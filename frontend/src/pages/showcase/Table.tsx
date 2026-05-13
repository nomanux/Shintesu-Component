import React from "react";
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

const SPLIT_COLS = [
  {
    title: "No.",
    key: "no",
    width: 70,
    onCell: () => ({ className: "cell-text" }),
    render: (_: unknown, __: unknown, i: number) => `${i + 1}`,
  },
  {
    title: "Table header",
    key: "s1",
    width: 180,
    sorter: true,
    render: () => (
      <Select
        size="small"
        suffixIcon={<DownIcon />}
        style={{ width: "100%" }}
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
      />
    ),
  },
  {
    title: "Table header",
    key: "i1",
    width: 180,
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "Table header",
    key: "t1",
    width: 180,
    sorter: true,
    onCell: () => ({ className: "cell-text" }),
    render: () => <span>Table cell text</span>,
  },
  {
    title: "Table header",
    key: "t2",
    width: 180,
    sorter: true,
    onCell: () => ({ className: "cell-text" }),
    render: () => <span>Table cell text</span>,
  },
  {
    title: "Table header",
    key: "s2",
    width: 180,
    sorter: true,
    render: () => (
      <Select
        size="small"
        suffixIcon={<DownIcon />}
        style={{ width: "100%" }}
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      />
    ),
  },
  {
    title: "Table header",
    key: "i2",
    width: 180,
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "Table header",
    key: "t3",
    width: 180,
    sorter: true,
    onCell: () => ({ className: "cell-text" }),
    render: () => <span>Table cell text</span>,
  },
  {
    title: "Table header",
    key: "c1",
    width: 120,
    onCell: () => ({ className: "cell-checkbox" }),
    render: () => <Checkbox />,
  },
];

// Total column width: 70 + 180×7 + 120 = 1450px — wide enough to overflow and
// demonstrate the split handle on any common viewport.
const SPLIT_TOTAL_WIDTH = 1450;

function ShowcaseTableForSplit({
  dataSource,
  loading,
}: {
  dataSource: typeof tableData;
  loading?: boolean;
}) {
  const [order, setOrder] = React.useState(() => SPLIT_COLS.map((c) => c.key));
  const [widths, setWidths] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(SPLIT_COLS.map((c) => [c.key, c.width])),
  );
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
    const col = SPLIT_COLS.find((c) => c.key === key)!;
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
      loading={loading}
      components={{ header: { cell: TableHeaderCell } }}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: SPLIT_TOTAL_WIDTH, y: 360 }}
      pagination={false}
    />
  );
}

export function GlobalTable({ height = 400 }: { height?: number }) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const pagedData = tableData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div style={{ height, border: "1px solid var(--gray-4)" }}>
        <SplitTable
          data={pagedData}
          dataTable={<ShowcaseTableForSplit dataSource={pagedData} />}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <Pagination
          size="small"
          current={page}
          pageSize={pageSize}
          total={tableData.length}
          showSizeChanger
          showQuickJumper
          onChange={(p, ps) => {
            setPage(p);
            setPageSize(ps);
          }}
        />
      </div>
    </div>
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
  data: typeof tableData;
  loading?: boolean;
  height?: number;
}) {
  return (
    <div style={{ height, border: "1px solid var(--gray-4)" }}>
      <SplitTable
        data={data}
        dataTable={<ShowcaseTableForSplit dataSource={data} loading={loading} />}
      />
    </div>
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
  const splitPagedData = tableData.slice(
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
                total={tableData.length}
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
              data={tableData.slice(0, 5)}
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
              <Button onClick={() => setEmpty((v) => !v)}>
                Toggle empty
              </Button>
            </Flex>
            <SplitTableDemo data={empty ? [] : tableData.slice(0, 5)} />
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
