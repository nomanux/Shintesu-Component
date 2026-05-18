import { colors } from "../../theme";
import type { TokenGroup } from "./TokenCustomizer";

export type FormTokens = {
  labelColor: string;
  labelRequiredMarkColor: string;
  labelFontSize: number;
  itemMarginBottom: number;
};

export const FORM_TOKEN_DEFAULTS: FormTokens = {
  labelColor: colors.gray[9],
  labelRequiredMarkColor: "#ff4d4f",
  labelFontSize: 14,
  itemMarginBottom: 24,
};

export const FORM_TOKEN_GROUPS: TokenGroup<FormTokens>[] = [
  {
    label: "Sizing",
    tokens: [
      { key: "labelFontSize", type: "number" },
      { key: "itemMarginBottom", type: "number" },
    ],
  },
  {
    label: "Label",
    tokens: [
      { key: "labelColor", type: "color" },
      { key: "labelRequiredMarkColor", type: "color" },
    ],
  },
];
