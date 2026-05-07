/**
 * ComponentShowcase
 *
 * Developer reference page for all Shintesu design-system components.
 * Each section is self-contained — its data, types, and component live
 * together so the file reads top-to-bottom without jumping around.
 *
 * Sidebar sections (in order):
 *   Buttons · Inputs · Form · Table · Modal · Radio Tab · Scroll
 */

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
  Radio,
  Form,
  theme,
} from "antd";
import { colors } from "../theme";
import {
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
import AppModal from "../components/AppModal";

// ── Local icons & typography ──────────────────────────────────────────────────

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
const { Password } = Input;

// ── Shared helper components ──────────────────────────────────────────────────

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

/** Small uppercase label used above every sub-section. */
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

/** Tiny numbered label used inside a section to distinguish variants. */
function VariantLabel({
  children,
  style,
}: {
  children: string;
  style?: React.CSSProperties;
}) {
  return (
    <Text
      style={{
        fontSize: 12,
        color: colors.gray[6],
        display: "block",
        ...style,
      }}
    >
      {children}
    </Text>
  );
}

/** Developer guidance box for section-specific instructions. */
function DeveloperGuidance({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "12px 16px",
        marginBottom: "24px",
        backgroundColor: "#F0F9FF",
        border: "1px solid #E0F2FE",
        borderRadius: "4px",
        fontSize: "13px",
        lineHeight: "1.6",
        color: colors.gray[8],
      }}
    >
      <strong style={{ color: colors.brand[6], marginRight: "8px" }}>👨‍💻 For Developers:</strong>
      {children}
    </div>
  );
}

// ── Section: Buttons ─────────────────────────────────────────────────────────

function ButtonsContent() {
  return (
    <Flex vertical gap={24}>
      {/* Size & state matrix */}
      <div>
        <SectionLabel>Sizes &amp; States</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
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
      </div>

      {/* Icon buttons */}
      <div>
        <SectionLabel>With Icons</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
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
      </div>
    </Flex>
  );
}

// ── Section: Inputs ──────────────────────────────────────────────────────────

function InputsContent() {
  return (
    <Flex vertical gap={24}>
      {/* Basic */}
      <div>
        <SectionLabel>Basic</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Input />
          <Input disabled value="This is disabled" />
          <SpecialInput />
        </Flex>
      </div>

      {/* Password */}
      <div>
        <SectionLabel>Password</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Password prefix={<LockOutlined />} />
          <Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Flex>
      </div>

      {/* Sizes */}
      <div>
        <SectionLabel>Sizes</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Input size="large" prefix={<UserOutlined />} />
          <Input prefix={<UserOutlined />} />
          <Input size="small" prefix={<UserOutlined />} />
        </Flex>
      </div>

      {/* Compact group */}
      <div>
        <SectionLabel>Compact Group</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Space.Compact>
          <SpecialInput style={{ width: "30%" }} />
          <Input style={{ width: "70%" }} />
        </Space.Compact>
      </div>
    </Flex>
  );
}

// ── Section: Form ────────────────────────────────────────────────────────────

const FORM_LABEL_COL = { flex: "100px" };
const FORM_WRAPPER_COL = { flex: 1 };

const systemOptions = [
  { value: "sys1", label: "System 1" },
  { value: "sys2", label: "System 2" },
];

const businessOptions = [
  { value: "biz1", label: "Business 1" },
  { value: "biz2", label: "Business 2" },
];

