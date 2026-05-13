import React from "react";
import { Button, Divider, Flex } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import AppModal from "../../components/AppModal";
import { colors } from "../../theme";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

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

/** Modal body — same content used across every size variant. */
function ModalBody() {
  return (
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
  );
}

/** Button that opens an AppModal at a given width. */
function ModalTrigger({
  label,
  width,
}: {
  label: string;
  width: number;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <AppModal
        title="Modal title"
        width={width}
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
        <ModalBody />
      </AppModal>
    </>
  );
}

/** Build a copy-paste-ready code snippet for a given component name + width. */
function snippet(componentName: string, width: number) {
  return `import React from "react";
import { Button, Flex } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import AppModal from "@/components/AppModal";

export function ${componentName}() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <AppModal
        title="Modal title"
        width={${width}}
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
          {/* icon + title + details */}
        </Flex>
      </AppModal>
    </>
  );
}`;
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

// One AppModal — change the \`width\` for different sizes:
// Small 400 · Default 520 · Large 720 · X-Large 900 · XX-Large 1160
export function ModalDefault() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <AppModal
        title="Modal title"
        width={520}
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
        {/* body */}
      </AppModal>
    </>
  );
}`}</CodeBlock>
      </div>

      {/* Small */}
      <Variant
        label="Small (400px)"
        preview={<ModalTrigger label="Open Small Modal" width={400} />}
        code={snippet("ModalSmall", 400)}
      />

      {/* Default */}
      <Variant
        label="Default (520px)"
        preview={<ModalTrigger label="Open Default Modal" width={520} />}
        code={snippet("ModalDefault", 520)}
      />

      {/* Large */}
      <Variant
        label="Large (720px)"
        preview={<ModalTrigger label="Open Large Modal" width={720} />}
        code={snippet("ModalLarge", 720)}
      />

      {/* X-Large */}
      <Variant
        label="X-Large (900px)"
        preview={<ModalTrigger label="Open X-Large Modal" width={900} />}
        code={snippet("ModalXLarge", 900)}
      />

      {/* XX-Large */}
      <Variant
        label="XX-Large (1160px)"
        preview={<ModalTrigger label="Open XX-Large Modal" width={1160} />}
        code={snippet("ModalXXLarge", 1160)}
      />
    </Flex>
  );
}
