import React, { useEffect, useRef, useState } from "react";

type SplitTableProps = {
  dataTable: React.ReactNode;
  data: unknown[];
};

const SplitTable = ({ dataTable, data }: SplitTableProps) => {
  const [splitWidth, setSplitWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const isSyncingLeft = useRef(false);
  const isSyncingRight = useRef(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

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

  // Finds the element that actually scrolls horizontally — handles Ant Design's
  // internal .ant-table-body which owns the scroll container when scroll.x is set.
  const getHScrollable = (root: HTMLElement | null): HTMLElement | null => {
    if (!root) return null;
    const inner = root.querySelector<HTMLElement>(".ant-table-body");
    if (inner) return inner;
    return root;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !tableWrapperRef.current) return;
    const rect = tableWrapperRef.current.getBoundingClientRect();
    let newWidth = e.clientX - rect.left;
    const maximumWidth = tableWrapperRef.current.offsetWidth - 20;
    newWidth = Math.max(0, Math.min(newWidth, maximumWidth));
    if (newWidth < maximumWidth) setSplitWidth(newWidth);
    if (rightRef.current) {
      const scrollTarget = getHScrollable(rightRef.current);
      if (scrollTarget) scrollTarget.scrollLeft = newWidth;
    }
  };

  const handleMouseDown = () => {
    setDragging(true);
    document.body.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    document.body.style.userSelect = "";
    setDragging(false);
  };

  useEffect(() => {
    if (splitWidth <= 0) return;
    const attachScrollSync = () => {
      const leftScroller = getScrollable(leftRef.current);
      const rightScroller = getScrollable(rightRef.current);
      if (!leftScroller || !rightScroller) return;
      leftScroller.scrollTop = rightScroller.scrollTop;

      const handleLeftScroll = () => {
        if (isSyncingLeft.current) {
          isSyncingLeft.current = false;
          return;
        }
        isSyncingRight.current = true;
        if (rightScroller.scrollTop !== leftScroller.scrollTop)
          rightScroller.scrollTop = leftScroller.scrollTop;
      };

      const handleRightScroll = () => {
        if (isSyncingRight.current) {
          isSyncingRight.current = false;
          return;
        }
        isSyncingLeft.current = true;
        if (leftScroller.scrollTop !== rightScroller.scrollTop)
          leftScroller.scrollTop = rightScroller.scrollTop;
      };

      leftScroller.addEventListener("scroll", handleLeftScroll, {
        passive: true,
      });
      rightScroller.addEventListener("scroll", handleRightScroll, {
        passive: true,
      });
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

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    setIsOverflowing(el.scrollHeight > el.clientHeight);
  }, [splitWidth, data]);

  return (
    <div ref={tableWrapperRef} className="split-table-container">
      {splitWidth > 0 && (
        <div
          ref={leftRef}
          className="clip-vscroll"
          style={{ width: splitWidth, maxWidth: splitWidth }}
        >
          <div
            ref={divRef}
            className={`clip-vscroll__scroller${isOverflowing ? " clip-vscroll__dataScroller" : ""}`}
          >
            {dataTable}
          </div>
        </div>
      )}

      <div
        ref={rightRef}
        className="split-table-right"
        data-scroll-container-id="table-scroll-wrapper"
        style={{
          flex: 1,
          overflowX: "scroll",
          overflowY: "auto",
          minWidth: 0,
        }}
      >
        {dataTable}
      </div>

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
          width: "6px",
          cursor: "col-resize",
          background: "var(--gray-5)",
          position: "absolute",
          top: splitWidth > 0 ? 0 : "auto",
          bottom: 0,
          left: splitWidth,
          height: splitWidth > 0 ? "100%" : "16px",
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default SplitTable;
