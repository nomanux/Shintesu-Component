import React from "react";
import { colors, specialInputColors, shintetsuTheme } from "../theme";

const teal = "#009B94";
const inputTextColor =
  (shintetsuTheme.components.Input.colorText as string | undefined) ??
  colors.gray[9];

const inputBase: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: 32,
  padding: "0 11px",
  fontSize: 14,
  boxSizing: "border-box",
  fontFamily: "inherit",
  outline: "none",
  border: "1px solid #CBD5E1",
  background: "#ffffff",
  color: inputTextColor,
};

type StateRow = {
  label: string;
  inputStyle: React.CSSProperties;
  cellBg?: string;
  value?: string;
};

type Group = {
  label: string;
  rows: StateRow[];
};

const groups: Group[] = [
  {
    label: "Default",
    rows: [
      { label: "Default", inputStyle: { ...inputBase } },
      {
        label: "Hover",
        inputStyle: { ...inputBase, borderColor: teal, borderWidth: 1.5 },
      },
      {
        label: "Focused",
        inputStyle: {
          ...inputBase,
          borderColor: teal,
          borderWidth: 1.5,
          boxShadow: "0 0 0 2px rgba(0,155,148,0.12)",
        },
      },
      { label: "Filled", inputStyle: { ...inputBase }, value: "Input" },
      {
        label: "Disabled",
        inputStyle: {
          ...inputBase,
          background: "#F1F5F9",
          color: "#94A3B8",
          borderColor: "#E2E8F0",
        },
        value: "Input",
      },
    ],
  },

  {
    label: "Special Input\nCyberbridge",
    rows: [
      {
        label: "Default",
        inputStyle: {
          ...inputBase,
          border: "none",
          background: specialInputColors.cyberbridge,
        },
      },
      {
        label: "Hover",
        inputStyle: {
          ...inputBase,
          borderColor: "#7080C0",
          borderWidth: 1.5,
          background: specialInputColors.cyberbridge,
        },
      },
      {
        label: "Filled",
        inputStyle: { ...inputBase },
        cellBg: specialInputColors.cyberbridge,
        value: "Input",
      },
    ],
  },
];

// Pre-compute flat row list with global indices for border logic
type FlatRow = {
  group: Group;
  row: StateRow;
  groupRowIndex: number;
  globalIndex: number;
};

const flatRows: FlatRow[] = [];
{
  let idx = 0;
  for (const g of groups) {
    g.rows.forEach((row, i) => {
      flatRows.push({ group: g, row, groupRowIndex: i, globalIndex: idx++ });
    });
  }
}
const totalRows = flatRows.length;

const dashedBorder = `1.5px dashed ${teal}`;

function inputCellStyle(
  globalIndex: number,
  cellBg?: string,
): React.CSSProperties {
  return {
    borderLeft: dashedBorder,
    borderRight: dashedBorder,
    ...(globalIndex === 0 ? { borderTop: dashedBorder } : {}),
    ...(globalIndex === totalRows - 1 ? { borderBottom: dashedBorder } : {}),
    padding: "8px 16px",
    ...(cellBg ? { background: cellBg } : {}),
  };
}

function GroupBracket({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
        height: "100%",
      }}
    >
      <span
        style={{
          writingMode: "vertical-lr",
          transform: "rotate(180deg)",
          color: teal,
          fontSize: 12,
          marginRight: 4,
          textAlign: "center",
          whiteSpace: "pre",
          alignSelf: "center",
        }}
      >
        {label}
      </span>
      <div
        style={{
          width: 10,
          alignSelf: "stretch",
          borderTop: `2px solid ${teal}`,
          borderLeft: `2px solid ${teal}`,
          borderBottom: `2px solid ${teal}`,
        }}
      />
    </div>
  );
}

export default function InputMatrix() {
  return (
    <div style={{ background: "#F8FAFC", padding: "40px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: 0,
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <colgroup>
            <col style={{ width: 180 }} />
            <col style={{ width: 90 }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th />
              <th />
              <th
                style={{
                  textAlign: "center",
                  color: teal,
                  fontWeight: 400,
                  fontSize: 13,
                  paddingBottom: 8,
                }}
              >
                Default
              </th>
            </tr>
          </thead>
          <tbody>
            {flatRows.map(({ group, row, groupRowIndex, globalIndex }) => (
              <tr key={globalIndex}>
                {groupRowIndex === 0 && (
                  <td
                    rowSpan={group.rows.length}
                    style={{ verticalAlign: "middle", paddingRight: 4 }}
                  >
                    <GroupBracket label={group.label} />
                  </td>
                )}
                <td
                  style={{
                    color: teal,
                    fontSize: 13,
                    paddingRight: 12,
                    paddingTop: 10,
                    paddingBottom: 10,
                    verticalAlign: "middle",
                    textAlign: "right",
                  }}
                >
                  {row.label}
                </td>
                <td style={inputCellStyle(globalIndex, row.cellBg)}>
                  <input
                    style={row.inputStyle}
                    defaultValue={row.value ?? ""}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
