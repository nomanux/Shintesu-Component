import React from "react";
import { Button, Divider, Flex } from "antd";
import "./Buttons.scss";
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
import {
  type BtnTokens,
  BUTTON_TOKEN_DEFAULTS,
  TOKEN_GROUPS,
} from "./buttonTokens";

// ── Token Customizer (Ant Design theme-editor style) ─────────────────────────

function formatValue(val: string | number): string {
  if (typeof val === "number") return String(val);
  if (val.length > 9) return val.slice(0, 8) + "…";
  return val.toUpperCase();
}

function TokenRow({
  label,
  value,
  defaultValue,
  type,
  onChange,
  onReset,
}: {
  label: string;
  value: string | number;
  defaultValue: string | number;
  type: "color" | "number";
  onChange: (v: string | number) => void;
  onReset: () => void;
}) {
  const modified = value !== defaultValue;

  return (
    <div className="tc-row">
      <span className="tc-row__comp">Comp</span>
      <span className={`tc-row__name${modified ? " tc-row__name--modified" : ""}`}>
        {label}
      </span>
      {modified && (
        <button className="tc-row__reset-link" onClick={onReset}>
          Reset
        </button>
      )}
      <span className="tc-row__value">{formatValue(value)}</span>
      {type === "color" ? (
        <label
          className="tc-row__swatch"
          style={{ background: value as string }}
          title={`Click to change ${label}`}
        >
          <input
            type="color"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      ) : (
        <input
          type="number"
          className="tc-row__number"
          value={value as number}
          min={0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}
    </div>
  );
}

/** Controlled token editor — Ant Design theme-editor visual style.
 *  No own state, no preview. Changes reflect via ConfigProvider in ComponentShowcase. */
export function ButtonTokenCustomizer({
  tokens,
  onChange,
}: {
  tokens: BtnTokens;
  onChange: (tokens: BtnTokens) => void;
}) {
  const set = <K extends keyof BtnTokens>(key: K, val: BtnTokens[K]) =>
    onChange({ ...tokens, [key]: val });
  const reset = (key: keyof BtnTokens) =>
    onChange({ ...tokens, [key]: BUTTON_TOKEN_DEFAULTS[key] });

  const isDirty = JSON.stringify(tokens) !== JSON.stringify(BUTTON_TOKEN_DEFAULTS);

  return (
    <div>
      {/* Sticky header */}
      <div className="tc-header">
        <span className="tc-header__title">Button</span>
        <button
          className={`tc-header__reset${isDirty ? " tc-header__reset--active" : ""}`}
          onClick={() => onChange({ ...BUTTON_TOKEN_DEFAULTS })}
          disabled={!isDirty}
        >
          Reset All
        </button>
      </div>

      {/* Grouped token rows */}
      {TOKEN_GROUPS.map((group) => (
        <div key={group.label}>
          <div className="tc-group__label">{group.label}</div>
          {group.tokens.map(({ key, type }) => (
            <TokenRow
              key={key}
              label={key}
              value={tokens[key]}
              defaultValue={BUTTON_TOKEN_DEFAULTS[key]}
              type={type}
              onChange={(v) => set(key, v as BtnTokens[typeof key])}
              onReset={() => reset(key)}
            />
          ))}
        </div>
      ))}
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
            <Button type="primary" size="small">Small</Button>
            <Button type="primary">Middle</Button>
            <Button type="primary" size="large">Large</Button>
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
            <Button type="primary" disabled>Primary</Button>
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
            <Button type="primary" icon={<DownloadOutlined />}>Download</Button>
            <Button type="primary" icon={<UploadOutlined />}>Upload</Button>
            <Button icon={<EditOutlined />}>Edit</Button>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </Flex>
        }
        code={`import { Button } from "antd";
import { DownloadOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

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

      {/* Loading */}
      <Variant
        label="Loading"
        preview={
          <Flex gap={8}>
            <Button type="primary" loading>Loading</Button>
            <Button type="primary" loading={loading} onClick={triggerLoading}>
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
      <Button type="primary" loading={loading} onClick={() => setLoading(true)}>
        Submit
      </Button>
    </>
  );
}`}
      />
    </Flex>
  );
}
