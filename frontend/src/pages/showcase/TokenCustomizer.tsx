/**
 * Generic theme-token editor.
 * Reuses the tc-* CSS classes defined in Buttons.scss (injected globally).
 */

import React from "react";

export type TokenDef<T> = { key: keyof T & string; type: "color" | "number" };
export type TokenGroup<T> = { label: string; tokens: TokenDef<T>[] };

type Props<T extends Record<string, string | number>> = {
  title: string;
  tokens: T;
  defaults: T;
  groups: TokenGroup<T>[];
  onChange: (t: T) => void;
};

function formatValue(val: string | number): string {
  if (typeof val === "number") return String(val);
  if (val.length > 9) return val.slice(0, 8) + "…";
  return val.toUpperCase();
}

function TokenRow({
  label,
  value,
  defaultValue,
  type,
  onChange,
  onReset,
}: {
  label: string;
  value: string | number;
  defaultValue: string | number;
  type: "color" | "number";
  onChange: (v: string | number) => void;
  onReset: () => void;
}) {
  const modified = value !== defaultValue;
  return (
    <div className="tc-row">
      <span className="tc-row__comp">Comp</span>
      <span className={`tc-row__name${modified ? " tc-row__name--modified" : ""}`}>
        {label}
      </span>
      {modified && (
        <button className="tc-row__reset-link" onClick={onReset}>
          Reset
        </button>
      )}
      {type === "color" ? (
        <label className="tc-row__color-trigger" title={`Click to change ${label}`}>
          <span className="tc-row__value">{formatValue(value)}</span>
          <span className="tc-row__swatch" style={{ background: value as string }} />
          <input
            type="color"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      ) : (
        <>
          <span className="tc-row__value">{formatValue(value)}</span>
          <input
            type="number"
            className="tc-row__number"
            value={value as number}
            min={0}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        </>
      )}
    </div>
  );
}

export function TokenCustomizer<T extends Record<string, string | number>>({
  title,
  tokens,
  defaults,
  groups,
  onChange,
}: Props<T>) {
  const isDirty = JSON.stringify(tokens) !== JSON.stringify(defaults);

  return (
    <div>
      <div className="tc-header">
        <span className="tc-header__title">{title}</span>
        <button
          className={`tc-header__reset${isDirty ? " tc-header__reset--active" : ""}`}
          onClick={() => onChange({ ...defaults })}
          disabled={!isDirty}
        >
          Reset All
        </button>
      </div>
      {groups.map((group) => (
        <div key={group.label}>
          <div className="tc-group__label">{group.label}</div>
          {group.tokens.map(({ key, type }) => (
            <TokenRow
              key={key}
              label={key}
              value={tokens[key]}
              defaultValue={defaults[key]}
              type={type}
              onChange={(v) => onChange({ ...tokens, [key]: v as T[typeof key] })}
              onReset={() => onChange({ ...tokens, [key]: defaults[key] })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
