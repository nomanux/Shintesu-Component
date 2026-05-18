# Shinetsu Component Kit

Everything a frontend developer needs to use Shinetsu components in their own project.
No need to clone or run the full showcase — just copy these files.

---

## Dependencies

Install these packages before using any kit file:

```bash
npm install antd @ant-design/icons
```

| Package | Version | Required by |
|---|---|---|
| `react` | ≥ 19 | all components |
| `react-dom` | ≥ 19 | all components |
| `antd` | ≥ 6 | AppModal, SpecialInput, SpecialInput2, FrameTemplate |
| `@ant-design/icons` | ≥ 6 | FrameTemplate only |

> **Note:** The kit files are TypeScript (`.tsx`). Your project must have TypeScript and a bundler
> that supports it (Vite, Next.js, Create React App, etc.).

---

## 3-Step Setup

### 1. Import the CSS

Copy `index.css` into your project and import it in your **entry file** (before any component renders).
This file defines the CSS custom properties (`--brand-*`, `--gray-*`, `--sbw`) that every component
depends on. Missing this import will break SplitTable layout and scrollbar styling.

```ts
// src/main.tsx  (or index.tsx — wherever ReactDOM.render / createRoot is called)
import "./index.css";
```

### 2. Apply the theme

Copy `theme.ts` into your project and wrap your app with `ConfigProvider`:

```tsx
// src/App.tsx
import { ConfigProvider } from "antd";
import { getShinetsuTheme } from "./theme";

export default function App() {
  return (
    <ConfigProvider theme={getShinetsuTheme()}>
      {/* your app */}
    </ConfigProvider>
  );
}
```

> `getShinetsuTheme(true)` enables dark mode. Toggle it with a state variable as needed.

### 3. Copy the components you need

| Component | Files to copy | Peer files required |
|---|---|---|
| `AppModal` | `components/AppModal.tsx` | — |
| `SpecialInput` | `components/SpecialInput.tsx` | `AppModal.tsx` |
| `SpecialInput2` | `components/SpecialInput2.tsx` | `AppModal.tsx` |
| `SplitTable` | `components/SplitTable.tsx` + `components/SplitTable.css` | — |

All four components are also re-exported from `components/index.ts`:

```tsx
import { AppModal, SplitTable, SpecialInput, SpecialInput2 } from "./components";
```

---

## Component overview

### AppModal

Styled wrapper around Ant Design `Modal`. Provides consistent header/body/footer padding and borders
so every dialog in the app looks identical.

```tsx
import { AppModal } from "./components";
import { Button, Flex } from "antd";
import { modalWidth } from "./theme"; // sm | md | lg | xl | xxl

<AppModal
  open={open}
  title="Confirm"
  width={modalWidth.md}
  onCancel={() => setOpen(false)}
  footer={
    <Flex justify="flex-end" gap={8}>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button type="primary" onClick={handleSave}>Save</Button>
    </Flex>
  }
>
  <p>Modal body content here.</p>
</AppModal>
```

### SpecialInput / SpecialInput2

Custom input that supports two editing modes:
- **Single click** — unlocks the field for direct keyboard editing
- **Double click** — opens a full `AppModal` for longer text entry

`SpecialInput` has a cyan/teal tint; `SpecialInput2` has a light-blue tint.
Both require `AppModal.tsx` to be present in the same `components/` folder.

```tsx
import { SpecialInput, SpecialInput2 } from "./components";

<SpecialInput  size="small" value={val} onChange={(e) => setVal(e.target.value)} style={{ width: "100%" }} />
<SpecialInput2 size="small" value={val} onChange={(e) => setVal(e.target.value)} style={{ width: "100%" }} />
```

### SplitTable

Wraps any Ant Design `<Table>` to add:
- **Freeze columns** — drag the handle at the bottom-left of the table to pin left columns
- Synced vertical scroll between the frozen panel and the main panel
- Does **not** include column drag-to-reorder or resize — those are implemented in the inner
  `<Table>` via `components={{ header: { cell: CustomHeaderCell } }}` (see `FrameTemplate.tsx`)

```tsx
import SplitTable from "./components/SplitTable";

// The inner <Table> is your responsibility — pass it as dataTable.
// SplitTable only handles the freeze-column split layout.
<div style={{ height: 400 }}>
  <SplitTable
    data={rows}
    dataTable={<YourTable data={rows} />}
  />
</div>
```

> **`SplitTable.css` must live next to `SplitTable.tsx`** — the component imports it as
> `./SplitTable.css`. This file also depends on CSS variables from `index.css`, so both
> must be present.

---

## Optional: Inter font

The theme specifies `fontFamily: "'Inter', -apple-system, ..."`. Without Inter installed, text
falls back to the OS system font. To use Inter, add it to your HTML:

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Folder structure after setup

```
your-project/
├── src/
│   ├── components/
│   │   ├── index.ts           ← barrel export (optional, copy if you want it)
│   │   ├── SplitTable.tsx     ← copied from kit
│   │   ├── SplitTable.css     ← copied from kit (must be next to SplitTable.tsx)
│   │   ├── AppModal.tsx       ← copied from kit
│   │   ├── SpecialInput.tsx   ← copied from kit (requires AppModal.tsx)
│   │   └── SpecialInput2.tsx  ← copied from kit (requires AppModal.tsx)
│   ├── theme.ts               ← copied from kit
│   ├── index.css              ← copied from kit (import in entry file FIRST)
│   └── main.tsx               ← import "./index.css" at the top
└── package.json
```

---

## Browse & copy component code

Open the live showcase to see every component with live previews and copy-ready code snippets:

> **[https://github.com/nomanux/Shintesu-Component](https://github.com/nomanux/Shintesu-Component)**
