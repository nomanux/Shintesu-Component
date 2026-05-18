import React from "react";
import { colors } from "../theme";

/**
 * Drop-in replacement for <th> that adds:
 *   • Drag-to-reorder  — drag the header to swap column positions
 *   • Resize handle    — drag the right edge to change column width
 *
 * Used by AppTable and passed via components={{ header: { cell: TableHeaderCell } }}.
 */
export function TableHeaderCell({
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

      {/* Resize handle */}
      <span
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0,
          width: 8,
          cursor: "col-resize",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        draggable={false}
        onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setResizing(true);
          onResizeStart?.(e.clientX);
          const onUp = () => { setResizing(false); document.removeEventListener("mouseup", onUp); };
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
            backgroundColor: resizeHovered || resizing ? colors.brand[6] : colors.gray[4],
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
