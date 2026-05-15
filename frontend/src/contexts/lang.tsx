import { createContext, useContext } from "react";

export type Lang = "en" | "ja";

export const LangContext = createContext<Lang>("en");

export function useLang() {
  return useContext(LangContext);
}

/** Translate a string using the provided map; fall back to the original. */
export function tr(text: string, lang: Lang, map: Record<string, string>): string {
  return lang === "ja" ? (map[text] ?? text) : text;
}

/* ── Common section label translations ───────────────────────────────────── */

export const SECTION_JA: Record<string, string> = {
  // Shared
  Usage:                              "使い方",
  Default:                            "デフォルト",
  Disabled:                           "無効",
  Sizes:                              "サイズ",
  "Full Width":                       "全幅",
  "With Value":                       "値あり",

  // Buttons
  Primary:                            "プライマリ",
  "With Icon":                        "アイコン付き",
  Loading:                            "ローディング",

  // Inputs
  "With Prefix Icon":                 "プレフィックスアイコン付き",
  Password:                           "パスワード",
  "Password — Custom Visibility Icons": "パスワード — カスタム表示アイコン",
  SpecialInput:                       "スペシャルインプット",
  SpecialInput2:                      "スペシャルインプット2",
  "Compact Group":                    "コンパクトグループ",

  // DatePicker
  "Disabled (Filled)":               "無効（入力済み）",
  "Range Picker":                    "範囲選択",

  // Scroll
  "Vertical Scroll":                 "縦スクロール",
  "Horizontal Scroll":               "横スクロール",
  "Both Axes":                       "両方向",
  "Custom Scrollbar (scroll-styled)":"カスタムスクロールバー",

  // Frame
  "Page frame template":             "ページフレームテンプレート",

  // Introduction
  "What is Synetsu?":               "シンエツとは？",
  "Design Principles":               "デザイン原則",
  "Quick Start":                     "クイックスタート",
  "What's Included":                 "含まれる機能",

  // Installation
  Prerequisites:                     "前提条件",
  "Setup Steps":                     "セットアップ手順",
  "Using in Your Project":           "プロジェクトでの使用方法",
  "Project Structure":               "プロジェクト構造",
  "Key Files":                       "主要ファイル",
};

/* ── DeveloperGuidance fixed labels ──────────────────────────────────────── */

export const GUIDANCE_JA = {
  forDevelopers: "開発者向け",
  whenToUse:     "使用するケース",
  whenNotToUse:  "使用しないケース",
};
