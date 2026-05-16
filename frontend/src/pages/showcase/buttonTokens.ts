import { colors } from "../../theme";

const BUTTON_MIN_WIDTH = 110;

export type BtnTokens = {
  borderRadius: number;
  paddingInline: number;
  fontWeight: number;
  controlMinWidth: number;
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  primaryColor: string;
  defaultBg: string;
  defaultHoverBg: string;
  defaultActiveBg: string;
  defaultColor: string;
  defaultHoverColor: string;
  defaultActiveColor: string;
};

export const BUTTON_TOKEN_DEFAULTS: BtnTokens = {
  borderRadius: 0,
  paddingInline: 7,
  fontWeight: 500,
  controlMinWidth: BUTTON_MIN_WIDTH,
  colorPrimary: colors.brand[6],
  colorPrimaryHover: colors.brand[6],
  colorPrimaryActive: colors.brand[7],
  primaryColor: "#FFFFFF",
  defaultBg: colors.gray[3],
  defaultHoverBg: colors.gray[4],
  defaultActiveBg: colors.gray[5],
  defaultColor: colors.gray[10],
  defaultHoverColor: colors.gray[9],
  defaultActiveColor: colors.gray[9],
};

export const TOKEN_GROUPS: {
  label: string;
  tokens: { key: keyof BtnTokens; type: "color" | "number" }[];
}[] = [
  {
    label: "Sizing",
    tokens: [
      { key: "borderRadius", type: "number" },
      { key: "paddingInline", type: "number" },
      { key: "fontWeight", type: "number" },
      { key: "controlMinWidth", type: "number" },
    ],
  },
  {
    label: "Primary",
    tokens: [
      { key: "colorPrimary", type: "color" },
      { key: "colorPrimaryHover", type: "color" },
      { key: "colorPrimaryActive", type: "color" },
      { key: "primaryColor", type: "color" },
    ],
  },
  {
    label: "Default",
    tokens: [
      { key: "defaultBg", type: "color" },
      { key: "defaultHoverBg", type: "color" },
      { key: "defaultActiveBg", type: "color" },
      { key: "defaultColor", type: "color" },
      { key: "defaultHoverColor", type: "color" },
      { key: "defaultActiveColor", type: "color" },
    ],
  },
];
