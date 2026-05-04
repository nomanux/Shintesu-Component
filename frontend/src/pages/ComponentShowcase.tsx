import {
  Button,
  Input,
  Space,
  Typography,
  Divider,
  Card,
  Flex,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea, Search, Password } = Input;

// Inline styles that simulate each button state for the showcase matrix
const primaryHoverStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#009B94",
  borderColor: "#009B94",
  border: "1px solid #009B94",
};
const defaultHoverStyle: React.CSSProperties = {
  backgroundColor: "#E2E8F0",
  color: "#060F1C",
  borderColor: "transparent",
  boxShadow: "none",
};

function ColHeader({ children }: { children: string }) {
  return (
    <th style={{ padding: "6px 12px", color: "#009B94", fontWeight: 400, fontSize: 13, textAlign: "center" }}>
      {children}
    </th>
  );
}
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
    <td style={{ paddingRight: 24, color: "#009B94", fontSize: 13, whiteSpace: "nowrap", verticalAlign: "middle" }}>
      {children}
    </td>
  );
}
function Cell({ children }: { children: React.ReactNode }) {
  return (
    <td style={{ padding: "10px 12px", textAlign: "center", verticalAlign: "middle" }}>
      {children}
    </td>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text type="secondary" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>
      {children}
    </Text>
  );
}

export default function ComponentShowcase() {
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>

        <Title level={2} style={{ marginBottom: 8 }}>
          Shintesu Component Showcase
        </Title>
        <Text type="secondary">Buttons &amp; Inputs</Text>

        {/* ── BUTTON MATRIX ── */}
        <Card style={{ marginTop: 32 }} title={<Title level={4}>Buttons</Title>}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th />
                  <GroupHeader span={3}>Primary</GroupHeader>
                  <th style={{ width: 24 }} />
                  <GroupHeader span={3}>Default</GroupHeader>
                </tr>
                <tr>
                  <th />
                  <ColHeader>Default</ColHeader>
                  <ColHeader>Hover</ColHeader>
                  <ColHeader>Disabled</ColHeader>
                  <th />
                  <ColHeader>Default</ColHeader>
                  <ColHeader>Hover</ColHeader>
                  <ColHeader>Disabled</ColHeader>
                </tr>
              </thead>
              <tbody>
                {/* SMALL */}
                <tr>
                  <RowLabel>Small</RowLabel>
                  <Cell><Button type="primary" size="small">Button</Button></Cell>
                  <Cell><Button type="primary" size="small" style={primaryHoverStyle}>Button</Button></Cell>
                  <Cell><Button type="primary" size="small" disabled>Button</Button></Cell>
                  <td />
                  <Cell><Button size="small">Button</Button></Cell>
                  <Cell><Button size="small" style={defaultHoverStyle}>Button</Button></Cell>
                  <Cell><Button size="small" disabled>Button</Button></Cell>
                </tr>
                {/* LARGE */}
                <tr>
                  <RowLabel>Large</RowLabel>
                  <Cell><Button type="primary" size="large">Button</Button></Cell>
                  <Cell><Button type="primary" size="large" style={primaryHoverStyle}>Button</Button></Cell>
                  <Cell><Button type="primary" size="large" disabled>Button</Button></Cell>
                  <td />
                  <Cell><Button size="large">Button</Button></Cell>
                  <Cell><Button size="large" style={defaultHoverStyle}>Button</Button></Cell>
                  <Cell><Button size="large" disabled>Button</Button></Cell>
                </tr>
                {/* DEFAULT */}
                <tr>
                  <RowLabel>Default</RowLabel>
                  <Cell><Button type="primary">Button</Button></Cell>
                  <Cell><Button type="primary" style={primaryHoverStyle}>Button</Button></Cell>
                  <Cell><Button type="primary" disabled>Button</Button></Cell>
                  <td />
                  <Cell><Button>Button</Button></Cell>
                  <Cell><Button style={defaultHoverStyle}>Button</Button></Cell>
                  <Cell><Button disabled>Button</Button></Cell>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional variants */}
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

            <div>
              <SectionLabel>Icon Only</SectionLabel>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Flex gap={8}>
                <Button type="primary" shape="circle" icon={<DownloadOutlined />} />
                <Button shape="circle" icon={<SearchOutlined />} />
              </Flex>
            </div>

            <div>
              <SectionLabel>Block</SectionLabel>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Flex vertical gap={8} style={{ maxWidth: 480 }}>
                <Button type="primary" block>Block Primary</Button>
                <Button block>Block Default</Button>
              </Flex>
            </div>
          </Flex>
        </Card>

        {/* ── INPUTS ── */}
        <Card style={{ marginTop: 24 }} title={<Title level={4}>Inputs</Title>}>
          <Flex vertical gap={24}>
            <div>
              <SectionLabel>Basic</SectionLabel>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Flex vertical gap={12}>
                <Input placeholder="Basic input" />
                <Input placeholder="With prefix icon" prefix={<UserOutlined />} />
                <Input
                  placeholder="With suffix icon"
                  suffix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                />
                <Input
                  placeholder="Prefix + suffix"
                  prefix={<UserOutlined />}
                  suffix={<PhoneOutlined style={{ color: "#bfbfbf" }} />}
                />
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
              <SectionLabel>States</SectionLabel>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Flex vertical gap={12}>
                <Input placeholder="Disabled input" disabled />
                <Input placeholder="Read only" readOnly defaultValue="Read only value" />
                <Input status="error" placeholder="Error state" />
                <Input status="warning" placeholder="Warning state" />
              </Flex>
            </div>

            <div>
              <SectionLabel>Textarea</SectionLabel>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Flex vertical gap={12}>
                <TextArea rows={3} placeholder="Basic textarea" />
                <TextArea
                  rows={4}
                  placeholder="Auto resize (max 6 rows)"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
                <TextArea showCount maxLength={100} placeholder="With character count" />
              </Flex>
            </div>

            <div>
              <SectionLabel>Compact Group</SectionLabel>
              <Divider style={{ margin: "8px 0 16px" }} />
              <Flex vertical gap={12}>
                <Space.Compact>
                  <Input style={{ width: "20%" }} defaultValue="https://" readOnly />
                  <Input style={{ width: "80%" }} placeholder="domain.com" />
                </Space.Compact>
                <Space.Compact>
                  <Input style={{ width: "15%" }} defaultValue="$" readOnly />
                  <Input style={{ width: "70%" }} placeholder="Amount" />
                  <Input style={{ width: "15%" }} defaultValue=".00" readOnly />
                </Space.Compact>
              </Flex>
            </div>
          </Flex>
        </Card>

      </div>
    </div>
  );
}
