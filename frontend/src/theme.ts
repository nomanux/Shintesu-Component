export const groupBorderColor = "#4DACA5"; // colors.brand[5] — used for group/container borders

export const specialInputColors = {
  rims: "#C8FFFF",
  rimsBorder: "#A3EAEA",
  cyberbridge: "#A8B4DC",
};

/** Canonical modal widths — reference these instead of hardcoding pixel values. */
export const modalWidth = {
  sm: 400,
  md: 520, // default
  lg: 720,
  xl: 900,
  xxl: 1160,
} as const;

export const colors = {
  brand: {
    1: "#E0F2F2",
    2: "#CCEBE9",
    3: "#99CDC8",
    4: "#76BCB6",
    5: "#4DACA5",
    6: "#009B94",
    7: "#05807B",
    8: "#0A6563",
    9: "#0D5452",
    10: "#08312F",
  },
  gray: {
    1: "#FFFFFF",
    2: "#F8FAFC",
    3: "#F1F5F9",
    4: "#E2E8F0",
    5: "#CBD5E1",
    6: "#94A3B8",
    7: "#64748B",
    8: "#334155",
    9: "#192A42",
    10: "#060F1C",
  },
  // Semantic / app-specific surfaces
  stGray: "#EDF3F7",
};

const BUTTON_MIN_WIDTH = 110;

const tokens = {
  // PRIMARY
  colorPrimary: colors.brand[6],
  colorPrimaryHover: colors.brand[6],
  colorPrimaryActive: colors.brand[7],

  // TEXT
  colorText: colors.gray[8],
  colorTextSecondary: colors.gray[7],
  colorTextTertiary: colors.gray[6],
  colorTextDisabled: colors.gray[6],

  // BACKGROUND
  colorBgContainer: colors.gray[1],
  colorBgLayout: colors.gray[2],
  colorBgElevated: colors.gray[1],

  // BORDER
  colorBorder: colors.gray[4],
  colorBorderSecondary: colors.gray[3],

  // CONTROL ITEM (Dropdown/Select option hover & selected backgrounds)
  controlItemBgHover: colors.brand[1],
  controlItemBgActive: colors.brand[1],
  controlItemBgActiveHover: colors.brand[1],

  // TYPOGRAPHY
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: 14,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  lineHeightSM: 18,

  // SHAPE
  borderRadius: 0,

  // HEIGHT
  controlHeight: 32,
  controlHeightSM: 24,
  controlHeightLG: 40,
};

export const shintetsuTheme = {
  token: {
    ...tokens,
  },
  components: {
    Button: {
      borderRadius: 0,
      paddingInline: 7,
      fontWeight: 500,

      // PRIMARY
      colorPrimary: colors.brand[6],
      colorPrimaryHover: colors.brand[6], // keeps border teal on hover; bg overridden in CSS
      colorPrimaryActive: colors.brand[7],
      primaryColor: "#FFFFFF",

      // DISABLED (default button — primary disabled bg is overridden in CSS)
      colorBgContainerDisabled: colors.gray[3],
      colorTextDisabled: colors.gray[6],

      // DEFAULT
      defaultBg: colors.gray[3],
      defaultHoverBg: colors.gray[4],
      defaultActiveBg: colors.gray[5],
      defaultColor: colors.gray[9],
      defaultHoverColor: colors.gray[9],
      defaultActiveColor: colors.gray[9],
      defaultBorderColor: "transparent",
      defaultHoverBorderColor: "transparent",
      defaultActiveBorderColor: "transparent",

      // SHADOW
      primaryShadow: "none",
      defaultShadow: "none",

      controlMinWidth: BUTTON_MIN_WIDTH,
    },

    Radio: {
      buttonBg: colors.gray[1],
      buttonCheckedBg: colors.brand[1],
      buttonSolidCheckedBg: colors.brand[1],
      buttonSolidCheckedHoverBg: colors.brand[1],
      buttonSolidCheckedColor: colors.brand[6],
      colorPrimary: colors.brand[6],
      colorBorder: colors.gray[5],
    },

    Pagination: {
      itemActiveBg: colors.brand[6],
      itemActiveColor: colors.gray[1],
      itemActiveColorHover: colors.gray[1],
      itemSize: 24,
    },

    Select: {
      colorBorder: colors.gray[5],
      optionSelectedBg: colors.brand[1],
      optionActiveBg: colors.brand[1],
      optionSelectedColor: colors.gray[9],
    },

    Table: {
      colorBorderSecondary: colors.gray[5],
      colorBgContainer: colors.gray[2],
      rowHoverBg: colors.gray[1],
      rowSelectedBg: colors.brand[1],
      rowSelectedHoverBg: colors.brand[1],
      headerBg: colors.gray[1],
      headerColor: colors.gray[9],
      colorText: colors.gray[9],
      columnSortBg: colors.brand[1],
      headerSortActiveBg: colors.brand[1],
      headerSortHoverBg: colors.brand[1],
    },

    Form: {
      labelColor: colors.gray[9],
    },

    Menu: {
      itemSelectedBg: colors.brand[1],
      itemSelectedColor: colors.brand[6],
      itemHoverBg: colors.brand[1],
      itemHoverColor: colors.brand[6],
    },

    Input: {
      borderRadius: 0,
      colorBorder: colors.gray[5],
      colorBgContainer: colors.gray[1],
      controlHeight: 32,
      controlHeightSM: 24,
      hoverBorderColor: colors.brand[6],
      activeBorderColor: colors.brand[6],
      activeShadow: "0 0 0 2px rgba(0, 155, 148, 0.10)",
      colorIcon: colors.brand[6],
      colorText: colors.gray[9],
      colorTextPlaceholder: colors.gray[5],
      colorTextDisabled: colors.gray[9],
      colorBgContainerDisabled: colors.gray[3],
      colorBorderDisabled: colors.gray[5],
    },
  },
};
