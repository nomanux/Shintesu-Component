import React from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd";

const modalStyles: ModalProps["styles"] = {
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
};

export default function AppModal({ children, ...props }: ModalProps) {
  return (
    <Modal styles={modalStyles} {...props}>
      {children}
    </Modal>
  );
}