function FormContent() {
  return (
    <Flex vertical gap={32}>
      {/* Form Fields — vertical + inline variants */}
      <div>
        <SectionLabel>Form Fields</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        <VariantLabel>1. Vertical</VariantLabel>
        <div className="form-half-width">
          <Form
            layout="horizontal"
            labelCol={FORM_LABEL_COL}
            wrapperCol={FORM_WRAPPER_COL}
            labelAlign="right"
            labelWrap
            size="small"
            style={{ marginTop: 8 }}
          >
            <Form.Item label="LogonID">
              <Input />
            </Form.Item>
            <Form.Item label="PassWord">
              <Input.Password />
            </Form.Item>
            <Form.Item label="System Type">
              <Select
                suffixIcon={<DownOutlinedIcon />}
                options={systemOptions}
              />
            </Form.Item>
            <Form.Item label="Business Type selection">
              <Select
                suffixIcon={<DownOutlinedIcon />}
                options={businessOptions}
              />
            </Form.Item>
          </Form>
        </div>
        <VariantLabel style={{ marginTop: 40 }}>2. Inline</VariantLabel>
        <div className="form-half-width">
          <Form
            layout="inline"
            size="small"
            style={{ marginTop: 8, width: "100%" }}
          >
            <Form.Item label="LogonID" style={{ flex: 1 }}>
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="PassWord" style={{ flex: 1 }}>
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Select" style={{ flex: 1 }}>
              <Select
                suffixIcon={<DownOutlinedIcon />}
                style={{ width: "100%" }}
                options={systemOptions}
              />
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Label with Checkbox */}
      <div>
        <SectionLabel>Label with Checkbox</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Form
          layout="horizontal"
          labelCol={FORM_LABEL_COL}
          wrapperCol={FORM_WRAPPER_COL}
          labelAlign="right"
          size="small"
        >
          <Form.Item label="Accept Terms">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Subscribe">
            <Checkbox>Receive updates</Checkbox>
          </Form.Item>
        </Form>
      </div>

      {/* Label with Radio */}
      <div>
        <SectionLabel>Label with Radio</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Form
          layout="horizontal"
          labelCol={FORM_LABEL_COL}
          wrapperCol={FORM_WRAPPER_COL}
          labelAlign="right"
          size="small"
        >
          <Form.Item label="Gender">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Priority">
            <Radio.Group>
              <Radio value="low">Low</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="high">High</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Flex>
  );
}

// ── Section: Table ───────────────────────────────────────────────────────────

const tableData = Array.from({ length: 50 }, (_, i) => ({ key: i + 1 }));

const BASE_COLUMNS = [
  {
    title: "No.",
    key: "no",
    defaultWidth: 60,
    sorter: (a: { key: number }, b: { key: number }) => a.key - b.key,
    render: (_: unknown, __: unknown, index: number) => `${index + 1}`,
  },
  {
    title: "Table header",
    key: "select",
    defaultWidth: 160,
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
    defaultWidth: 160,
    sorter: true,
    render: () => <Input size="small" />,
  },
  {
    title: "Table header",
    key: "text",
    defaultWidth: 160,
    sorter: true,
    render: () => <span>Table cell text</span>,
  },
  {
    title: "Table header",
    key: "checkbox",
    defaultWidth: 100,
    render: () => <Checkbox />,
  },
];

/**
 * Custom header cell — supports:
 *   • Resize: drag the right edge to change column width
 *   • Reorder: drag the header itself to swap column positions
 */
function TableHeaderCell({
  colKey,
  onResizeStart,
  onDragStart,
  onDragOver,
  onDrop,
  children,
  ...rest
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  colKey?: string;
  onResizeStart?: (startX: number) => void;
  onDragStart?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
  onDrop?: React.DragEventHandler;
}) {
  if (!colKey) return <th {...rest}>{children}</th>;

  return (
    <th
      {...rest}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{ ...rest.style, position: "relative", userSelect: "none", cursor: "grab" }}
    >
      {children}
      {/* Resize handle — thin right edge */}
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 6,
          cursor: "col-resize",
          zIndex: 1,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart?.(e.clientX);
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </th>
  );
}

