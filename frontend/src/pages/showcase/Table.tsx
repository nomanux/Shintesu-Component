import React from "react";
import { Table, Input, Select, Checkbox, Divider, Flex, Button } from "antd";
import { colors } from "../../theme";
import { SectionLabel, DownIcon } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

const tableData = Array.from({ length: 50 }, (_, i) => ({ key: i + 1 }));

export function TableGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Click rows to toggle selection (selected rows highlight in brand-1)",
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
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
  const initial = React.useMemo(() => loadTableState(), []);
  const [order, setOrder] = React.useState<string[]>(initial.order);
  const [widths, setWidths] =
    React.useState<Record<string, number>>(initial.widths);

  React.useEffect(() => {
    try {
      localStorage.setItem(
        TABLE_STATE_KEY,
        JSON.stringify({ order, widths }),
      );
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
        selectedKeys.includes(record.key) ? "row-selected" : ""
      }
      onRow={(record) => ({
        onClick: () =>
          setSelectedKeys((prev) =>
            prev.includes(record.key)
              ? prev.filter((k) => k !== record.key)
              : [...prev, record.key],
          ),
        style: { cursor: "pointer" },
      })}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        placement: ["bottomCenter"],
      }}
    />
  );
}

export function TableSection() {
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);

  const simpleColumns = [
    { title: "ID", dataIndex: "key", key: "key" },
    {
      title: "Name",
      key: "name",
      render: (_: unknown, __: unknown, i: number) => `Row ${i + 1}`,
    },
  ];

  return (
    <Flex vertical gap={32}>
      <div>
        <SectionLabel>Default</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <ShowcaseTable />
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Table
  columns={columns}
  dataSource={data}
  components={{ header: { cell: TableHeaderCell } }}
  pagination={{ pageSize: 10, showSizeChanger: true }}
/>`}</CodeBlock>
        </div>
      </div>

      <div>
        <SectionLabel>Loading &amp; Empty States</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex gap={8} style={{ marginBottom: 12 }}>
          <Button onClick={() => setLoading((v) => !v)}>
            Toggle loading
          </Button>
          <Button onClick={() => setEmpty((v) => !v)}>Toggle empty</Button>
        </Flex>
        <Table
          bordered
          size="small"
          loading={loading}
          columns={simpleColumns}
          dataSource={empty ? [] : tableData.slice(0, 5)}
          pagination={false}
        />
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Table loading={isLoading} dataSource={items}>
  ...
</Table>

// Empty state shows automatically when dataSource is []
<Table dataSource={[]} />`}</CodeBlock>
        </div>
      </div>
    </Flex>
  );
}
