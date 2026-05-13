import React from "react";
import CodeBlock from "./CodeBlock";

type Props = {
  preview: React.ReactNode;
  code: string;
  /** Optional initial tab — defaults to "preview". */
  defaultTab?: "preview" | "code";
};

/**
 * shadcn-style Preview / Code tabbed card. Wrap any example with the live
 * preview as `preview` and the snippet as `code`.
 */
export default function ExampleBlock({
  preview,
  code,
  defaultTab = "preview",
}: Props) {
  const [tab, setTab] = React.useState<"preview" | "code">(defaultTab);

  return (
    <div className="example-block">
      <div className="example-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "preview"}
          className={`example-tab${tab === "preview" ? " active" : ""}`}
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "code"}
          className={`example-tab${tab === "code" ? " active" : ""}`}
          onClick={() => setTab("code")}
        >
          Code
        </button>
      </div>

      {tab === "preview" ? (
        <div className="example-preview">{preview}</div>
      ) : (
        <div className="example-code">
          <CodeBlock>{code}</CodeBlock>
        </div>
      )}
    </div>
  );
}
