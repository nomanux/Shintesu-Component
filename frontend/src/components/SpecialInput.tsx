import React, { useState } from "react";
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
  ...props
}: SpecialInputProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { height, padding, fontSize } = sizeMap[size];

  return (
    <input
      {...props}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
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
        ...style,
      }}
    />
  );
}
