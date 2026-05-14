import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./SplitTable.scss";

type SplitTableProps = {
  dataTable: React.ReactNode;
  data: unknown[];
  splitWidth?: number;
  onSplitWidthChange?: (w: number) => void;
};

const SplitTable = ({
  dataTable,
  data: _data,
  splitWidth: externalWidth,
  onSplitWidthChange,
}: SplitTableProps) => {
  const [localWidth, setLocalWidth] = useState(0);
  const splitWidth = externalWidth !== undefined ? externalWidth : localWidth;
  const setSplitWidth = (w: number) => {
    setLocalWidth(w);
    onSplitWidthChange?.(w);
  };
  const [dragging, setDragging] = useState(false);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isSyncingLeft = useRef(false);
  const isSyncingRight = useRef(false);


  const getScrollable = (root: HTMLElement | null): HTMLElement | null => {
    if (!root) return null;
    const isScrollable = (el: HTMLElement) => {
      const cs = window.getComputedStyle(el);
      return (
        (cs.overflowY === "auto" || cs.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight + 1
      );
    };
    if (isScrollable(root)) return root;
    const known = root.querySelector<HTMLElement>(
      ".clip-vscroll__scroller,[data-scrollable='true']",
    );
    if (known && isScrollable(known)) return known;
    const q: HTMLElement[] = Array.from(root.children) as HTMLElement[];
    while (q.length) {
      const el = q.shift()!;
      if (isScrollable(el)) return el;
      q.push(...(Array.from(el.children) as HTMLElement[]));
    }
    return null;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !tableWrapperRef.current) return;
    const rect = tableWrapperRef.current.getBoundingClientRect();
    let newWidth = e.clientX - rect.left;
    const maximumWidth = tableWrapperRef.current.offsetWidth - 20;
    newWidth = Math.max(0, Math.min(newWidth, maximumWidth));
    if (newWidth < maximumWidth) setSplitWidth(newWidth);
  };

  const handleMouseDown = () => {
    setDragging(true);
    document.body.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    document.body.style.userSelect = "";
    setDragging(false);
  };

  // Sync vertical scroll between left frozen panel and right scrollable panel.
  useEffect(() => {
    if (splitWidth <= 0) return;
    const attachScrollSync = () => {
      const leftScroller = getScrollable(leftRef.current);
      const rightScroller = getScrollable(rightRef.current);
      if (!leftScroller || !rightScroller) return;
      leftScroller.scrollTop = rightScroller.scrollTop;

      const handleLeftScroll = () => {
        if (isSyncingLeft.current) { isSyncingLeft.current = false; return; }
        isSyncingRight.current = true;
        if (rightScroller.scrollTop !== leftScroller.scrollTop)
          rightScroller.scrollTop = leftScroller.scrollTop;
      };

      const handleRightScroll = () => {
        if (isSyncingRight.current) { isSyncingRight.current = false; return; }
        isSyncingLeft.current = true;
        if (leftScroller.scrollTop !== rightScroller.scrollTop)
          leftScroller.scrollTop = rightScroller.scrollTop;
      };

      leftScroller.addEventListener("scroll", handleLeftScroll, { passive: true });
      rightScroller.addEventListener("scroll", handleRightScroll, { passive: true });
      return () => {
        leftScroller.removeEventListener("scroll", handleLeftScroll);
        rightScroller.removeEventListener("scroll", handleRightScroll);
      };
    };
    const raf = requestAnimationFrame(attachScrollSync);
    return () => cancelAnimationFrame(raf);
  }, [splitWidth, dataTable]);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  // Forward wheel events from the left panel to the right panel's scroll
  // container so the user can scroll from either side.
  useEffect(() => {
    const el = leftPanelRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const body = rightRef.current?.querySelector<HTMLElement>(".ant-table-body");
      if (body) body.scrollTop += e.deltaY;
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [splitWidth]);

  // Pin the table body height to the container so the horizontal scrollbar
  // always sits at the bottom regardless of how few rows are rendered.
  useLayoutEffect(() => {
    const container = tableWrapperRef.current;
    if (!container) return;

    const applyBodyHeight = () => {
      const containerH = container.clientHeight;
      if (!containerH) return;
      container
        .querySelectorAll<HTMLElement>(".ant-table-body, .ant-table-content")
        .forEach((body) => {
          const headerEl = body
            .closest<HTMLElement>(".ant-table-container")
            ?.querySelector<HTMLElement>(".ant-table-header");
          const headerH = headerEl?.offsetHeight ?? 0;
          const targetH = containerH - headerH;
          if (targetH > 0) {
            body.style.maxHeight = "none";
            body.style.height = `${targetH}px`;
          }
        });
    };

    applyBodyHeight();
    const ro = new ResizeObserver(applyBodyHeight);
    ro.observe(container);
    return () => ro.disconnect();
  }, [dataTable, splitWidth]);

  const isSplit = splitWidth > 0;

  return (
    <div ref={tableWrapperRef} className="split-table-container">

      {/* Right panel ─────────────────────────────────────────────────────────
          Same full table, positioned so its left edge starts at splitWidth.
          Both panels show from column 0 — right panel scrolls independently. */}
      <div
        ref={rightRef}
        style={{
          position: "absolute",
          top: 0,
          left: splitWidth,
          right: 0,
          bottom: 0,
        }}
      >
        {dataTable}
      </div>

      {/* Left frozen panel ───────────────────────────────────────────────────
          Same table rendered at full containerWidth, clipped to splitWidth.
          Vertical scroll is synced with the right panel. */}
      {isSplit && (
        <div
          ref={leftPanelRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: splitWidth,
            overflow: "hidden",
            zIndex: 2,
            boxShadow: "2px 0 4px rgba(0,0,0,0.08)",
          }}
        >
          <div ref={leftRef} style={{ height: "100%" }}>
            {dataTable}
          </div>
        </div>
      )}

      {/* Handle ──────────────────────────────────────────────────────────────
          Small square at bottom-left when collapsed;
          full-height divider on the split boundary when active. */}
      <div
        role="separator"
        tabIndex={0}
        aria-orientation="vertical"
        aria-label="Resize table columns"
        className="resize-handler"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleMouseDown();
            e.preventDefault();
          }
        }}
        style={{
          position: "absolute",
          top: isSplit ? 0 : "auto",
          bottom: 0,
          left: splitWidth,
          width: "6px",
          height: isSplit ? "100%" : "16px",
          cursor: "col-resize",
          background: "var(--gray-5)",
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default SplitTable;
