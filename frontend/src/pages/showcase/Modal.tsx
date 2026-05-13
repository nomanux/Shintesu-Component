import React from "react";
import { Button, Divider, Flex } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import AppModal from "../../components/AppModal";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

export function ModalGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Use AppModal for custom dialog content (forms, multi-step flows)",
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
}

/** Section label + divider + ExampleBlock — one variant per block. */
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

/** Trigger + AppModal pair — shared shell for previews. */
function ModalTrigger({
  triggerLabel,
  modalTitle,
  children,
}: {
  triggerLabel: string;
  modalTitle: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <AppModal
        title={modalTitle}
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
        {children}
      </AppModal>
    </>
  );
}

export default function ModalSection() {
  return (
    <Flex vertical gap={32}>
      {/* Usage */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`import React from "react";
import { Button } from "antd";
import AppModal from "@/components/AppModal";

export function ModalDefault() {
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
        Body content goes here.
      </AppModal>
    </>
  );
}`}</CodeBlock>
      </div>

      {/* Default */}
      <Variant
        label="Default"
        preview={
          <ModalTrigger triggerLabel="Open Modal" modalTitle="Modal title">
            <p style={{ margin: 0 }}>
              Place your modal body content here. Keep it focused on a single
              decision or task.
            </p>
          </ModalTrigger>
        }
        code={`import React from "react";
import { Button } from "antd";
import AppModal from "@/components/AppModal";

export function ModalDefault() {
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
        <p>Place your modal body content here.</p>
      </AppModal>
    </>
  );
}`}
      />

      {/* With Icon (error/destructive style) */}
      <Variant
        label="With Icon"
        preview={
          <ModalTrigger
            triggerLabel="Open Error Modal"
            modalTitle="Modal title"
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
                <div
                  style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}
                >
                  This is title
                </div>
                <div style={{ color: "#64748B", fontSize: 14 }}>
                  Place details here
                </div>
              </div>
            </Flex>
          </ModalTrigger>
        }
        code={`import React from "react";
import { Button, Flex } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import AppModal from "@/components/AppModal";

export function ModalWithIcon() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Error Modal
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
    </>
  );
}`}
      />
    </Flex>
  );
}
