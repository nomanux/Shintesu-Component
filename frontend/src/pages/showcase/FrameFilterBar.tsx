/**
 * FrameFilterBar — the search / import bar that sits above the table in the
 * Frame template (Figma node 307:25457 → "Sh Container").
 */

import { DatePicker, Input, Space } from "antd";
import { specialInputColors } from "../../theme";
import "./FrameFilterBar.scss";

function Field({
  label,
  labelWidth,
  children,
  grow,
}: {
  label: string;
  /** Fixed, right-aligned label column (left group). Omit for auto width. */
  labelWidth?: number;
  children: React.ReactNode;
  grow?: boolean;
}) {
  return (
    <div className={`ffb-field${grow ? " ffb-field--grow" : ""}`}>
      <label
        className={`ffb-label${labelWidth ? " ffb-label--aligned" : ""}`}
        style={labelWidth ? { width: labelWidth } : undefined}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function FrameFilterBar() {
  return (
    <div className="ffb">
      {/* Left: search fields */}
      <div className="ffb-left">
        <div className="ffb-row">
          <Field label="処理年月" labelWidth={100}>
            <DatePicker
              picker="month"
              size="small"
              placeholder=""
              style={{ width: 188 }}
            />
          </Field>
          <Field label="処理年月">
            <Space.Compact size="small">
              <Input
                size="small"
                style={{
                  width: 160,
                  background: specialInputColors.rims,
                  borderColor: specialInputColors.rimsBorder,
                }}
              />
              <Input size="small" disabled style={{ width: 240 }} />
            </Space.Compact>
          </Field>
        </div>
        <div className="ffb-row">
          <Field label="読込ファイル" labelWidth={100} grow>
            <Input size="small" />
          </Field>
        </div>
      </div>
    </div>
  );
}
