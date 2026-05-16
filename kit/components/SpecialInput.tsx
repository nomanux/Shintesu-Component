import React, { useState, useRef } from "react";
import { Input, Button } from "antd";
import AppModal from "./AppModal";
import { specialInputColors, colors } from "../theme";

const sizeMap = {
  small: { height: 24, padding: "0 7px", fontSize: 14 },
  middle: { height: 32, padding: "0 11px", fontSize: 14 },
  large: { height: 40, padding: "0 11px", fontSize: 16 },
};

type SpecialInputSize = "small" | "middle" | "large";
type SpecialInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  size?: SpecialInputSize;
};

export default function SpecialInput({
  size = "middle",
  style,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  value,
  onChange,
  ...props
}: SpecialInputProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { height, padding, fontSize } = sizeMap[size];

  const handleClick = () => {
    if (clickTimer.current) return;
    clickTimer.current = setTimeout(() => {
      clickTimer.current = null;
      setEditable(true);
    }, 220);
  };

  const handleDoubleClick = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    setModalValue(String(value ?? ""));
    setOpen(true);
  };

  const handleOk = () => {
    const syntheticEvent = {
      target: { value: modalValue },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
    setOpen(false);
  };

  return (
    <>
      <input
        {...props}
        value={value}
        onChange={onChange}
        readOnly={!editable}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          setEditable(false);
          onBlur?.(e);
        }}
        onMouseEnter={(e) => {
          setHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          onMouseLeave?.(e);
        }}
        style={{
          height,
          padding,
          fontSize,
          boxSizing: "border-box",
          fontFamily: "inherit",
          width: "100%",
          background: specialInputColors.rims,
          border: `1px solid ${focused || hovered ? colors.brand[5] : specialInputColors.rimsBorder}`,
          outline: "none",
          cursor: editable ? "text" : "pointer",
          ...style,
        }}
      />
      <AppModal
        title="Modal title"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Ok
          </Button>,
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Input
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
          onPressEnter={handleOk}
          autoFocus
        />
      </AppModal>
    </>
  );
}
