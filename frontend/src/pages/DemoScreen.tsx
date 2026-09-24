/**
 * DemoScreen — full-page Frame UI
 * Shows the real application shell with no showcase chrome around it.
 * Navigate here from the Frame section in the showcase.
 */

import React from "react";
import { Button } from "antd";
import { AppModal } from "../components";
import FrameTemplate from "./showcase/FrameTemplate";
import { modalWidth } from "../theme";

type Props = { onBack?: () => void };

export default function DemoScreen({ onBack }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <FrameTemplate
        fullScreen
        onSave={() => setModalOpen(true)}
        headerExtra={
          onBack && (
            <Button size="small" onClick={onBack}>
              ← Back to Showcase
            </Button>
          )
        }
      />

      {/* ── Confirm modal ─────────────────────────────────────────────── */}
      <AppModal
        title="Confirm"
        width={modalWidth.sm}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key="ok"
            size="small"
            type="primary"
            onClick={() => setModalOpen(false)}
          >
            OK
          </Button>,
          <Button key="cancel" size="small" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        <p style={{ margin: 0, fontSize: 14, color: "var(--gray-8)" }}>
          Are you sure you want to save your changes?
        </p>
      </AppModal>
    </>
  );
}
