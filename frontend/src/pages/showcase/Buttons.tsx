import React from "react";
import { Button, ConfigProvider, Divider, Flex } from "antd";
import "./Buttons.scss";
import { colors } from "../../theme";
import {
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

// ── Token Customizer ──────────────────────────────────────────────────────────

const BUTTON_MIN_WIDTH = 110;

type BtnTokens = {
  // Sizing
  borderRadius: number;
  paddingInline: number;
  fontWeight: number;
  controlMinWidth: number;
  // Primary colors
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  primaryColor: string;
  // Default button colors
  defaultBg: string;
  defaultHoverBg: string;
  defaultActiveBg: string;
  defaultColor: string;
  defaultHoverColor: string;
  defaultActiveColor: string;
};

const DEFAULTS: BtnTokens = {
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

const TOKEN_GROUPS: {
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

function TokenRow({
  label,
  value,
  type,
  onChange,
}: {
  label: string;
  value: string | number;
  type: "color" | "number";
  onChange: (v: string | number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        minHeight: 32,
        padding: "2px 0",
        borderBottom: "1px solid var(--gray-3)",
      }}
    >
      <span
        style={{
          flex: 1,
          fontSize: 12,
          fontFamily: "monospace",
          color: "var(--gray-7)",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {type === "color" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--gray-6)" }}>
            {value}
          </span>
          <input
            type="color"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: 24,
              height: 24,
              padding: 0,
              border: "1px solid var(--gray-4)",
              borderRadius: 4,
              cursor: "pointer",
              background: "none",
            }}
          />
        </div>
      ) : (
        <input
          type="number"
          value={value as number}
          min={0}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            width: 60,
            height: 24,
            fontSize: 12,
            fontFamily: "monospace",
            border: "1px solid var(--gray-4)",
            borderRadius: 4,
            textAlign: "right",
            padding: "0 6px",
            background: "var(--gray-1)",
            color: "var(--gray-9)",
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
}

function ButtonTokenCustomizer() {
  const [tokens, setTokens] = React.useState<BtnTokens>({ ...DEFAULTS });
  const set = <K extends keyof BtnTokens>(key: K, val: BtnTokens[K]) =>
    setTokens((prev) => ({ ...prev, [key]: val }));
  const isDirty = JSON.stringify(tokens) !== JSON.stringify(DEFAULTS);

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {/* ── Controls ── */}
      <div
        style={{
          width: 320,
          flexShrink: 0,
          border: "1px solid var(--gray-4)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "10px 16px",
            background: "var(--gray-2)",
            borderBottom: "1px solid var(--gray-4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-9)" }}>
            Button Tokens
          </span>
          {isDirty && (
            <button
              onClick={() => setTokens({ ...DEFAULTS })}
              style={{
                fontSize: 11,
                padding: "2px 8px",
                border: "1px solid var(--gray-4)",
                borderRadius: 4,
                cursor: "pointer",
                background: "var(--gray-1)",
                color: "var(--gray-7)",
              }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Grouped token rows */}
        <div style={{ padding: "0 16px 12px" }}>
          {TOKEN_GROUPS.map((group) => (
            <div key={group.label}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "var(--gray-5)",
                  padding: "12px 0 4px",
                }}
              >
                {group.label}
              </div>
              {group.tokens.map(({ key, type }) => (
                <TokenRow
                  key={key}
                  label={key}
                  value={tokens[key]}
                  type={type}
                  onChange={(v) => set(key, v as BtnTokens[typeof key])}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Live preview ── */}
      <div style={{ flex: 1, minWidth: 240 }}>
        <ConfigProvider theme={{ components: { Button: tokens } }}>
          <div
            style={{
              border: "1px solid var(--gray-4)",
              borderRadius: 6,
              padding: 24,
              background: "var(--gray-1)",
              minHeight: 200,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "var(--gray-5)", marginBottom: 16 }}>
              Preview
            </div>
            <Flex vertical gap={12}>
              <Flex gap={8} wrap>
                <Button type="primary">Primary</Button>
                <Button type="primary" disabled>Disabled</Button>
                <Button type="primary" loading>Loading</Button>
              </Flex>
              <Flex gap={8} wrap>
                <Button>Default</Button>
                <Button disabled>Disabled</Button>
              </Flex>
              <Flex gap={8} wrap>
                <Button type="primary" size="small">Small</Button>
                <Button type="primary">Middle</Button>
                <Button type="primary" size="large">Large</Button>
              </Flex>
            </Flex>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
}

// ── Guidance & Variants ───────────────────────────────────────────────────────

export function ButtonsGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Primary buttons for main actions; default buttons for secondary actions",
        "Available sizes: small (24px), middle (32px), large (40px)",
        "Disabled primary uses brand-4 background; disabled default uses gray-3",
        "Minimum width is 110px (icon-only buttons are excluded)",
        "Use icons to reinforce common actions (Download, Upload, Edit, Delete)",
      ]}
      whenToUse={[
        "User needs to commit an action (submit, save, confirm, navigate)",
        "Choose primary for the single recommended action per view",
        "Add a loading state when the action takes more than ~200ms",
      ]}
      whenNotToUse={[
        "For navigation between pages — prefer a link",
        "More than one primary button per view — pick the most important action",
      ]}
    />
  );
}

/** Render a section label + divider + example block for each variant. */
function Variant({
  label,
  preview,
  code,
}: {
  label: string;
  preview: React.ReactNode;
  code: string;
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <Divider style={{ margin: "8px 0 16px" }} />
      <ExampleBlock preview={preview} code={code} />
    </div>
  );
}

export default function ButtonsSection() {
  const [loading, setLoading] = React.useState(false);
  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <Flex vertical gap={32}>
      {/* Usage */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`import { Button } from "antd";

export function ButtonDefault() {
  return <Button type="primary">Save</Button>;
}`}</CodeBlock>
      </div>

      {/* Primary */}
      <Variant
        label="Primary"
        preview={<Button type="primary">Button</Button>}
        code={`import { Button } from "antd";

export function ButtonPrimary() {
  return <Button type="primary">Button</Button>;
}`}
      />

      {/* Default */}
      <Variant
        label="Default"
        preview={<Button>Button</Button>}
        code={`import { Button } from "antd";

export function ButtonDefault() {
  return <Button>Button</Button>;
}`}
      />

      {/* Sizes */}
      <Variant
        label="Sizes"
        preview={
          <Flex gap={8} align="center">
            <Button type="primary" size="small">
              Small
            </Button>
            <Button type="primary">Middle</Button>
            <Button type="primary" size="large">
              Large
            </Button>
          </Flex>
        }
        code={`import { Button } from "antd";

export function ButtonSizes() {
  return (
    <>
      <Button type="primary" size="small">Small</Button>
      <Button type="primary">Middle</Button>
      <Button type="primary" size="large">Large</Button>
    </>
  );
}`}
      />

      {/* Disabled */}
      <Variant
        label="Disabled"
        preview={
          <Flex gap={8}>
            <Button type="primary" disabled>
              Primary
            </Button>
            <Button disabled>Default</Button>
          </Flex>
        }
        code={`import { Button } from "antd";

export function ButtonDisabled() {
  return (
    <>
      <Button type="primary" disabled>Primary</Button>
      <Button disabled>Default</Button>
    </>
  );
}`}
      />

      {/* With Icon */}
      <Variant
        label="With Icon"
        preview={
          <Flex wrap gap={8}>
            <Button type="primary" icon={<DownloadOutlined />}>
              Download
            </Button>
            <Button type="primary" icon={<UploadOutlined />}>
              Upload
            </Button>
            <Button icon={<EditOutlined />}>Edit</Button>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </Flex>
        }
        code={`import { Button } from "antd";
import {
  DownloadOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export function ButtonWithIcon() {
  return (
    <>
      <Button type="primary" icon={<DownloadOutlined />}>Download</Button>
      <Button type="primary" icon={<UploadOutlined />}>Upload</Button>
      <Button icon={<EditOutlined />}>Edit</Button>
      <Button icon={<DeleteOutlined />}>Delete</Button>
    </>
  );
}`}
      />

      {/* Token Customizer */}
      <div>
        <SectionLabel>Token Customizer</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <ButtonTokenCustomizer />
      </div>

      {/* Loading */}
      <Variant
        label="Loading"
        preview={
          <Flex gap={8}>
            <Button type="primary" loading>
              Loading
            </Button>
            <Button
              type="primary"
              loading={loading}
              onClick={triggerLoading}
            >
              Click to Load
            </Button>
            <Button loading>Loading</Button>
          </Flex>
        }
        code={`import React from "react";
import { Button } from "antd";

export function ButtonLoading() {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Button type="primary" loading>Loading</Button>
      <Button
        type="primary"
        loading={loading}
        onClick={() => setLoading(true)}
      >
        Submit
      </Button>
    </>
  );
}`}
      />
    </Flex>
  );
}
