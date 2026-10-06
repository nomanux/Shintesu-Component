import React from "react";

// Popups (Select options, date pickers…) render in a portal outside the table,
// so clicks inside them must not count as "outside".
const POPUP_SELECTOR =
  ".ant-select-dropdown, .ant-picker-dropdown, .ant-dropdown, .ant-popover, .ant-modal-root";

/** Calls onOutside when the user presses the mouse outside ref's element. */
export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  onOutside: () => void,
) {
  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || ref.current?.contains(target)) return;
      if (target.closest?.(POPUP_SELECTOR)) return;
      onOutside();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [ref, onOutside]);
}
