import React from "react";
import { Typography } from "antd";
import { colors } from "../../theme";

const { Text } = Typography;

/** Small uppercase label used above every sub-section. */
export function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      type="secondary"
      style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}
    >
      {children}
    </Text>
  );
}

/** Tiny numbered label used inside a section to distinguish variants. */
export function VariantLabel({
  children,
  style,
}: {
  children: string;
  style?: React.CSSProperties;
}) {
  return (
    <Text
      style={{
        fontSize: 12,
        color: colors.gray[6],
        display: "block",
        ...style,
      }}
    >
      {children}
    </Text>
  );
}

export function GroupHeader({
  children,
  span,
}: {
  children: string;
  span: number;
}) {
  return (
    <th
      colSpan={span}
      style={{
        padding: "4px 12px 8px",
        color: colors.brand[6],
        fontWeight: 400,
        fontSize: 13,
        textAlign: "center",
        borderBottom: `1px solid ${colors.gray[4]}`,
      }}
    >
      {children}
    </th>
  );
}

export function RowLabel({ children }: { children: string }) {
  return (
    <td
      style={{
        paddingRight: 24,
        color: colors.brand[6],
        fontSize: 13,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

export function Cell({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "10px 12px",
        textAlign: "center",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

export const DownIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.486251 3.1995C0.724828 2.94502 1.12452 2.93214 1.37899 3.1707L5.99974 7.50266L10.6204 3.1707C10.875 2.93214 11.2746 2.94502 11.5133 3.1995C11.7517 3.45398 11.7389 3.85367 11.4845 4.09224L6.4317 8.8292C6.18876 9.05695 5.81071 9.05695 5.56777 8.8292L0.515052 4.09224C0.260572 3.85367 0.247687 3.45398 0.486251 3.1995Z"
      fill="#192A42"
    />
  </svg>
);
