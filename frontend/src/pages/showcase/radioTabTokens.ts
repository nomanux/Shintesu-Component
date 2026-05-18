import { colors } from "../../theme";
import type { TokenGroup } from "./TokenCustomizer";

export type RadioTabTokens = {
  buttonBg: string;
  buttonCheckedBg: string;
  buttonSolidCheckedColor: string;
  colorPrimary: string;
  colorPrimaryActive: string;
  colorBorder: string;
};

export const RADIOTAB_TOKEN_DEFAULTS: RadioTabTokens = {
  buttonBg: colors.gray[1],
  buttonCheckedBg: colors.brand[1],
  buttonSolidCheckedColor: colors.brand[6],
  colorPrimary: colors.brand[6],
  colorPrimaryActive: colors.brand[7],
  colorBorder: colors.gray[5],
};

export const RADIOTAB_TOKEN_GROUPS: TokenGroup<RadioTabTokens>[] = [
  {
    label: "Button Surface",
    tokens: [
      { key: "buttonBg", type: "color" },
      { key: "buttonCheckedBg", type: "color" },
      { key: "buttonSolidCheckedColor", type: "color" },
    ],
  },
  {
    label: "Brand",
    tokens: [
      { key: "colorPrimary", type: "color" },
      { key: "colorPrimaryActive", type: "color" },
      { key: "colorBorder", type: "color" },
    ],
  },
];
