import { Divider, Flex } from "antd";
import { colors } from "../../theme";
import { SectionLabel } from "./helpers";
import DeveloperGuidance from "./DeveloperGuidance";
import CodeBlock from "./CodeBlock";

const verticalItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
const horizontalItems = Array.from({ length: 30 }, (_, i) => `Card ${i + 1}`);

export function ScrollGuidance() {
  return (
    <DeveloperGuidance
      bullets={[
        "Vertical scroll for long lists; horizontal scroll for wide content",
        "Custom scrollbars: 8px thick, gray-5 thumb, gray-4 on hover",
        "Always set a fixed height/width on the scroll container",
        "Scrollbar styles are global — applied via ::-webkit-scrollbar in index.css",
      ]}
      whenToUse={[
        "Containing long content within a fixed area without page-level scroll",
        "Showing more cards/items than fit horizontally without wrapping",
      ]}
      whenNotToUse={[
        "On the page body itself — let the browser scrollbar do the work",
        "For paginated data — use Table pagination instead",
      ]}
    />
  );
}

export default function ScrollSection() {
  return (
    <Flex vertical gap={24}>
      <div>
        <SectionLabel>Vertical Scroll</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
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
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<div style={{ height: 200, overflowY: "auto", border: "1px solid var(--gray-4)" }}>
  {items.map((item) => (
    <div key={item}>{item}</div>
  ))}
</div>`}</CodeBlock>
        </div>
      </div>

      <div>
        <SectionLabel>Horizontal Scroll</SectionLabel>
        <Divider style={{ margin: "8px 0 16px" }} />
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
        <div style={{ marginTop: 16 }}>
          <CodeBlock>{`<div style={{ overflowX: "auto" }}>
  <div style={{ display: "flex", gap: 8, width: "max-content" }}>
    {items.map((item) => <Card key={item}>{item}</Card>)}
  </div>
</div>`}</CodeBlock>
        </div>
      </div>
    </Flex>
  );
}
