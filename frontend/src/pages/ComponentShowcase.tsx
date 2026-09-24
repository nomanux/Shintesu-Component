/**
 * ComponentShowcase
 *
 * Developer reference page for the Shinetsu design system.
 * Each section lives in its own file under ./showcase/.
 */

import React from "react";
import { Typography, Divider, ConfigProvider } from "antd";
import {
  BookOutlined,
  DownloadOutlined,
  BgColorsOutlined,
  CheckSquareOutlined,
  LayoutOutlined,
  FilterOutlined,
  EditOutlined,
  CaretDownOutlined,
  CalendarOutlined,
  FormOutlined,
  SwitcherOutlined,
  TableOutlined,
  MessageOutlined,
  ColumnWidthOutlined,
  SunOutlined,
  MoonFilled,
  GithubOutlined,
  BranchesOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./ComponentShowcase.scss";
import { LangContext } from "../contexts/lang";

import FoundationsSection, { FoundationsGuidance } from "./showcase/Foundations";
import FrameSection, { FrameGuidance } from "./showcase/Frame";
import ButtonsSection, { ButtonsGuidance, ButtonTokenCustomizer } from "./showcase/Buttons";
import { type BtnTokens, BUTTON_TOKEN_DEFAULTS } from "./showcase/buttonTokens";
import InputsSection, { InputsGuidance } from "./showcase/Inputs";
import FormSection, { FormGuidance } from "./showcase/Form";
import { TableSection, TableGuidance } from "./showcase/Table";
import ModalSection, { ModalGuidance } from "./showcase/Modal";
import RadioTabSection, { RadioTabGuidance } from "./showcase/RadioTab";
import ScrollSection, { ScrollGuidance } from "./showcase/Scroll";
import SelectSection, { SelectGuidance } from "./showcase/Select";
import DatePickerSection, { DatePickerGuidance } from "./showcase/DatePicker";
import IntroductionSection from "./showcase/Introduction";
import InstallationSection from "./showcase/Installation";
import GuidelinesSection from "./showcase/Guidelines";

import { TokenCustomizer } from "./showcase/TokenCustomizer";
import { type InputTokens, INPUT_TOKEN_DEFAULTS, INPUT_TOKEN_GROUPS } from "./showcase/inputTokens";
import { type SelectTokens, SELECT_TOKEN_DEFAULTS, SELECT_TOKEN_GROUPS } from "./showcase/selectTokens";
import { type DatePickerTokens, DATEPICKER_TOKEN_DEFAULTS, DATEPICKER_TOKEN_GROUPS } from "./showcase/datePickerTokens";
import { type FormTokens, FORM_TOKEN_DEFAULTS, FORM_TOKEN_GROUPS } from "./showcase/formTokens";
import { type RadioTabTokens, RADIOTAB_TOKEN_DEFAULTS, RADIOTAB_TOKEN_GROUPS } from "./showcase/radioTabTokens";
import { type TableTokens, TABLE_TOKEN_DEFAULTS, TABLE_TOKEN_GROUPS } from "./showcase/tableTokens";
import { type ModalTokens, MODAL_TOKEN_DEFAULTS, MODAL_TOKEN_GROUPS } from "./showcase/modalTokens";

const { Title } = Typography;

/* ── Nav icons ────────────────────────────────────────────────────────────── */

const ICONS: Record<string, React.ReactNode> = {
  introduction: <BookOutlined />,
  installation: <DownloadOutlined />,
  foundations: <BgColorsOutlined />,
  guidelines: <CheckSquareOutlined />,
  frame: <LayoutOutlined />,
  buttons: <FilterOutlined />,
  inputs: <EditOutlined />,
  select: <CaretDownOutlined />,
  datepicker: <CalendarOutlined />,
  form: <FormOutlined />,
  "radio-tab": <SwitcherOutlined />,
  table: <TableOutlined />,
  modal: <MessageOutlined />,
  scroll: <ColumnWidthOutlined />,
};

/* ── Japanese labels ─────────────────────────────────────────────────────── */

const LABELS_JA: Record<string, string> = {
  Introduction: "はじめに",
  Installation: "インストール",
  Foundations: "基盤",
  Guidelines: "ガイドライン",
  Frame: "フレーム",
  Buttons: "ボタン",
  Inputs: "入力",
  Select: "選択",
  "Date Picker": "日付選択",
  Form: "フォーム",
  "Radio Button (Tab)": "ラジオボタン",
  Table: "テーブル",
  Modal: "モーダル",
  Scroll: "スクロール",
  "GETTING STARTED": "はじめる",
  "DESIGN SYSTEM": "デザインシステム",
  TEMPLATES: "テンプレート",
  COMPONENTS: "コンポーネント",
};

/* ── Sections ─────────────────────────────────────────────────────────────── */

const sections = [
  { key: "introduction", label: "Introduction", group: "GETTING STARTED" },
  { key: "installation", label: "Installation", group: "GETTING STARTED" },
  { key: "foundations", label: "Foundations", group: "DESIGN SYSTEM" },
  { key: "guidelines", label: "Guidelines", group: "DESIGN SYSTEM" },
  { key: "frame", label: "Frame", group: "TEMPLATES" },
  { key: "buttons", label: "Buttons", group: "COMPONENTS" },
  { key: "inputs", label: "Inputs", group: "COMPONENTS" },
  { key: "select", label: "Select", group: "COMPONENTS" },
  { key: "datepicker", label: "Date Picker", group: "COMPONENTS" },
  { key: "form", label: "Form", group: "COMPONENTS" },
  { key: "radio-tab", label: "Radio Button (Tab)", group: "COMPONENTS" },
  { key: "table", label: "Table", group: "COMPONENTS" },
  { key: "modal", label: "Modal", group: "COMPONENTS" },
  { key: "scroll", label: "Scroll", group: "COMPONENTS" },
] as const;

type SectionKey = (typeof sections)[number]["key"];
type Lang = "en" | "ja";

/* ── Content map ──────────────────────────────────────────────────────────── */

const contentMap: Record<SectionKey, { component: React.ReactNode; guidance: React.ReactNode }> = {
  introduction: { component: <IntroductionSection />, guidance: null },
  installation: { component: <InstallationSection />, guidance: null },
  foundations: { component: <FoundationsSection />, guidance: <FoundationsGuidance /> },
  guidelines: { component: <GuidelinesSection />, guidance: null },
  frame: { component: <FrameSection />, guidance: <FrameGuidance /> },
  buttons: { component: <ButtonsSection />, guidance: <ButtonsGuidance /> },
  inputs: { component: <InputsSection />, guidance: <InputsGuidance /> },
  select: { component: <SelectSection />, guidance: <SelectGuidance /> },
  datepicker: { component: <DatePickerSection />, guidance: <DatePickerGuidance /> },
  form: { component: <FormSection />, guidance: <FormGuidance /> },
  "radio-tab": { component: <RadioTabSection />, guidance: <RadioTabGuidance /> },
  table: { component: <TableSection />, guidance: <TableGuidance /> },
  modal: { component: <ModalSection />, guidance: <ModalGuidance /> },
  scroll: { component: <ScrollSection />, guidance: <ScrollGuidance /> },
};

/* ── Component ────────────────────────────────────────────────────────────── */

type Props = {
  initialSection?: string;
  onHome?: () => void;
  onSectionChange?: (section: string) => void;
  onOpenDemo?: () => void;
  dark?: boolean;
  onToggleDark?: () => void;
};

export default function ComponentShowcase({
  initialSection = "introduction",
  onHome,
  onSectionChange,
  onOpenDemo,
  dark = false,
  onToggleDark,
}: Props) {
  const [active, setActive] = React.useState<SectionKey>(initialSection as SectionKey);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [lang, setLang] = React.useState<Lang>("en");
  const contentBodyRef = React.useRef<HTMLDivElement>(null);

  // ── Per-component token states ──────────────────────────────────────────
  const [buttonTokens, setButtonTokens] = React.useState<BtnTokens>({ ...BUTTON_TOKEN_DEFAULTS });
  const [inputTokens, setInputTokens] = React.useState<InputTokens>({ ...INPUT_TOKEN_DEFAULTS });
  const [selectTokens, setSelectTokens] = React.useState<SelectTokens>({ ...SELECT_TOKEN_DEFAULTS });
  const [datePickerTokens, setDatePickerTokens] = React.useState<DatePickerTokens>({ ...DATEPICKER_TOKEN_DEFAULTS });
  const [formTokens, setFormTokens] = React.useState<FormTokens>({ ...FORM_TOKEN_DEFAULTS });
  const [radioTabTokens, setRadioTabTokens] = React.useState<RadioTabTokens>({ ...RADIOTAB_TOKEN_DEFAULTS });
  const [tableTokens, setTableTokens] = React.useState<TableTokens>({ ...TABLE_TOKEN_DEFAULTS });
  const [modalTokens, setModalTokens] = React.useState<ModalTokens>({ ...MODAL_TOKEN_DEFAULTS });

  React.useEffect(() => {
    const el = document.documentElement;
    el.style.setProperty("--kit-opt-sel-color", selectTokens.optionSelectedColor);
    el.style.setProperty("--kit-opt-sel-bg",    selectTokens.optionSelectedBg);
    el.style.setProperty("--kit-opt-active-bg", selectTokens.optionActiveBg);
    return () => {
      el.style.removeProperty("--kit-opt-sel-color");
      el.style.removeProperty("--kit-opt-sel-bg");
      el.style.removeProperty("--kit-opt-active-bg");
    };
  }, [selectTokens.optionSelectedColor, selectTokens.optionSelectedBg, selectTokens.optionActiveBg]);

  React.useEffect(() => {
    const el = document.documentElement;
    el.style.setProperty("--kit-btn-ph-bg", buttonTokens.colorPrimaryHover);
    return () => { el.style.removeProperty("--kit-btn-ph-bg"); };
  }, [buttonTokens.colorPrimaryHover]);

  const t = (text: string) => (lang === "ja" ? (LABELS_JA[text] ?? text) : text);

  const groups = sections.reduce<Record<string, (typeof sections)[number][]>>((acc, s) => {
    (acc[s.group] ||= []).push(s);
    return acc;
  }, {});

  const handleNavClick = (key: SectionKey) => {
    setActive(key);
    setDrawerOpen(false);
    onSectionChange?.(key);
  };

  // ── Right panel map — one customizer per component section ──────────────
  const rightPanelMap: Partial<Record<SectionKey, React.ReactNode>> = {
    buttons: (
      <ButtonTokenCustomizer tokens={buttonTokens} onChange={setButtonTokens} />
    ),
    inputs: (
      <TokenCustomizer
        title="Input"
        tokens={inputTokens}
        defaults={INPUT_TOKEN_DEFAULTS}
        groups={INPUT_TOKEN_GROUPS}
        onChange={setInputTokens}
      />
    ),
    select: (
      <TokenCustomizer
        title="Select"
        tokens={selectTokens}
        defaults={SELECT_TOKEN_DEFAULTS}
        groups={SELECT_TOKEN_GROUPS}
        onChange={setSelectTokens}
      />
    ),
    datepicker: (
      <TokenCustomizer
        title="Date Picker"
        tokens={datePickerTokens}
        defaults={DATEPICKER_TOKEN_DEFAULTS}
        groups={DATEPICKER_TOKEN_GROUPS}
        onChange={setDatePickerTokens}
      />
    ),
    form: (
      <TokenCustomizer
        title="Form"
        tokens={formTokens}
        defaults={FORM_TOKEN_DEFAULTS}
        groups={FORM_TOKEN_GROUPS}
        onChange={setFormTokens}
      />
    ),
    "radio-tab": (
      <TokenCustomizer
        title="Radio Button (Tab)"
        tokens={radioTabTokens}
        defaults={RADIOTAB_TOKEN_DEFAULTS}
        groups={RADIOTAB_TOKEN_GROUPS}
        onChange={setRadioTabTokens}
      />
    ),
    table: (
      <TokenCustomizer
        title="Table"
        tokens={tableTokens}
        defaults={TABLE_TOKEN_DEFAULTS}
        groups={TABLE_TOKEN_GROUPS}
        onChange={setTableTokens}
      />
    ),
    modal: (
      <TokenCustomizer
        title="Modal"
        tokens={modalTokens}
        defaults={MODAL_TOKEN_DEFAULTS}
        groups={MODAL_TOKEN_GROUPS}
        onChange={setModalTokens}
      />
    ),
  };

  const navContent = (
    <nav className="showcase-nav">
      {Object.entries(groups).map(([groupName, items]) => (
        <div key={groupName} className="showcase-group">
          <span className="showcase-sidebar-label">{t(groupName)}</span>
          {items.map((s) => (
            <div
              key={s.key}
              onClick={() => handleNavClick(s.key)}
              className={`showcase-nav-item${active === s.key ? " active" : ""}`}
            >
              <span className="showcase-nav-icon">{ICONS[s.key]}</span>
              <span className="showcase-nav-label">{t(s.label)}</span>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );

  return (
    <LangContext.Provider value={lang}>
      <div className="showcase-layout" data-theme={dark ? "dark" : "light"}>
        {/* ── Full-width top header ─────────────────────────────────────── */}
        <header className="showcase-header">
          <div className="showcase-header-logo" onClick={onHome}>
            <span className="showcase-logo-mark">S</span>
            <span className="showcase-logo-text">
              Shin<em>etsu</em>
            </span>
          </div>

          <button
            className="showcase-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <MenuOutlined />
          </button>

          <div className="showcase-header-controls">
            <span className="showcase-version">v1.0.0</span>

            <a
              className="sc-btn"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              title="Fork on GitHub"
            >
              <BranchesOutlined />
              <span>Fork</span>
              <GithubOutlined />
            </a>

            <button
              className="sc-btn sc-btn--icon"
              onClick={() => onToggleDark && onToggleDark()}
              title={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? <SunOutlined /> : <MoonFilled />}
            </button>

            <div className="sc-lang">
              <button
                className={`sc-lang-btn${lang === "en" ? " active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                className={`sc-lang-btn${lang === "ja" ? " active" : ""}`}
                onClick={() => setLang("ja")}
              >
                日
              </button>
            </div>
          </div>
        </header>

        {/* ── Body row ─────────────────────────────────────────────────── */}
        <div className="showcase-body">
          {/* Desktop sidebar */}
          <aside className="showcase-sidebar--desktop">{navContent}</aside>

          {/* Drawer overlay + panel */}
          {drawerOpen && (
            <div className="showcase-overlay" onClick={() => setDrawerOpen(false)} />
          )}
          <aside className={`showcase-sidebar--drawer${drawerOpen ? " open" : ""}`}>
            <button
              className="showcase-drawer-close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            {navContent}
          </aside>

          {/* Content — ConfigProvider applies ALL component tokens at once */}
          <main className="showcase-content">
            <ConfigProvider
              getPopupContainer={() => contentBodyRef.current ?? document.body}
              theme={{
                components: {
                  Button: {
                    ...buttonTokens,
                    borderRadiusSM: buttonTokens.borderRadius,
                    borderRadiusLG: buttonTokens.borderRadius,
                  },
                  Input: inputTokens,
                  Select: selectTokens,
                  DatePicker: datePickerTokens,
                  Form: formTokens,
                  Radio: radioTabTokens,
                  Table: tableTokens,
                  Modal: modalTokens,
                },
              }}
            >
              <div
                ref={contentBodyRef}
                className="showcase-content-body"
                style={{
                  "--sc-opt-sel-color": selectTokens.optionSelectedColor,
                  "--sc-opt-sel-bg":    selectTokens.optionSelectedBg,
                  "--sc-opt-active-bg": selectTokens.optionActiveBg,
                } as React.CSSProperties}
              >
                <Title level={3} style={{ marginBottom: 4 }}>
                  {t(sections.find((s) => s.key === active)?.label ?? "")}
                </Title>
                <Divider style={{ margin: "16px 0 24px" }} />
                {contentMap[active].guidance}
                {active === "frame"
                  ? <FrameSection onOpenDemo={onOpenDemo} />
                  : contentMap[active].component}
              </div>
            </ConfigProvider>
          </main>

          {/* Sticky right panel — shown for every component section that has tokens */}
          {rightPanelMap[active] && (
            <aside className="showcase-right-panel">
              {rightPanelMap[active]}
            </aside>
          )}
        </div>
      </div>
    </LangContext.Provider>
  );
}
