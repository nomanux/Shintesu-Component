import React from "react";
import { Button, Divider, Flex } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import AppModal from "../../components/AppModal";
import { colors } from "../../theme";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

export function ModalGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "One AppModal is used across the entire app — only the width changes per use case",
        "Always include a clear title and at least one primary action button",
        "Keep body content focused — one purpose per modal, no nested workflows",
      ]}
      whenToUse={[
        "Confirming a destructive or irreversible action before proceeding",
        "Collecting a small form's input without leaving the current page",
      ]}
      whenNotToUse={[
        "For more than 5 form fields — use a dedicated page or drawer instead",
        "For page-level navigation — use a separate route",
      ]}
    />
  );
}

const SIZE_VARIANTS = [
  { label: "Small",   width: 400 },
  { label: "Default", width: 520 },
  { label: "Large",   width: 720 },
  { label: "X-Large", width: 900 },
];

export default function ModalSection() {
  const [width, setWidth] = React.useState<number | null>(null);
  const open = width !== null;
  const close = () => setWidth(null);

  return (
    <Flex vertical gap={32}>
      <div>
        <SectionLabel>Sizes</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />

        <Flex gap={8}>
          {SIZE_VARIANTS.map((v) => (
            <Button
              key={v.label}
              type={v.label === "Default" ? "primary" : "default"}
              onClick={() => setWidth(v.width)}
            >
              {v.label} — {v.width}px
            </Button>
          ))}
        </Flex>

        <AppModal
          title="Modal title"
          width={width ?? 520}
          open={open}
          onCancel={close}
          footer={[
            <Button key="ok" type="primary" onClick={close}>
              Ok
            </Button>,
            <Button key="cancel" onClick={close}>
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
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  marginBottom: 4,
                  color: colors.gray[9],
                }}
              >
                Confirm action
              </div>
              <div style={{ color: colors.gray[7], fontSize: 14 }}>
                Are you sure you want to proceed? This action cannot be undone.
              </div>
            </div>
          </Flex>
        </AppModal>

        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`// Change only the width — everything else stays the same.
// Presets: 400 (small), 520 (default), 720 (large)

<AppModal
  title="Modal title"
  width={520}
  open={open}
  onCancel={() => setOpen(false)}
  footer={[
    <Button key="ok" type="primary" onClick={onOk}>Ok</Button>,
    <Button key="cancel" onClick={() => setOpen(false)}>Cancel</Button>,
  ]}
>
  {/* body content */}
"cascel" onClick={() => setOpen(false)}>Cancel</Button>,
  ]}
>
  {/* body */}
</AppModal>`}</CodeBlock>
        </div>
      </div>
    </Flex>
  );
}
