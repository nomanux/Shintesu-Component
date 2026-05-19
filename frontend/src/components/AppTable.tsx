/**
 * AppTable — the ONLY table component you need.
 *
 * Built-in by default (no extra wiring):
 *   • Drag column headers left/right to reorder
 *   • Drag column right-edge to resize (RAF-throttled, smooth)
 *   • SplitTable freeze-column handle at bottom-left
 *   • Row click to select/deselect
 *   • Optional pagination
 *
 * Usage:
 *   <AppTable columns={COLS} dataSource={rows} height={400} />
 */

import React from "react";
import { Pagination, Table } from "antd";
import type { ColumnType, TableProps } from "antd/es/table";
import SplitTable from "./SplitTable";
import { TableHeaderCell } from "./TableHeaderCell";

/* ── Types ─────────────────────────────────────────────────────────────────── */

export type AppColumn<T = unknown> = ColumnType<T> & {
  key: string;
  defaultWidth?: number;
};

export type AppTableProps<T extends Record<string, unknown>> = {
  columns: AppColumn<T>[];
  dataSource: T[];
  /** Container height (px). Default 400. */
  height?: number;
  /** Total record count for external pagination. Omit for no pagination. */
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  /** Extra vertical space (px) reserved for things above the table. Default 0. */
  reservedHeight?: number;
} & Omit<TableProps<T>, "columns" | "dataSource" | "pagination" | "scroll" | "components">;

/* ── AppTable ───────────────────────────────────────────────────────────────── */

function AppTableInner<T extends Record<string, unknown>>({
  columns: initialColumns,
  dataSource,
  height = 400,
  total,
  page,
  pageSize = 10,
  onPageChange,
  reservedHeight = 0,
  ...tableProps
}: AppTableProps<T>) {
  /* ── State ── */
  const [order, setOrder] = React.useState<string[]>(
    () => initialColumns.map((c) => c.key),
  );
  const [widths, setWidths] = React.useState<Record<string, number>>(
    () => Object.fromEntries(
      initialColumns.map((c) => [c.key, c.defaultWidth ?? c.width as number ?? 150]),
    ),
  );
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);
  const [splitWidth, setSplitWidth] = React.useState(0);
  const dragKey = React.useRef<string | null>(null);

  /* ── Resize (RAF-throttled) ── */
  const startResize = (key: string, startX: number) => {
    const startW = widths[key];
    let rafId: number | null = null;
    let pendingW = startW;
    const onMove = (e: MouseEvent) => {
      pendingW = Math.max(40, startW + e.clientX - startX);
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setWidths((prev) => ({ ...prev, [key]: pendingW }));
        rafId = null;
      });
    };
    const onUp = () => {
      if (rafId !== null) { cancelAnimationFrame(rafId); }
      setWidths((prev) => ({ ...prev, [key]: pendingW }));
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  /* ── Columns with drag/resize wired ── */
  const columns = order.map((key) => {
    const col = initialColumns.find((c) => c.key === key)!;
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
          e.dataTransfer.setData("appTableColKey", key);
        },
        onDragOver: (e: React.DragEvent) => e.preventDefault(),
        onDrop: (e: React.DragEvent) => {
          e.preventDefault();
          const src = dragKey.current ?? e.dataTransfer.getData("appTableColKey");
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
  const scrollY = height - reservedHeight - (total !== undefined ? 40 : 0) - 40;

  /* ── Inner Ant Table ── */
  const innerTable = (
    <Table<T>
      bordered
      size="small"
      components={{ header: { cell: TableHeaderCell } }}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: totalWidth, y: Math.max(scrollY, 100) }}
      pagination={false}
      rowClassName={(r) => {
        const k = (r as unknown as { key: React.Key }).key;
        return selectedKeys.includes(k) ? "row-selected" : "";
      }}
      onRow={(r) => ({
        onClick: () => {
          const k = (r as unknown as { key: React.Key }).key;
          setSelectedKeys((prev) => (prev[0] === k ? [] : [k]));
        },
        style: { cursor: "pointer" },
      })}
      {...(tableProps as TableProps<T>)}
    />
  );

  return (
    <div>
      <div style={{ height, border: "1px solid var(--gray-4)", overflow: "hidden" }}>
        <SplitTable
          data={dataSource}
          dataTable={innerTable}
          splitWidth={splitWidth}
          onSplitWidthChange={setSplitWidth}
        />
      </div>
      {total !== undefined && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <Pagination
            size="small"
            current={page}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            showQuickJumper
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

// Generic wrapper to preserve TypeScript generics across the export
export default function AppTable<T extends Record<string, unknown>>(
  props: AppTableProps<T>,
) {
  return <AppTableInner<T> {...props} />;
}
