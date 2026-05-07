import React from "react";

/**
 * Code block with copy-to-clipboard button.
 * Pass the snippet as children; whitespace is preserved.
 */
export default function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard may be blocked; ignore
    }
  };

  return (
    <pre className="code-block">
      <button
        type="button"
        className={`code-block-copy${copied ? " copied" : ""}`}
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <code>{children}</code>
    </pre>
  );
}
