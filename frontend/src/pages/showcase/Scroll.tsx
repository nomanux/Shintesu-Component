import React from "react";
import { Divider, Flex } from "antd";
import { colors } from "../../theme";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";
import ExampleBlock from "./ExampleBlock";

export function ScrollGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Vertical scroll for long lists; horizontal scroll for wide content",
        "Custom scrollbars: 8px thick, gray-5 thumb, gray-6 on hover",
        "Always set a fixed height/width on the scroll container",
        'Add className="scroll-styled" to apply the design-system scrollbar',
        "Scrollbar styles are global — applied via ::-webkit-scrollbar in index.css",
      ]}
      whenToUse={[
        "Containing long content within a fixed area without page-level scroll",
        "Showing more cards/items than fit horizontally without wrapping",
        "Both axes when content can overflow in either direction",
      ]}
      whenNotToUse={[
        "On the page body itself — let the browser scrollbar do the work",
        "For paginated data — use Table pagination instead",
      ]}
    />
  );
}

const verticalItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
const horizontalItems = Array.from({ length: 30 }, (_, i) => `Card ${i + 1}`);
const bothItems = Array.from({ length: 40 }, (_, i) => `Cell ${i + 1}`);

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

export default function ScrollSection() {
  return (
    <Flex vertical gap={32}>
      {/* Usage */}
      <div>
        <SectionLabel>Usage</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
        <CodeBlock>{`// Apply overflowY/overflowX on a fixed-size container.
// Add className="scroll-styled" to get the design-system scrollbar.

<div
  className="scroll-styled"
  style={{ height: 200, overflowY: "auto" }}
>
  {items.map((item) => <div key={item}>{item}</div>)}
</div>`}</CodeBlock>
      </div>

      {/* Vertical Scroll */}
      <Variant
        label="Vertical Scroll"
        preview={
          <div
            className="scroll-styled"
            style={{
              height: 200,
              overflowY: "auto",
              border: `1px solid ${colors.gray[4]}`,
            }}
          >
            {verticalItems.map((item) => (
              <div
                key={item}
                style={{
                  padding: "8px 12px",
                  borderBottom: `1px solid ${colors.gray[3]}`,
                  color: colors.gray[8],
                  fontSize: 14,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        }
        code={`<div
  className="scroll-styled"
  style={{ height: 200, overflowY: "auto", border: "1px solid var(--gray-4)" }}
>
  {items.map((item) => (
    <div key={item} style={{ padding: "8px 12px", borderBottom: "1px solid var(--gray-3)" }}>
      {item}
    </div>
  ))}
</div>`}
      />

      {/* Horizontal Scroll */}
      <Variant
        label="Horizontal Scroll"
        preview={
          <div
            className="scroll-styled"
            style={{
              overflowX: "auto",
              border: `1px solid ${colors.gray[4]}`,
              padding: 12,
            }}
          >
            <div style={{ display: "flex", gap: 8, width: "max-content" }}>
              {horizontalItems.map((item) => (
                <div
                  key={item}
                  style={{
                    width: 80,
                    height: 80,
                    flexShrink: 0,
                    background: colors.brand[1],
                    border: `1px solid ${colors.brand[3]}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: colors.brand[6],
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
        code={`<div
  className="scroll-styled"
  style={{ overflowX: "auto", padding: 12, border: "1px solid var(--gray-4)" }}
>
  <div style={{ display: "flex", gap: 8, width: "max-content" }}>
    {items.map((item) => (
      <div key={item} style={{ width: 80, height: 80, flexShrink: 0 }}>
        {item}
      </div>
    ))}
  </div>
</div>`}
      />

      {/* Both Axes */}
      <Variant
        label="Both Axes"
        preview={
          <div
            className="scroll-styled"
            style={{
              width: "100%",
              height: 200,
              overflow: "auto",
              border: `1px solid ${colors.gray[4]}`,
              padding: 12,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 80px)",
                gap: 8,
                width: "max-content",
              }}
            >
              {bothItems.map((item) => (
                <div
                  key={item}
                  style={{
                    height: 60,
                    background: colors.brand[1],
                    border: `1px solid ${colors.brand[3]}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: colors.brand[6],
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        }
        code={`<div
  className="scroll-styled"
  style={{ height: 200, overflow: "auto", border: "1px solid var(--gray-4)" }}
>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 80px)", gap: 8, width: "max-content" }}>
    {items.map((item) => (
      <div key={item} style={{ height: 60 }}>{item}</div>
    ))}
  </div>
</div>`}
      />

    </Flex>
  );
}