function ShowcaseTable() {
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>([]);

  // Column order (keys)
  const [order, setOrder] = React.useState(() => BASE_COLUMNS.map((c) => c.key));

  // Column widths
  const [widths, setWidths] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(BASE_COLUMNS.map((c) => [c.key, c.defaultWidth])),
  );

  const dragKey = React.useRef<string | null>(null);

  const startResize = (key: string, startX: number) => {
    const startW = widths[key];
    const onMove = (e: MouseEvent) => {
      setWidths((prev) => ({ ...prev, [key]: Math.max(60, startW + e.clientX - startX) }));
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const columns = order.map((key) => {
    const col = BASE_COLUMNS.find((c) => c.key === key)!;
    return {
      ...col,
      width: widths[key],
      onHeaderCell: () => ({
        colKey: key,
        onResizeStart: (x: number) => startResize(key, x),
        onDragStart: (e: React.DragEvent) => {
          dragKey.current = key;
          e.dataTransfer.effectAllowed = "move";
        },
        onDragOver: (e: React.DragEvent) => e.preventDefault(),
        onDrop: () => {
          if (!dragKey.current || dragKey.current === key) return;
          setOrder((prev) => {
            const from = prev.indexOf(dragKey.current!);
            const to = prev.indexOf(key);
            const next = [...prev];
            next.splice(from, 1);
            next.splice(to, 0, dragKey.current!);
            return next;
          });
          dragKey.current = null;
        },
      }),
    };
  });

  return (
    <Table
      bordered
      size="small"
      components={{ header: { cell: TableHeaderCell } }}
      columns={columns}
      dataSource={tableData}
      scroll={{ x: true }}
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
    />
  );
}

// ── Section: Modal ───────────────────────────────────────────────────────────

function ShowcaseModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <AppModal
        title="Modal title"
        open={open}
        onCancel={() => setOpen(false)}
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
      </AppModal>
    </>
  );
}

// ── Section: Radio Tab ───────────────────────────────────────────────────────

