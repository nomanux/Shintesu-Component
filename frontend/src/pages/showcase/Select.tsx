import React from "react";
import { Select, Divider, Flex } from "antd";
import { DownIcon, SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

const OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export function SelectGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Always pass suffixIcon={<DownIcon />} to use the design-system chevron",
        "Three sizes: small (24px), middle (32px, default), large (40px)",
        "Disabled select shows gray-3 background and gray-9 text — same as disabled Input",
        "Option hover and selected backgrounds use brand-1",
      ]}
      whenToUse={[
        "When the value must come from a fixed list of options",
        "Prefer over radio buttons when there are more than 4 options",
      ]}
      whenNotToUse={[
        "For free-text entry — use Input",
        "For 2–4 mutually exclusive options visible at once — use Radio",
        "For toggling a single boolean — use Switch",
      ]}
    />
  );
}

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

export default function SelectSection() {
  return (
    <Flex vertical gap={32}>
      {/* Usage */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`import { Select } from "antd";
import { DownIcon } from "@/pages/showcase/helpers";

export function SelectDefault() {
  return (
    <Select
      suffixIcon={<DownIcon />}
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
    />
  );
}`}</CodeBlock>
      </div>

      {/* Default */}
      <Variant
        label="Default"
        preview={
          <Select
            suffixIcon={<DownIcon />}
            style={{ width: 200 }}
            options={OPTIONS}
            placeholder="Select an option"
          />
        }
        code={`<Select suffixIcon={<DownIcon />} style={{ width: 200 }} options={options} />`}
      />

      {/* With default value */}
      <Variant
        label="With Value"
        preview={
          <Select
            suffixIcon={<DownIcon />}
            style={{ width: 200 }}
            options={OPTIONS}
            defaultValue="option1"
          />
        }
        code={`<Select suffixIcon={<DownIcon />} style={{ width: 200 }} options={options} defaultValue="option1" />`}
      />

      {/* Disabled */}
      <Variant
        label="Disabled"
        preview={
          <Flex gap={12}>
            <Select suffixIcon={<DownIcon />} style={{ width: 200 }} options={OPTIONS} disabled placeholder="Disabled" />
            <Select suffixIcon={<DownIcon />} style={{ width: 200 }} options={OPTIONS} disabled value="option1" />
          </Flex>
        }
        code={`<Select disabled placeholder="Disabled" options={options} />
<Select disabled value="option1" options={options} />`}
      />

      {/* Sizes */}
      <Variant
        label="Sizes"
        preview={
          <Flex gap={12} align="center">
            <Select size="small"  suffixIcon={<DownIcon />} style={{ width: 160 }} options={OPTIONS} />
            <Select               suffixIcon={<DownIcon />} style={{ width: 160 }} options={OPTIONS} />
            <Select size="large"  suffixIcon={<DownIcon />} style={{ width: 160 }} options={OPTIONS} />
          </Flex>
        }
        code={`<Select size="small"  suffixIcon={<DownIcon />} options={options} />
<Select               suffixIcon={<DownIcon />} options={options} />
<Select size="large"  suffixIcon={<DownIcon />} options={options} />`}
      />

      {/* Full width */}
      <Variant
        label="Full Width"
        preview={
          <div style={{ width: 300 }}>
            <Select suffixIcon={<DownIcon />} style={{ width: "100%" }} options={OPTIONS} />
          </div>
        }
        code={`<Select suffixIcon={<DownIcon />} style={{ width: "100%" }} options={options} />`}
      />
    </Flex>
  );
}
