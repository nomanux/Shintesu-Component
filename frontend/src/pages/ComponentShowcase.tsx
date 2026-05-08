/**
 * ComponentShowcase
 *
 * Developer reference page for the Shintesu design system.
 * Each section lives in its own file under ./showcase/.
 *
 * To add a section:
 *   1. Create ./showcase/MySection.tsx exporting a default component and
 *      an optional `mySectionGuidance` ReactNode.
 *   2. Register it in `sections` and `contentMap` below.
 */

import React from "react";
import { Typography, Divider } from "antd";

import FoundationsSection, {
  FoundationsGuidance,
} from "./showcase/Foundations";
import ButtonsSection, { ButtonsGuidance } from "./showcase/Buttons";
import InputsSection, { InputsGuidance } from "./showcase/Inputs";
import FormSection, { FormGuidance } from "./showcase/Form";
import { TableSection, TableGuidance } from "./showcase/Table";
import ModalSection, { ModalGuidance } from "./showcase/Modal";
import RadioTabSection, { RadioTabGuidance } from "./showcase/RadioTab";
import ScrollSection, { ScrollGuidance } from "./showcase/Scroll";

const { Title, Text } = Typography;

const sections = [
  { key: "foundations", label: "Foundations", group: "DESIGN SYSTEM" },
  { key: "buttons", label: "Buttons", group: "COMPONENTS" },
  { key: "inputs", label: "Inputs", group: "COMPONENTS" },
  { key: "form", label: "Form", group: "COMPONENTS" },
  { key: "table", label: "Table", group: "COMPONENTS" },
  { key: "modal", label: "Modal", group: "COMPONENTS" },
  { key: "radio-tab", label: "Radio Button (Tab)", group: "COMPONENTS" },
  { key: "scroll", label: "Scroll", group: "COMPONENTS" },
] as const;

type SectionKey = (typeof sections)[number]["key"];

const contentMap: Record<
  SectionKey,
  { component: React.ReactNode; guidance: React.ReactNode }
> = {
  foundations: {
    component: <FoundationsSection />,
    guidance: <FoundationsGuidance />,
  },
  buttons: { component: <ButtonsSection />, guidance: <ButtonsGuidance /> },
  inputs: { component: <InputsSection />, guidance: <InputsGuidance /> },
  form: { component: <FormSection />, guidance: <FormGuidance /> },
  table: { component: <TableSection />, guidance: <TableGuidance /> },
  modal: { component: <ModalSection />, guidance: <ModalGuidance /> },
  "radio-tab": {
    component: <RadioTabSection />,
    guidance: <RadioTabGuidance />,
  },
  scroll: { component: <ScrollSection />, guidance: <ScrollGuidance /> },
};

export default function ComponentShowcase() {
  const [active, setActive] = React.useState<SectionKey>("foundations");

  // Group sidebar entries by their `group` field
  const groups = sections.reduce<Record<string, typeof sections[number][]>>(
    (acc, s) => {
      (acc[s.group] ||= []).push(s);
      return acc;
    },
    {},
  );

  const current = contentMap[active];

  return (
    <div className="showcase-layout">
      <div className="showcase-sidebar">
        {Object.entries(groups).map(([groupName, items]) => (
          <React.Fragment key={groupName}>
            <Text className="showcase-sidebar-label">{groupName}</Text>
            {items.map((s) => (
              <div
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`showcase-nav-item${active === s.key ? " active" : ""}`}
              >
                {s.label}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="showcase-content">
        <Title level={3} style={{ marginBottom: 4 }}>
          {sections.find((s) => s.key === active)?.label}
        </Title>
        <Divider style={{ margin: "16px 0 24px" }} />
        {current.guidance}
        {current.component}
      </div>
    </div>
  );
}
