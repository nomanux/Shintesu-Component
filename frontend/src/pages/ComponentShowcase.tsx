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

import FoundationsSection, {
  FoundationsGuidance,
} from "./showcase/Foundations";
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

const { Title } = Typography;

/* ── Nav icons ────────────────────────────────────────────────────────────── */

const ICONS: Record<string, React.ReactNode> = {
  introduction: <BookOutlined />,
  installation: <DownloadOutlined />,
  foundations: <BgColorsOutlined />,
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

const contentMap: Record<
  SectionKey,
  { component: React.ReactNode; guidance: React.ReactNode; rightPanel?: React.ReactNode }
> = {
  introduction: { component: <IntroductionSection />, guidance: null },
  installation: { component: <InstallationSection />, guidance: null },
  foundations: {
    component: <FoundationsSection />,
    guidance: <FoundationsGuidance />,
  },
  frame: { component: <FrameSection />, guidance: <FrameGuidance /> },
  buttons: { component: <ButtonsSection />, guidance: <ButtonsGuidance /> },
  inputs: { component: <InputsSection />, guidance: <InputsGuidance /> },
  select: { component: <SelectSection />, guidance: <SelectGuidance /> },
  datepicker: {
    component: <DatePickerSection />,
    guidance: <DatePickerGuidance />,
  },
  form: { component: <FormSection />, guidance: <FormGuidance /> },
  "radio-tab": {
    component: <RadioTabSection />,
    guidance: <RadioTabGuidance />,
  },
  table: { component: <TableSection />, guidance: <TableGuidance /> },
  modal: { component: <ModalSection />, guidance: <ModalGuidance /> },
  scroll: { component: <ScrollSection />, guidance: <ScrollGuidance /> },
};

/* ── Component ────────────────────────────────────────────────────────────── */

type Props = {
  initialSection?: string;
  onHome?: () => void;
  dark?: boolean;
  onToggleDark?: () => void;
};

export default function ComponentShowcase({
  initialSection = "introduction",
  onHome,
  dark = false,
  onToggleDark,
}: Props) {
  const [active, setActive] = React.useState<SectionKey>(
    initialSection as SectionKey,
  );
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [lang, setLang] = React.useState<Lang>("en");
  const [buttonTokens, setButtonTokens] = React.useState<BtnTokens>({ ...BUTTON_TOKEN_DEFAULTS });

  const t = (text: string) =>
    lang === "ja" ? (LABELS_JA[text] ?? text) : text;

  const groups = sections.reduce<Record<string, (typeof sections)[number][]>>(
    (acc, s) => {
      (acc[s.group] ||= []).push(s);
      return acc;
    },
    {},
  );

  const handleNavClick = (key: SectionKey) => {
    setActive(key);
    setDrawerOpen(false);
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
          {/* Logo — left side */}
          <div className="showcase-header-logo" onClick={onHome}>
            <span className="showcase-logo-mark">S</span>
            <span className="showcase-logo-text">
              Shin<em>etsu</em>
            </span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="showcase-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <MenuOutlined />
          </button>

          {/* Controls — right side */}
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
            <div
              className="showcase-overlay"
              onClick={() => setDrawerOpen(false)}
            />
          )}
          <aside
            className={`showcase-sidebar--drawer${drawerOpen ? " open" : ""}`}
          >
            <button
              className="showcase-drawer-close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            {navContent}
          </aside>

          {/* Content */}
          <main className="showcase-content">
            <ConfigProvider
              theme={
                active === "buttons"
                  ? { components: { Button: buttonTokens } }
                  : undefined
              }
            >
              <div className="showcase-content-body">
                <Title level={3} style={{ marginBottom: 4 }}>
                  {t(sections.find((s) => s.key === active)?.label ?? "")}
                </Title>
                <Divider style={{ margin: "16px 0 24px" }} />
                {contentMap[active].guidance}
                {contentMap[active].component}
              </div>
            </ConfigProvider>
          </main>

          {/* Sticky right panel — rendered when a section provides one */}
          {active === "buttons" && (
            <aside className="showcase-right-panel">
              <ButtonTokenCustomizer
                tokens={buttonTokens}
                onChange={setButtonTokens}
              />
            </aside>
          )}
        </div>
      </div>
    </LangContext.Provider>
  );
}
