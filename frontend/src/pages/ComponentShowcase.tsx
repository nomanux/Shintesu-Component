import React from "react";
import {
  Button,
  Input,
  Space,
  Typography,
  Divider,
  Flex,
  Table,
  Select,
  Checkbox,
  Modal,
  Radio,
  theme,
} from "antd";
import { colors } from "../theme";
import {
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import SpecialInput from "../components/SpecialInput";

const DownOutlinedIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.486251 3.1995C0.724828 2.94502 1.12452 2.93214 1.37899 3.1707L5.99974 7.50266L10.6204 3.1707C10.875 2.93214 11.2746 2.94502 11.5133 3.1995C11.7517 3.45398 11.7389 3.85367 11.4845 4.09224L6.4317 8.8292C6.18876 9.05695 5.81071 9.05695 5.56777 8.8292L0.515052 4.09224C0.260572 3.85367 0.247687 3.45398 0.486251 3.1995Z"
      fill="#192A42"
    />
  </svg>
);

const { Title, Text } = Typography;
const { Search, Password } = Input;

// ── Helper components ──────────────────────────────────────────────────────

function GroupHeader({ children, span }: { children: string; span: number }) {
  return (
    <th
      colSpan={span}
      style={{
        padding: "4px 12px 8px",
        color: "#009B94",
        fontWeight: 400,
        fontSize: 13,
        textAlign: "center",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      {children}
    </th>
  );
}

function RowLabel({ children }: { children: string }) {
  return (
    <td
      style={{
        paddingRight: 24,
        color: "#009B94",
        fontSize: 13,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "10px 12px",
        textAlign: "center",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      type="secondary"
      style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}
    >
      {children}
    </Text>
  );
}

// ── Nav config ─────────────────────────────────────────────────────────────

const sections = [
  { key: "buttons", label: "Buttons" },
  { key: "inputs", label: "Inputs" },
  { key: "table", label: "Table" },
  { key: "modal", label: "Modal" },
  { key: "radio-tab", label: "Radio Button (Tab)" },
  { key: "scroll", label: "Scroll" },
] as const;

type SectionKey = (typeof sections)[number]["key"];

function ButtonsContent() {
  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th />
              <GroupHeader span={1}>Primary</GroupHeader>
              <th style={{ width: 24 }} />
              <GroupHeader span={1}>Default</GroupHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <RowLabel>Small</RowLabel>
              <Cell>
                <Button type="primary" size="small">Button</Button>
              </Cell>
              <td />
              <Cell><Button size="small">Button</Button></Cell>
            </tr>
            <tr>
              <RowLabel>Default</RowLabel>
              <Cell><Button type="primary">Button</Button></Cell>
              <td />
              <Cell><Button>Button</Button></Cell>
            </tr>
            <tr>
              <RowLabel>Large</RowLabel>
              <Cell>
                <Button type="primary" size="large">Button</Button>
              </Cell>
              <td />
              <Cell><Button size="large">Button</Button></Cell>
            </tr>
          </tbody>
        </table>
      </div>
      <Divider style={{ margin: "28px 0 20px" }} />
      <Flex vertical gap={24}>
        <div>
          <SectionLabel>With Icons</SectionLabel>
          <Divider style={{ margin: "8px 0 16px" }} />
          <Flex wrap gap={8}>
            <Button type="primary" icon={<DownloadOutlined />}>Download</Button>
            <Button type="primary" icon={<UploadOutlined />}>Upload</Button>
            <Button icon={<EditOutlined />}>Edit</Button>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </Flex>
        </div>
      </Flex>
    </>
  );
}

function InputsContent() {
  return (
    <Flex vertical gap={24}>
      <div>
        <SectionLabel>Basic</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Input placeholder="Basic input" />
          <Input disabled value="This is disabled" />
          <SpecialInput size="small" />
        </Flex>
      </div>
      <div>
        <SectionLabel>Password</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Password placeholder="Password input" prefix={<LockOutlined />} />
          <Password
            placeholder="Custom toggle icons"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Flex>
      </div>
      <div>
        <SectionLabel>Search</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Search placeholder="Search anything…" allowClear enterButton />
          <Search
            placeholder="Search with button"
            enterButton={<Button type="primary" icon={<SearchOutlined />} />}
            size="large"
          />
        </Flex>
      </div>
      <div>
        <SectionLabel>Sizes</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Input size="large" placeholder="Large input" prefix={<UserOutlined />} />
          <Input placeholder="Default input" prefix={<UserOutlined />} />
          <Input size="small" placeholder="Small input" prefix={<UserOutlined />} />
        </Flex>
      </div>
      <div>
        <SectionLabel>Compact Group</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Space.Compact>
            <SpecialInput style={{ width: "15%" }} />
            <Input style={{ width: "70%" }} placeholder="Amount" />
          </Space.Compact>
        </Flex>
      </div>
    </Flex>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function ComponentShowcase() {
  const [active, setActive] = React.useState<SectionKey>("buttons");

  const contentMap: Record<SectionKey, React.ReactNode> = {
    buttons: <ButtonsContent />,
    inputs: <InputsContent />,
    table: <ShowcaseTable />,
    modal: <ShowcaseModal />,
    "radio-tab": <ShowcaseRadioTab />,
    scroll: <ShowcaseScroll />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: colors.gray[3] }}>
      {/* Sidebar */}
      <div
        style={{
          width: 240,
          flexShrink: 0,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          borderRight: `1px solid ${colors.gray[4]}`,
          background: colors.gray[2],
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: colors.gray[6],
            padding: "8px 12px 4px",
          }}
        >
          Components
        </Text>
        {sections.map((s) => (
          <div
            key={s.key}
            onClick={() => setActive(s.key)}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: active === s.key ? 600 : 400,
              color: active === s.key ? colors.brand[6] : colors.gray[8],
              background: active === s.key ? colors.brand[1] : colors.gray[1],
              border: `1px solid ${active === s.key ? colors.brand[3] : "transparent"}`,
              transition: "all 0.15s",
            }}
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 32, overflowY: "auto", background: colors.gray[1] }}>
        <Title level={3} style={{ marginBottom: 4 }}>
          {sections.find((s) => s.key === active)?.label}
        </Title>
        <Divider style={{ margin: "16px 0 24px" }} />
        {contentMap[active]}
      </div>
    </div>
  );
}

// ── Table data ─────────────────────────────────────────────────────────────

const tableData = Array.from({ length: 50 }, (_, i) => ({ key: i + 1 }));

const tableColumns = [
  {
    title: "No.",
    key: "no",
    width: 60,
    sorter: (a: { key: number }, b: { key: number }) => a.key - b.key,
    render: (_: unknown, __: unknown, index: number) => `${index + 1}`,
  },
  {
    title: "Table header",
    key: "select",
    sorter: true,
    render: () => (
      <Select
        size="small"
        suffixIcon={<DownOutlinedIcon />}
        style={{ width: "100%" }}
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
      />
    ),
  },
  {
    title: "Table header",
    key: "input",
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "Table header",
    key: "text",
    sorter: true,
    render: () => <span>Table cell text</span>,
  },
  {
    title: "Table header",
    key: "checkbox",
    width: 100,
    render: () => <Checkbox />,
  },
];

function ShowcaseTable() {
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);

  return (
    <Table
      bordered
      columns={tableColumns}
      dataSource={tableData}
      rowClassName={(record) =>
        selectedKeys.includes(record.key) ? "row-selected" : ""
      }
      onRow={(record) => ({
        onClick: () =>
          setSelectedKeys((prev) =>
            prev.includes(record.key)
              ? prev.filter((k) => k !== record.key)
              : [...prev, record.key],
          ),
        style: { cursor: "pointer" },
      })}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        placement: ["bottomCenter"],
      }}
      scroll={{ x: true }}
      size="small"
    />
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────

function ShowcaseModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Modal title"
        open={open}
        onCancel={() => setOpen(false)}
        styles={{
          header: {
            margin: "-20px -24px 0",
            padding: "16px 24px",
            borderBottom: "1px solid #E2E8F0",
          },
          body: { padding: "20px 0px" },
          footer: {
            margin: "0 -24px -20px",
            padding: "16px 24px",
            borderTop: "1px solid #E2E8F0",
          },
        }}
        footer={[
          <Button key="ok" type="primary" onClick={() => setOpen(false)}>
            Ok
          </Button>,
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Flex align="center" gap={20}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CloseCircleOutlined style={{ fontSize: 32, color: "#EF4444" }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
              This is title
            </div>
            <div style={{ color: "#64748B", fontSize: 14 }}>
              Place details here
            </div>
          </div>
        </Flex>
      </Modal>
    </>
  );
}

// ── Radio Tab ──────────────────────────────────────────────────────────────

const tabContent: Record<string, React.ReactNode> = {
  tab1: <ShowcaseTable />,
  tab2: (
    <Flex vertical gap={12}>
      <Input placeholder="Tab 2 — input content" />
      <Input placeholder="Another input" />
    </Flex>
  ),
  tab3: (
    <Flex gap={8}>
      <Button type="primary">Action A</Button>
      <Button>Action B</Button>
    </Flex>
  ),
};

function ShowcaseRadioTab() {
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
  );
}

// ── Scroll ─────────────────────────────────────────────────────────────────

const verticalItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
const horizontalItems = Array.from({ length: 30 }, (_, i) => `Card ${i + 1}`);

function ShowcaseScroll() {
  return (
    <Flex vertical gap={24}>
      <div>
        <SectionLabel>Vertical Scroll</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <div
          style={{
            height: 200,
            overflowY: "auto",
            border: `1px solid ${colors.gray[4]}`,
            borderRadius: 0,
          }}
        >
          {verticalItems.map((item) => (
            <div
              key={item}
              style={{
                padding: "8px 12px",
                borderBottom: `1px solid ${colors.gray[3]}`,
                color: colors.gray[8],
                fontSize: 14,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Horizontal Scroll</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <div
          style={{
            overflowX: "auto",
            border: `1px solid ${colors.gray[4]}`,
            padding: "12px",
          }}
        >
          <div style={{ display: "flex", gap: 8, width: "max-content" }}>
            {horizontalItems.map((item) => (
              <div
                key={item}
                style={{
                  width: 80,
                  height: 80,
                  background: colors.brand[1],
                  border: `1px solid ${colors.brand[3]}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: colors.brand[6],
                  flexShrink: 0,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Flex>
  );
}
