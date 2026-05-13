import React from "react";
import { Button, Divider, Flex } from "antd";
import {
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { SectionLabel, GroupHeader, RowLabel, Cell } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

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

export default function ButtonsSection() {
  const [loading, setLoading] = React.useState(false);
  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <Flex vertical gap={32}>
      {/* Usage — basic import + use */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`import { Button } from "antd";

<Button type="primary">Save</Button>
<Button>Cancel</Button>`}</CodeBlock>
      </div>

      {/* Size & state matrix */}
      <div>
        <SectionLabel>Sizes &amp; States</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <ExampleBlock
          preview={
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th />
                    <GroupHeader span={2}>Primary</GroupHeader>
                    <th style={{ width: 24 }} />
                    <GroupHeader span={2}>Default</GroupHeader>
                  </tr>
                </thead>
                <tbody>
                  {(["small", "middle", "large"] as const).map((size) => (
                    <tr key={size}>
                      <RowLabel>
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </RowLabel>
                      <Cell>
                        <Button
                          type="primary"
                          size={size === "middle" ? undefined : size}
                        >
                          Button
                        </Button>
                      </Cell>
                      <Cell>
                        <Button
                          type="primary"
                          size={size === "middle" ? undefined : size}
                          disabled
                        >
                          Button
                        </Button>
                      </Cell>
                      <td />
                      <Cell>
                        <Button size={size === "middle" ? undefined : size}>
                          Button
                        </Button>
                      </Cell>
                      <Cell>
                        <Button
                          size={size === "middle" ? undefined : size}
                          disabled
                        >
                          Button
                        </Button>
                      </Cell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
          code={`<Button type="primary">Button</Button>
<Button type="primary" disabled>Button</Button>
<Button>Button</Button>
<Button size="small">Button</Button>
<Button size="large">Button</Button>`}
        />
      </div>

      {/* Icon buttons */}
      <div>
        <SectionLabel>With Icons</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <ExampleBlock
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
          code={`<Button type="primary" icon={<DownloadOutlined />}>Download</Button>
<Button type="primary" icon={<UploadOutlined />}>Upload</Button>
<Button icon={<EditOutlined />}>Edit</Button>
<Button icon={<DeleteOutlined />}>Delete</Button>`}
        />
      </div>

      {/* Loading state */}
      <div>
        <SectionLabel>Loading</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <ExampleBlock
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
          code={`<Button type="primary" loading>Loading</Button>
<Button type="primary" loading={loading} onClick={handleClick}>
  Submit
</Button>`}
        />
      </div>
    </Flex>
  );
}
