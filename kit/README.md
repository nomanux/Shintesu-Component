# Shinetsu Component Kit

Everything a frontend developer needs to use Shinetsu components in their own project.
No need to clone or run the full showcase — just copy these files.

---

## 3-Step Setup

### 1. Copy the theme file

Copy `theme.ts` into your project (e.g. `src/theme.ts`) and wrap your app:

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

### 2. Import the CSS

Copy `index.css` into your project and import it in your entry file:

```ts
// src/main.tsx
import "./index.css";
```

### 3. Copy the components you need

| Component | File | When to use |
|---|---|---|
| `SplitTable` | `components/SplitTable.tsx` + `SplitTable.scss` | Any data table — freeze columns on the left |
| `SpecialInput` | `components/SpecialInput.tsx` | Click to edit, double-click for full-edit modal |
| `SpecialInput2` | `components/SpecialInput2.tsx` | Variant of SpecialInput |
| `AppModal` | `components/AppModal.tsx` | Standard dialog with styled header/footer |

---

## Browse & copy component code

Open the live showcase to see every component with live previews and copy-ready code snippets:

> **[https://github.com/nomanux/Shintesu-Component](https://github.com/nomanux/Shintesu-Component)**

---

## Dependencies

Make sure your project has these installed:

```bash
npm install antd @ant-design/icons
```

---

## Folder structure after setup

```
your-project/
├── src/
│   ├── components/
│   │   ├── SplitTable.tsx     ← copied from kit
│   │   ├── SplitTable.scss    ← copied from kit
│   │   ├── SpecialInput.tsx   ← copied from kit (if needed)
│   │   └── AppModal.tsx       ← copied from kit (if needed)
│   ├── theme.ts               ← copied from kit
│   ├── index.css              ← copied from kit
│   └── main.tsx               ← import "./index.css" here
└── package.json
```
