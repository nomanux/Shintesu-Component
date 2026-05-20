import { colors } from "../../theme";
import type { TokenGroup } from "./TokenCustomizer";

export type DatePickerTokens = {
  colorBorder: string;
  colorPrimary: string;
  colorPrimaryHover: string;
  cellHoverBg: string;
  cellActiveWithRangeBg: string;
  cellRangeBorderColor: string;
};

export const DATEPICKER_TOKEN_DEFAULTS: DatePickerTokens = {
  colorBorder: colors.gray[5],
  colorPrimary: colors.brand[6],
  colorPrimaryHover: colors.brand[5],
  cellHoverBg: colors.brand[1],
  cellActiveWithRangeBg: colors.brand[1],
  cellRangeBorderColor: colors.brand[4],
};

export const DATEPICKER_TOKEN_GROUPS: TokenGroup<DatePickerTokens>[] = [
  {
    label: "Border",
    tokens: [{ key: "colorBorder", type: "color" }],
  },
  {
    label: "Brand",
    tokens: [
      { key: "colorPrimary", type: "color" },
      { key: "colorPrimaryHover", type: "color" },
    ],
  },
  {
    label: "Calendar Cell",
    tokens: [
      { key: "cellHoverBg", type: "color" },
      { key: "cellActiveWithRangeBg", type: "color" },
      { key: "cellRangeBorderColor", type: "color" },
    ],
  },
];
