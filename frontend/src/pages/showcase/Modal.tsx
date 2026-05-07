import React from "react";
import { Button, Divider, Flex, Modal } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AppModal from "../../components/AppModal";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

export const modalGuidance = (
  <DeveloperGuidance
    bullets={[
      "Use AppModal for custom dialog content (forms, multi-step flows)",
      "Use Modal.confirm/info/success/warning/error for one-off prompts",
      "Always include a clear title and a primary action button",
      "Keep body content focused — push edge cases to a follow-up screen",
      "Match icon and color to the message severity (red/green/blue/yellow)",
    ]}
    whenToUse={[
      "Confirming a destructive or irreversible action",
      "Surfacing critical info that blocks further interaction",
      "Capturing a small focused input without leaving the current page",
    ]}
    whenNotToUse={[
      "For non-blocking notifications — use the toast/message API",
      "For complex multi-page forms — open a full page or drawer",
    ]}
  />
);

export default function ModalSection() {
  const [open, setOpen] = React.useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const showConfirm = () =>
    modal.confirm({
      title: "Delete this item?",
      icon: <QuestionCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
    });

  const showInfo = () =>
    modal.info({
      title: "Heads up",
      icon: <InfoCircleOutlined />,
      content: "Your session will expire in 5 minutes.",
    });

  const showSuccess = () =>
    modal.success({
      title: "Saved",
      icon: <CheckCircleOutlined />,
      content: "Your changes have been saved successfully.",
    });

  const showWarning = () =>
    modal.warning({
      title: "Heads up",
      icon: <ExclamationCircleOutlined />,
      content: "You have unsaved changes that will be lost.",
    });

  const showError = () =>
    modal.error({
      title: "Something went wrong",
      icon: <CloseCircleOutlined />,
      content: "We couldn't save your changes. Please try again.",
    });

  return (
    <Flex vertical gap={32}>
      {contextHolder}

      <div>
        <SectionLabel>Custom Modal (AppModal)</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
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
              <CloseCircleOutlined
                style={{ fontSize: 32, color: "#EF4444" }}
              />
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

        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<AppModal
  title="Modal title"
  open={open}
  onCancel={() => setOpen(false)}
  footer={[
    <Button key="ok" type="primary" onClick={onOk}>Ok</Button>,
    <Button key="cancel" onClick={() => setOpen(false)}>Cancel</Button>,
  ]}
>
  {/* body */}
</AppModal>`}</CodeBlock>
        </div>
      </div>

      <div>
        <SectionLabel>Variants</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <Flex gap={8} wrap>
          <Button onClick={showConfirm}>Confirm</Button>
          <Button onClick={showInfo}>Info</Button>
          <Button onClick={showSuccess}>Success</Button>
          <Button onClick={showWarning}>Warning</Button>
          <Button onClick={showError}>Error</Button>
        </Flex>
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`const [modal, contextHolder] = Modal.useModal();

modal.confirm({
  title: "Delete this item?",
  content: "This action cannot be undone.",
  okText: "Delete",
  okType: "danger",
});

modal.info({ title: "Heads up", content: "..." });
modal.success({ title: "Saved", content: "..." });
modal.warning({ title: "Heads up", content: "..." });
modal.error({ title: "Failed", content: "..." });`}</CodeBlock>
        </div>
      </div>
    </Flex>
  );
}
