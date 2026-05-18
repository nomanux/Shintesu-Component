import { colors } from "../../theme";
import type { TokenGroup } from "./TokenCustomizer";

export type TableTokens = {
  colorBorderSecondary: string;
  colorBgContainer: string;
  headerBg: string;
  headerColor: string;
  colorText: string;
  rowHoverBg: string;
  rowSelectedBg: string;
};

export const TABLE_TOKEN_DEFAULTS: TableTokens = {
  colorBorderSecondary: colors.gray[5],
  colorBgContainer: colors.gray[2],
  headerBg: colors.gray[1],
  headerColor: colors.gray[9],
  colorText: colors.gray[9],
  rowHoverBg: colors.gray[1],
  rowSelectedBg: colors.brand[1],
};

export const TABLE_TOKEN_GROUPS: TokenGroup<TableTokens>[] = [
  {
    label: "Header",
    tokens: [
      { key: "headerBg", type: "color" },
      { key: "headerColor", type: "color" },
    ],
  },
  {
    label: "Row",
    tokens: [
      { key: "colorBgContainer", type: "color" },
      { key: "colorText", type: "color" },
      { key: "rowHoverBg", type: "color" },
      { key: "rowSelectedBg", type: "color" },
    ],
  },
  {
    label: "Border",
    tokens: [{ key: "colorBorderSecondary", type: "color" }],
  },
];
