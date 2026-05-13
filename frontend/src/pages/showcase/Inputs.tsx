import React from "react";
import { Input, Space, Divider, Flex } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import SpecialInput from "../../components/SpecialInput";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

const { Password } = Input;

export function InputsGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Regular Input for standard text entry",
        "Password input toggles visibility via iconRender",
        "SpecialInput supports click-to-edit and double-click-to-modal patterns",
        "Three sizes: small (24px), middle (32px, default), large (40px)",
        "Use prefix icons to reinforce field meaning (user, lock, search)",
        "Disabled inputs show default cursor — not the OS not-allowed icon",
      ]}
      whenToUse={[
        "Single-line free-text entry where the value is unconstrained",
        "Password fields when entering sensitive data",
        "SpecialInput when a field has both a quick-edit and a full-edit mode",
      ]}
      whenNotToUse={[
        "For multi-line text — use Input.TextArea",
        "When the value is from a fixed list — use Select",
        "For numbers with stepper UX — use InputNumber",
      ]}
    />
  );
}

/** Section label + divider + ExampleBlock — one variant per block. */
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

export default function InputsSection() {
  return (
    <Flex vertical gap={32}>
      {/* Usage */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`import { Input } from "antd";

export function InputDefault() {
  return <Input placeholder="Enter text" />;
}`}</CodeBlock>
      </div>

      {/* Default */}
      <Variant
        label="Default"
        preview={<Input placeholder="Enter text" />}
        code={`import { Input } from "antd";

export function InputDefault() {
  return <Input placeholder="Enter text" />;
}`}
      />

      {/* Disabled */}
      <Variant
        label="Disabled"
        preview={<Input disabled value="This is disabled" />}
        code={`import { Input } from "antd";

export function InputDisabled() {
  return <Input disabled value="This is disabled" />;
}`}
      />

      {/* With Prefix Icon */}
      <Variant
        label="With Prefix Icon"
        preview={
          <Input prefix={<UserOutlined />} placeholder="Username" />
        }
        code={`import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export function InputWithPrefix() {
  return <Input prefix={<UserOutlined />} placeholder="Username" />;
}`}
      />

      {/* Sizes */}
      <Variant
        label="Sizes"
        preview={
          <Flex vertical gap={12}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Large" />
            <Input prefix={<UserOutlined />} placeholder="Middle (default)" />
            <Input size="small" prefix={<UserOutlined />} placeholder="Small" />
          </Flex>
        }
        code={`import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export function InputSizes() {
  return (
    <>
      <Input size="large" prefix={<UserOutlined />} placeholder="Large" />
      <Input prefix={<UserOutlined />} placeholder="Middle (default)" />
      <Input size="small" prefix={<UserOutlined />} placeholder="Small" />
    </>
  );
}`}
      />

      {/* Password */}
      <Variant
        label="Password"
        preview={
          <Password prefix={<LockOutlined />} placeholder="Password" />
        }
        code={`import { Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

export function InputPassword() {
  return (
    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
  );
}`}
      />

      {/* Password with custom iconRender */}
      <Variant
        label="Password — Custom Visibility Icons"
        preview={
          <Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            placeholder="Toggle visibility"
          />
        }
        code={`import { Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

export function InputPasswordCustom() {
  return (
    <Input.Password
      iconRender={(visible) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
      }
      placeholder="Toggle visibility"
    />
  );
}`}
      />

      {/* SpecialInput */}
      <Variant
        label="SpecialInput"
        preview={<SpecialInput />}
        code={`import SpecialInput from "@/components/SpecialInput";

export function SpecialInputDemo() {
  // Click to edit; double-click to open the full-edit modal.
  return <SpecialInput />;
}`}
      />

      {/* Compact Group */}
      <Variant
        label="Compact Group"
        preview={
          <Space.Compact>
            <SpecialInput style={{ width: "30%" }} />
            <Input style={{ width: "70%" }} />
          </Space.Compact>
        }
        code={`import { Input, Space } from "antd";
import SpecialInput from "@/components/SpecialInput";

export function InputCompactGroup() {
  return (
    <Space.Compact>
      <SpecialInput style={{ width: "30%" }} />
      <Input style={{ width: "70%" }} />
    </Space.Compact>
  );
}`}
      />
    </Flex>
  );
}
