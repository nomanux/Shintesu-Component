import React from "react";
import { Form, Input, Select, Checkbox, Radio, Button, Divider, Flex } from "antd";
import { SectionLabel, VariantLabel, DownIcon } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

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

export const formGuidance = (
  <DeveloperGuidance
    bullets={[
      "Vertical layout: stacked label and field — best for narrow columns",
      "Inline layout: label and field aligned horizontally — best for filters",
      "Use a consistent label width (default 100px) so fields align across rows",
      "Mark required fields with rules and a star prefix on labels",
      "Submit button should show loading state while the request is in flight",
      "Form fields render at 50% width on desktop and 100% with scroll on mobile",
    ]}
    whenToUse={[
      "Collecting user input that will be submitted as a unit",
      "Multi-field configurations like settings panels and search filters",
    ]}
    whenNotToUse={[
      "For a single ad-hoc field — render Input directly without a Form wrapper",
    ]}
  />
);

function ValidationDemo() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = React.useState(false);

  const onFinish = () => {
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1500);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={FORM_LABEL_COL}
      wrapperCol={FORM_WRAPPER_COL}
      labelAlign="right"
      labelWrap
      size="small"
      onFinish={onFinish}
      requiredMark
    >
      <Form.Item
        label="LogonID"
        name="logonId"
        rules={[{ required: true, message: "Please enter your Logon ID" }]}
      >
        <Input placeholder="e.g. user.name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Enter a valid email" },
        ]}
      >
        <Input placeholder="name@example.com" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Password is required" },
          { min: 8, message: "At least 8 characters" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0 }}>
        <Flex gap={8}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Submit
          </Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}

export default function FormSection() {
  return (
    <Flex vertical gap={32}>
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
              <Select suffixIcon={<DownIcon />} options={systemOptions} />
            </Form.Item>
            <Form.Item label="Business Type selection">
              <Select suffixIcon={<DownIcon />} options={businessOptions} />
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
                suffixIcon={<DownIcon />}
                style={{ width: "100%" }}
                options={systemOptions}
              />
            </Form.Item>
          </Form>
        </div>
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Form layout="horizontal" labelCol={{ flex: "100px" }}>
  <Form.Item label="LogonID">
    <Input />
  </Form.Item>
</Form>

<Form layout="inline">
  <Form.Item label="LogonID" style={{ flex: 1 }}>
    <Input style={{ width: "100%" }} />
  </Form.Item>
</Form>`}</CodeBlock>
        </div>
      </div>

      <div>
        <SectionLabel>Validation &amp; Submit</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <div className="form-half-width">
          <ValidationDemo />
        </div>
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<Form.Item
  label="Email"
  name="email"
  rules={[
    { required: true, message: "Email is required" },
    { type: "email", message: "Enter a valid email" },
  ]}
>
  <Input />
</Form.Item>

<Button type="primary" htmlType="submit" loading={submitting}>
  Submit
</Button>`}</CodeBlock>
        </div>
      </div>

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
