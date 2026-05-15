import React from "react";
import "./CodeBlock.scss";
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
  const [isDark, setIsDark] = React.useState(false);
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

  // Detect current theme from document root and update if it changes
  React.useEffect(() => {
    const root =
      typeof document !== "undefined" ? document.documentElement : null;
    if (!root) return;
    const getDark = () => root.getAttribute("data-theme") === "dark";
    setIsDark(getDark());

    const obs = new MutationObserver(() => setIsDark(getDark()));
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="code-block">
      <button
        type="button"
        className={`code-block-copy${copied ? " copied" : ""}`}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        aria-pressed={copied}
      >
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : "Copy code"}
        </span>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      <Highlight
        code={code}
        language={language}
        theme={isDark ? themes.vsDark : themes.github}
      >
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
