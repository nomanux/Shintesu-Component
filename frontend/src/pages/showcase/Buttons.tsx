import React from "react";
import { Button, Divider, Flex } from "antd";
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
