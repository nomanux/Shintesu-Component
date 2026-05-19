import { colors } from "../../theme";
import type { TokenGroup } from "./TokenCustomizer";

export type SelectTokens = {
  colorBorder: string;
  colorText: string;
  optionSelectedBg: string;
  optionActiveBg: string;
  optionSelectedColor: string;
};

export const SELECT_TOKEN_DEFAULTS: SelectTokens = {
  colorBorder: colors.gray[5],
  colorText: colors.gray[9],
  optionSelectedBg: colors.brand[1],
  optionActiveBg: colors.gray[3],
  optionSelectedColor: colors.brand[6],
};

export const SELECT_TOKEN_GROUPS: TokenGroup<SelectTokens>[] = [
  {
    label: "Border",
    tokens: [{ key: "colorBorder", type: "color" }],
  },
  {
    label: "Text",
    tokens: [
      { key: "colorText", type: "color" },
      { key: "optionSelectedColor", type: "color" },
    ],
  },
  {
    label: "Option Background",
    tokens: [
      { key: "optionSelectedBg", type: "color" },
      { key: "optionActiveBg", type: "color" },
    ],
  },
];
