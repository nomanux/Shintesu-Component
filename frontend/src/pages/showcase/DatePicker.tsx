import React from "react";
import "./DatePicker.scss";
import { DatePicker, Divider, Flex } from "antd";
import dayjs from "dayjs";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

export function DatePickerGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Always set format='YYYY/MM/DD' to keep dates consistent across the app",
        "Three sizes: small (24px), middle (32px, default), large (40px)",
        "Disabled empty: placeholder shows gray-5; disabled filled: value shows gray-9",
        "Never include time — use DatePicker without showTime",
      ]}
      whenToUse={[
        "When the user must pick a specific calendar date",
      ]}
      whenNotToUse={[
        "For year-only or month-only selection — use picker='year' / picker='month'",
        "When a typed date string is acceptable — use a plain Input",
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

const FORMAT = "YYYY/MM/DD";

export default function DatePickerSection() {
  return (
    <Flex vertical gap={32}>
      {/* Usage */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`import { DatePicker } from "antd";

export function DatePickerDefault() {
  return <DatePicker format="YYYY/MM/DD" />;
}`}</CodeBlock>
      </div>

      {/* Default */}
      <Variant
        label="Default"
        preview={<DatePicker format={FORMAT} placeholder="" inputReadOnly />}
        code={`<DatePicker format="YYYY/MM/DD" placeholder="" inputReadOnly />`}
      />

      {/* Sizes */}
      <Variant
        label="Sizes"
        preview={
          <Flex gap={12} align="center" wrap="wrap">
            <DatePicker size="small" format={FORMAT} placeholder="" inputReadOnly />
            <DatePicker format={FORMAT} placeholder="" inputReadOnly />
            <DatePicker size="large" format={FORMAT} placeholder="" inputReadOnly />
          </Flex>
        }
        code={`<DatePicker size="small"  format="YYYY/MM/DD" placeholder="" inputReadOnly />
<DatePicker               format="YYYY/MM/DD" placeholder="" inputReadOnly />
<DatePicker size="large"  format="YYYY/MM/DD" placeholder="" inputReadOnly />`}
      />

      {/* Disabled — filled */}
      <Variant
        label="Disabled (Filled)"
        preview={
          <DatePicker
            format={FORMAT}
            disabled
            inputReadOnly
            value={dayjs("2026/05/15", FORMAT)}
          />
        }
        code={`import dayjs from "dayjs";

<DatePicker
  disabled
  format="YYYY/MM/DD"
  value={dayjs("2026/05/15", "YYYY/MM/DD")}
/>`}
      />

      {/* Full width */}
      <Variant
        label="Full Width"
        preview={
          <div style={{ maxWidth: 300 }}>
            <DatePicker format={FORMAT} placeholder="" inputReadOnly style={{ width: "100%" }} />
          </div>
        }
        code={`<DatePicker format="YYYY/MM/DD" placeholder="" inputReadOnly style={{ width: "100%" }} />`}
      />
    </Flex>
  );
}
