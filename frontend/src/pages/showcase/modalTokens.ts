import { colors } from "../../theme";
import type { TokenGroup } from "./TokenCustomizer";

export type ModalTokens = {
  contentBg: string;
  headerBg: string;
  titleColor: string;
  titleFontSize: number;
};

export const MODAL_TOKEN_DEFAULTS: ModalTokens = {
  contentBg: colors.gray[1],
  headerBg: colors.gray[1],
  titleColor: colors.gray[9],
  titleFontSize: 16,
};

export const MODAL_TOKEN_GROUPS: TokenGroup<ModalTokens>[] = [
  {
    label: "Surface",
    tokens: [
      { key: "contentBg", type: "color" },
      { key: "headerBg", type: "color" },
    ],
  },
  {
    label: "Title",
    tokens: [
      { key: "titleColor", type: "color" },
      { key: "titleFontSize", type: "number" },
    ],
  },
];
