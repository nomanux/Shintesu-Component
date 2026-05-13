import React from "react";
import { Radio, Input, Button, Divider, Flex, theme } from "antd";
import { colors } from "../../theme";
import ShowcaseTable from "./Table";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

export function RadioTabGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Radio buttons styled as tabs for switching between content panels",
        "Active tab borders connect into the panel — gives a unified surface",
        "Each tab can host any content: tables, forms, button groups, etc.",
        "Use small or middle size to fit tighter layouts",
      ]}
      whenToUse={[
        "Switching between mutually exclusive views of the same context",
        "When you have 2–6 panels — more than that, consider a sidebar",
      ]}
      whenNotToUse={[
        "For multi-select state — use Checkboxes",
        "For single binary on/off — use Switch",
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

type Tab = { key: string; label: string; content: React.ReactNode };

/** Tabbed Radio group with a panel that overlaps the active tab border. */
function Tabs({
  tabs,
  initial,
  size = "small",
  disabledKeys = [],
}: {
  tabs: Tab[];
  initial: string;
  size?: "small" | "middle" | "large";
  disabledKeys?: string[];
}) {
  const { token } = theme.useToken();
  const [value, setValue] = React.useState(initial);
  const active = tabs.find((t) => t.key === value) ?? tabs[0];

  return (
    <div>
      <div style={{ lineHeight: 0, position: "relative", zIndex: 1 }}>
        <Radio.Group
          value={value}
          onChange={(e) => setValue(e.target.value)}
          buttonStyle="outline"
          size={size}
          style={{ display: "flex", gap: token.marginXXS }}
        >
          {tabs.map((t) => (
            <Radio.Button
              key={t.key}
              value={t.key}
              disabled={disabledKeys.includes(t.key)}
            >
              {t.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>

      <div
        style={{
          border: `1px solid ${colors.brand[4]}`,
          marginTop: -1,
          position: "relative",
          zIndex: 2,
          background: colors.gray[1],
          padding: token.paddingSM,
        }}
      >
        {active.content}
      </div>
    </div>
  );
}

export default function RadioTabSection() {
  return (
    <Flex vertical gap={32}>
      {/* Usage */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`import React from "react";
import { Radio, theme } from "antd";
import { colors } from "@/theme";

export function RadioTabsDefault() {
  const { token } = theme.useToken();
  const [value, setValue] = React.useState("tab1");

  return (
    <div>
      <div style={{ lineHeight: 0, position: "relative", zIndex: 1 }}>
        <Radio.Group
          value={value}
          onChange={(e) => setValue(e.target.value)}
          buttonStyle="outline"
          size="small"
          style={{ display: "flex", gap: token.marginXXS }}
        >
          <Radio.Button value="tab1">Tab 1</Radio.Button>
          <Radio.Button value="tab2">Tab 2</Radio.Button>
        </Radio.Group>
      </div>

      {/* Panel overlaps tab bar by 1px to merge borders */}
      <div
        style={{
          border: \`1px solid \${colors.brand[4]}\`,
          marginTop: -1,
          position: "relative",
          zIndex: 2,
          background: colors.gray[1],
          padding: token.paddingSM,
        }}
      >
        {/* panel content */}
      </div>
    </div>
  );
}`}</CodeBlock>
      </div>

      {/* Default — Table panel */}
      <Variant
        label="Default"
        preview={
          <Tabs
            initial="tab1"
            tabs={[
              { key: "tab1", label: "Tabs 1 - Active", content: <ShowcaseTable /> },
              {
                key: "tab2",
                label: "Tabs - 2",
                content: (
                  <Flex vertical gap={12}>
                    <Input placeholder="Field 1" />
                    <Input placeholder="Field 2" />
                  </Flex>
                ),
              },
              {
                key: "tab3",
                label: "Tabs - 3",
                content: (
                  <Flex gap={8}>
                    <Button type="primary">Action A</Button>
                    <Button>Action B</Button>
                  </Flex>
                ),
              },
            ]}
          />
        }
        code={`import React from "react";
import { Radio, Input, Button, Flex, theme } from "antd";
import { colors } from "@/theme";

export function RadioTabsDefault() {
  const { token } = theme.useToken();
  const [value, setValue] = React.useState("tab1");

  const content = {
    tab1: <YourTable />,
    tab2: (
      <Flex vertical gap={12}>
        <Input placeholder="Field 1" />
        <Input placeholder="Field 2" />
      </Flex>
    ),
    tab3: (
      <Flex gap={8}>
        <Button type="primary">Action A</Button>
        <Button>Action B</Button>
      </Flex>
    ),
  };

  return (
    <div>
      <div style={{ lineHeight: 0, position: "relative", zIndex: 1 }}>
        <Radio.Group
          value={value}
          onChange={(e) => setValue(e.target.value)}
          buttonStyle="outline"
          size="small"
          style={{ display: "flex", gap: token.marginXXS }}
        >
          <Radio.Button value="tab1">Tabs 1 - Active</Radio.Button>
          <Radio.Button value="tab2">Tabs - 2</Radio.Button>
          <Radio.Button value="tab3">Tabs - 3</Radio.Button>
        </Radio.Group>
      </div>
      <div
        style={{
          border: \`1px solid \${colors.brand[4]}\`,
          marginTop: -1,
          position: "relative",
          zIndex: 2,
          background: colors.gray[1],
          padding: token.paddingSM,
        }}
      >
        {content[value]}
      </div>
    </div>
  );
}`}
      />

      {/* Disabled tab */}
      <Variant
        label="Disabled Tab"
        preview={
          <Tabs
            initial="a"
            disabledKeys={["b"]}
            tabs={[
              { key: "a", label: "Available", content: <Placeholder text="Available content" /> },
              { key: "b", label: "Disabled", content: <Placeholder text="(unreachable)" /> },
              { key: "c", label: "Also Available", content: <Placeholder text="Other content" /> },
            ]}
          />
        }
        code={`<Radio.Group buttonStyle="outline" size="small" value={value} onChange={...}>
  <Radio.Button value="a">Available</Radio.Button>
  <Radio.Button value="b" disabled>Disabled</Radio.Button>
  <Radio.Button value="c">Also Available</Radio.Button>
</Radio.Group>`}
      />
    </Flex>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div style={{ color: colors.gray[7], fontSize: 14, padding: "12px 0" }}>
      {text}
    </div>
  );
}
