import React from "react";
import { Radio, Input, Button, Flex, theme } from "antd";
import { colors } from "../../theme";
import ShowcaseTable from "./Table";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

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

const tabContent: Record<string, React.ReactNode> = {
  tab1: <ShowcaseTable />,
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

export default function RadioTabSection() {
  const { token } = theme.useToken();
  const [value, setValue] = React.useState("tab1");

  return (
    <Flex vertical gap={24}>
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
            border: `1px solid ${colors.brand[4]}`,
            marginTop: -1,
            position: "relative",
            zIndex: 2,
            background: colors.gray[1],
            padding: token.paddingSM,
          }}
        >
          {tabContent[value]}
        </div>
      </div>

      <CodeBlock>{`<Radio.Group
  value={value}
  onChange={(e) => setValue(e.target.value)}
  buttonStyle="outline"
>
  <Radio.Button value="tab1">Tab 1</Radio.Button>
  <Radio.Button value="tab2">Tab 2</Radio.Button>
</Radio.Group>

{/* Panel — overlap by 1px to merge with active tab border */}
<div style={{ border: \`1px solid \${colors.brand[4]}\`, marginTop: -1 }}>
  {tabContent[value]}
</div>`}</CodeBlock>
    </Flex>
  );
}
