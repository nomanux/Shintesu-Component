import React from "react";
import {
  Button,
  Input,
  Select,
  DatePicker,
  Radio,
  Typography,
  Flex,
  theme as antTheme,
} from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { AppModal } from "../components";
import { GlobalTable } from "./showcase/Table";
import { colors, modalWidth } from "../theme";

const { Title, Text } = Typography;

/* ── Section card ─────────────────────────────────────────────────────────── */

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: colors.gray[1],
        border: `1px solid ${colors.gray[4]}`,
        padding: "20px 24px",
      }}
    >
      <Title level={5} style={{ margin: "0 0 2px", color: colors.gray[9] }}>
        {title}
      </Title>
      {description && (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {description}
        </Text>
      )}
      <div
        style={{
          borderTop: `1px solid ${colors.gray[4]}`,
          marginTop: 14,
          paddingTop: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Button ───────────────────────────────────────────────────────────────── */

function ButtonsCard() {
  return (
    <Card title="Button" description="Primary · Default · Disabled · Primary Disabled">
      <Flex wrap="wrap" gap={8}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button type="primary" disabled>Primary Disabled</Button>
      </Flex>
      <Flex wrap="wrap" gap={8} style={{ marginTop: 12 }}>
        <Button type="primary" size="small">Small</Button>
        <Button type="primary">Middle</Button>
        <Button type="primary" size="large">Large</Button>
      </Flex>
    </Card>
  );
}

/* ── Input ────────────────────────────────────────────────────────────────── */

function InputsCard() {
  return (
    <Card title="Input" description="Text · With prefix · Disabled · Textarea · Password">
      <Flex vertical gap={8} style={{ maxWidth: 340 }}>
        <Input />
        <Input prefix={<UserOutlined />} />
        <Input.Password />
        <Input disabled />
        <Input.TextArea rows={3} />
      </Flex>
    </Card>
  );
}

/* ── Select ───────────────────────────────────────────────────────────────── */

const SELECT_OPTS = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
  { value: "opt4", label: "Option 4" },
];

function SelectCard() {
  return (
    <Card title="Select" description="Default · Filled · Disabled">
      <Flex vertical gap={8} style={{ maxWidth: 340 }}>
        <Select options={SELECT_OPTS} style={{ width: "100%" }} />
        <Select options={SELECT_OPTS} style={{ width: "100%" }} value="opt1" />
        <Select options={SELECT_OPTS} style={{ width: "100%" }} value="opt1" disabled />
      </Flex>
    </Card>
  );
}

/* ── Date Picker ──────────────────────────────────────────────────────────── */

function DatePickerCard() {
  return (
    <Card title="Date Picker" description="Single date">
      <Flex vertical gap={8}>
        <DatePicker placeholder="" style={{ width: 320 }} />
      </Flex>
    </Card>
  );
}

/* ── Table ────────────────────────────────────────────────────────────────── */

function TableCard() {
  return (
    <Card
      title="Table (SplitTable)"
      description="Drag header to reorder · Drag right edge to resize · Drag handle (bottom-left) to freeze columns · Click row to select"
    >
      <GlobalTable />
    </Card>
  );
}

/* ── Modal ────────────────────────────────────────────────────────────────── */

function ModalCard() {
  const [open, setOpen] = React.useState(false);

  return (
    <Card title="Modal" description="Confirmation · Form collection · Configurable width">
      <Flex gap={8}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
      </Flex>

      <AppModal
        open={open}
        title="Confirm Action"
        width={modalWidth.md}
        onCancel={() => setOpen(false)}
        footer={
          <Flex justify="flex-end" gap={8}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </Flex>
        }
      >
        <Flex vertical gap={12}>
          <Text>Are you sure you want to proceed with this action?</Text>
          <Text type="secondary" style={{ fontSize: 13 }}>
            This will apply the selected changes. You can review them in the activity log
            afterwards.
          </Text>
        </Flex>
      </AppModal>
    </Card>
  );
}

/* ── Radio Button (Tab) ───────────────────────────────────────────────────── */

const TAB_PANELS = [
  {
    key: "tab1",
    label: "Overview",
    content: (
      <Flex vertical gap={6}>
        <Text style={{ fontSize: 13 }}>Summary content for the Overview tab.</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Use tabs to switch between mutually exclusive views of the same context.
        </Text>
      </Flex>
    ),
  },
  {
    key: "tab2",
    label: "Details",
    content: (
      <Text style={{ fontSize: 13 }}>Detailed content for the Details tab.</Text>
    ),
  },
  {
    key: "tab3",
    label: "History",
    content: (
      <Text style={{ fontSize: 13 }}>Historical records go here.</Text>
    ),
  },
];

function RadioTabCard() {
  const { token } = antTheme.useToken();
  const [tab, setTab] = React.useState("tab1");
  const active = TAB_PANELS.find((t) => t.key === tab) ?? TAB_PANELS[0];

  return (
    <Card
      title="Radio Button (Tab)"
      description="Tab switcher using Radio.Group in outline mode — active tab border merges into panel"
    >
      <div>
        <div
          style={{
            lineHeight: 0,
            position: "relative",
            zIndex: 1,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Radio.Group
            value={tab}
            onChange={(e) => setTab(e.target.value)}
            buttonStyle="outline"
            size="small"
            style={{ display: "flex", gap: token.marginXXS }}
          >
            {TAB_PANELS.map((t) => (
              <Radio.Button key={t.key} value={t.key}>
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
            minHeight: 60,
          }}
        >
          {active.content}
        </div>
      </div>
    </Card>
  );
}

/* ── KitGallery ───────────────────────────────────────────────────────────── */

type Props = { onBack?: () => void };

export default function KitGallery({ onBack }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: colors.gray[2],
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header
        style={{
          flexShrink: 0,
          height: 48,
          background: colors.gray[1],
          borderBottom: `1px solid ${colors.gray[4]}`,
          display: "flex",
          alignItems: "center",
          gap: 0,
          padding: "0 20px",
        }}
      >
        {onBack && (
          <>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              style={{ minWidth: "auto", color: colors.gray[7] }}
            >
              Back
            </Button>
            <div
              style={{
                width: 1,
                height: 20,
                background: colors.gray[4],
                margin: "0 12px",
              }}
            />
          </>
        )}
        <Title level={5} style={{ margin: 0, color: colors.gray[9] }}>
          Component Gallery
        </Title>
      </header>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Page title */}
          <div style={{ marginBottom: 24 }}>
            <Title level={3} style={{ margin: "0 0 4px" }}>
              All Components
            </Title>
            <Text type="secondary">
              Live previews of every component in the Shinetsu design system.
            </Text>
          </div>

          {/* 2-column grid for smaller cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <ButtonsCard />
            <InputsCard />
            <SelectCard />
            <DatePickerCard />
          </div>

          {/* Full-width cards */}
          <Flex vertical gap={16}>
            <TableCard />
            <RadioTabCard />
            <ModalCard />
          </Flex>
        </div>
      </div>
    </div>
  );
}
