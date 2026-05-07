import { Input, Space, Divider, Flex } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import SpecialInput from "../../components/SpecialInput";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

const { Password } = Input;

export const inputsGuidance = (
  <DeveloperGuidance
    bullets={[
      "Regular Input for standard text entry",
      "Password input toggles visibility via iconRender",
      "SpecialInput supports click-to-edit and double-click-to-modal patterns",
      "Three sizes: small (24px), middle (32px, default), large (40px)",
      "Use prefix icons to reinforce field meaning (user, lock, search)",
      "Disabled inputs show default cursor — not the OS not-allowed icon",
    ]}
    whenToUse={[
      "Single-line free-text entry where the value is unconstrained",
      "Password fields when entering sensitive data",
      "SpecialInput when a field has both a quick-edit and a full-edit mode",
    ]}
    whenNotToUse={[
      "For multi-line text — use Input.TextArea",
      "When the value is from a fixed list — use Select",
      "For numbers with stepper UX — use InputNumber",
    ]}
  />
);

export default function InputsSection() {
  return (
    <Flex vertical gap={24}>
      <div>
        <SectionLabel>Basic</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Input placeholder="Enter text" />
          <Input disabled value="This is disabled" />
          <SpecialInput />
        </Flex>
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Input placeholder="Enter text" />
<Input disabled value="This is disabled" />
<SpecialInput />`}</CodeBlock>
        </div>
      </div>

      <div>
        <SectionLabel>Password</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Password prefix={<LockOutlined />} placeholder="Password" />
          <Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            placeholder="Toggle visibility"
          />
        </Flex>
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Input.Password prefix={<LockOutlined />} />
<Input.Password
  iconRender={(visible) =>
    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
  }
/>`}</CodeBlock>
        </div>
      </div>

      <div>
        <SectionLabel>Sizes</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex vertical gap={12}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Large" />
          <Input prefix={<UserOutlined />} placeholder="Middle (default)" />
          <Input size="small" prefix={<UserOutlined />} placeholder="Small" />
        </Flex>
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Input size="large" prefix={<UserOutlined />} />
<Input prefix={<UserOutlined />} />
<Input size="small" prefix={<UserOutlined />} />`}</CodeBlock>
        </div>
      </div>

      <div>
        <SectionLabel>Compact Group</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Space.Compact>
          <SpecialInput style={{ width: "30%" }} />
          <Input style={{ width: "70%" }} />
        </Space.Compact>
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Space.Compact>
  <SpecialInput style={{ width: "30%" }} />
  <Input style={{ width: "70%" }} />
</Space.Compact>`}</CodeBlock>
        </div>
      </div>
    </Flex>
  );
}
