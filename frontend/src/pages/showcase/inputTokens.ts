import { colors } from "../../theme";
import type { TokenGroup } from "./TokenCustomizer";

export type InputTokens = {
  borderRadius: number;
  colorBorder: string;
  hoverBorderColor: string;
  activeBorderColor: string;
  colorBgContainer: string;
  colorText: string;
  colorTextPlaceholder: string;
};

export const INPUT_TOKEN_DEFAULTS: InputTokens = {
  borderRadius: 0,
  colorBorder: colors.gray[5],
  hoverBorderColor: colors.brand[6],
  activeBorderColor: colors.brand[6],
  colorBgContainer: colors.gray[1],
  colorText: colors.gray[9],
  colorTextPlaceholder: colors.gray[5],
};

export const INPUT_TOKEN_GROUPS: TokenGroup<InputTokens>[] = [
  {
    label: "Sizing",
    tokens: [{ key: "borderRadius", type: "number" }],
  },
  {
    label: "Border",
    tokens: [
      { key: "colorBorder", type: "color" },
      { key: "hoverBorderColor", type: "color" },
      { key: "activeBorderColor", type: "color" },
    ],
  },
  {
    label: "Surface",
    tokens: [{ key: "colorBgContainer", type: "color" }],
  },
  {
    label: "Text",
    tokens: [
      { key: "colorText", type: "color" },
      { key: "colorTextPlaceholder", type: "color" },
    ],
  },
];
