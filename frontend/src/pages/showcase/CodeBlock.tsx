import React from "react";
import { Highlight, themes } from "prism-react-renderer";

/**
 * Code block with syntax highlighting, line numbers, and copy-to-clipboard.
 * Light theme — matches shadcn-style documentation cards.
 */
export default function CodeBlock({
  children,
  language = "tsx",
}: {
  children: string;
  language?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const code = children.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard may be blocked; ignore
    }
  };

  return (
    <div className="code-block">
      <button
        type="button"
        className={`code-block-copy${copied ? " copied" : ""}`}
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      <Highlight code={code} language={language} theme={themes.github}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="code-block-pre">
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className="code-block-line"
              >
                <span className="code-block-lineno">{i + 1}</span>
                <span className="code-block-line-content">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