const tabContent: Record<string, React.ReactNode> = {
  tab1: <ShowcaseTable />,
  tab2: (
    <Flex vertical gap={12}>
      <Input />
      <Input />
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
      {/* Tab bar */}
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

      {/* Tab panel — sits in front of the tab bar to erase its bottom border */}
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

// ── Section: Scroll ──────────────────────────────────────────────────────────

const verticalItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
const horizontalItems = Array.from({ length: 30 }, (_, i) => `Card ${i + 1}`);

function ShowcaseScroll() {
  return (
    <Flex vertical gap={24}>
      {/* Vertical scroll */}
      <div>
        <SectionLabel>Vertical Scroll</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <div
          style={{
            height: 200,
            overflowY: "auto",
            border: `1px solid ${colors.gray[4]}`,
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

      {/* Horizontal scroll */}
      <div>
        <SectionLabel>Horizontal Scroll</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <div
          style={{
            overflowX: "auto",
            border: `1px solid ${colors.gray[4]}`,
            padding: 12,
          }}
        >
          <div style={{ display: "flex", gap: 8, width: "max-content" }}>
            {horizontalItems.map((item) => (
              <div
                key={item}
                style={{
                  width: 80,
                  height: 80,
                  flexShrink: 0,
                  background: colors.brand[1],
                  border: `1px solid ${colors.brand[3]}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: colors.brand[6],
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

// ── Navigation config ────────────────────────────────────────────────────────

const sections = [
  { key: "buttons", label: "Buttons" },
  { key: "inputs", label: "Inputs" },
  { key: "form", label: "Form" },
  { key: "table", label: "Table" },
  { key: "modal", label: "Modal" },
  { key: "radio-tab", label: "Radio Button (Tab)" },
  { key: "scroll", label: "Scroll" },
] as const;

type SectionKey = (typeof sections)[number]["key"];

// ── Developer guidance for each section ──────────────────────────────────────

const guidanceMap: Record<SectionKey, React.ReactNode> = {
  buttons: (
    <ul style={{ margin: 0, paddingLeft: 20 }}>
      <li>Primary buttons for main actions; default buttons for secondary actions</li>
      <li>Always consider size (small, middle, large) when implementing</li>
      <li>Consider disabled state — primary disabled shows brand-4 background</li>
      <li>Button minimum width is 110px (except for icon-only buttons)</li>
      <li>Icons can be added to buttons for visual clarity</li>
    </ul>
  ),
  inputs: (
    <ul style={{ margin: 0, paddingLeft: 20 }}>
      <li>Regular Input for standard text entry</li>
      <li>Password input for sensitive data with visibility toggle</li>
      <li>SpecialInput for special cases (e.g., click-to-edit, double-click modal)</li>
      <li>Support three sizes: small (24px), middle (32px), large (40px)</li>
      <li>Add icons as prefixes for better visual context</li>
      <li>Disabled inputs use default cursor instead of not-allowed</li>
    </ul>
  ),
  form: (
    <ul style={{ margin: 0, paddingLeft: 20 }}>
      <li>Vertical layout: labels and fields stack on top of each other</li>
      <li>Inline layout: labels and fields align horizontally</li>
      <li>Use consistent label widths (typically 100px) for visual alignment</li>
      <li>Combine with Input, Select, Checkbox, and Radio components</li>
      <li>Keep form fields at 50% width on desktop, 100% with scroll on mobile</li>
      <li>Use label alignment options (left/right) to match design requirements</li>
    </ul>
  ),
  table: (
    <ul style={{ margin: 0, paddingLeft: 20 }}>
      <li>Click rows to select/deselect (selected rows highlight in brand color)</li>
      <li>Drag column headers left/right to reorder columns</li>
      <li>Drag column edges (right side) to resize column widths</li>
      <li>All columns are sortable by default with visual indicators</li>
      <li>Use pagination for large datasets (10 items per page shown)</li>
      <li>Supports embedded components (Select, Input, Checkbox) in cells</li>
    </ul>
  ),
  modal: (
    <ul style={{ margin: 0, paddingLeft: 20 }}>
      <li>Use modals to interrupt user flow for critical information</li>
      <li>Include clear, descriptive title</li>
      <li>Keep body content concise and focused</li>
      <li>Always provide action buttons (typically Ok/Cancel or Yes/No)</li>
      <li>Use custom header and footer styling for consistency</li>
      <li>Consider icon + color combination for message severity</li>
    </ul>
  ),
  "radio-tab": (
    <ul style={{ margin: 0, paddingLeft: 20 }}>
      <li>Radio buttons styled as tabs for visual tab interface</li>
      <li>Active tab displays teal bottom border connected to panel</li>
      <li>Each tab can contain different content (tables, forms, buttons)</li>
      <li>Use for switching between related content sections</li>
      <li>Panel sits in front of tab bar to create seamless appearance</li>
      <li>Supports small and middle sizes for compact layouts</li>
    </ul>
  ),
  scroll: (
    <ul style={{ margin: 0, paddingLeft: 20 }}>
      <li>Vertical scroll: Use for long lists of items</li>
      <li>Horizontal scroll: Use for wide content that doesn't fit viewport</li>
      <li>Custom scrollbar styling: 8px width/height with gray colors</li>
      <li>Scrollbar thumb changes color on hover for better visibility</li>
      <li>Always specify container height/width to trigger scrolling</li>
      <li>Works seamlessly with global theme scrollbar styles</li>
    </ul>
  ),
};

// ── Main layout (default export) ─────────────────────────────────────────────

export default function ComponentShowcase() {
  const [active, setActive] = React.useState<SectionKey>("buttons");

  const contentMap: Record<SectionKey, React.ReactNode> = {
    buttons: <ButtonsContent />,
    inputs: <InputsContent />,
    form: <FormContent />,
    table: <ShowcaseTable />,
    modal: <ShowcaseModal />,
    "radio-tab": <ShowcaseRadioTab />,
    scroll: <ShowcaseScroll />,
  };

  return (
    <div className="showcase-layout">
      {/* ── Sidebar navigation ── */}
      <div className="showcase-sidebar">
        <Text className="showcase-sidebar-label">Components</Text>
        {sections.map((s) => (
          <div
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`showcase-nav-item${active === s.key ? " active" : ""}`}
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* ── Section content ── */}
      <div className="showcase-content">
        <Title level={3} style={{ marginBottom: 4 }}>
          {sections.find((s) => s.key === active)?.label}
        </Title>
        <Divider style={{ margin: "16px 0 24px" }} />
        <DeveloperGuidance>{guidanceMap[active]}</DeveloperGuidance>
        {contentMap[active]}
      </div>
    </div>
  );
}
