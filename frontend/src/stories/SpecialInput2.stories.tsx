import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SpecialInput2 from '../components/SpecialInput2';

const meta = {
  title: 'Components/SpecialInput2',
  component: SpecialInput2,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
    },
  },
} satisfies Meta<typeof SpecialInput2>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledInput2() {
  const [value, setValue] = useState('Click me to edit');

  return (
    <SpecialInput2
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Click to edit, double-click for modal"
      style={{ width: 300 }}
    />
  );
}

export const Default: Story = {
  render: () => <ControlledInput2 />,
};

export const Small: Story = {
  render: () => (
    <SpecialInput2
      size="small"
      value="Small input"
      placeholder="Click to edit"
      style={{ width: 300 }}
    />
  ),
};

export const Middle: Story = {
  render: () => (
    <SpecialInput2
      size="middle"
      value="Middle input"
      placeholder="Click to edit"
      style={{ width: 300 }}
    />
  ),
};

export const Large: Story = {
  render: () => (
    <SpecialInput2
      size="large"
      value="Large input"
      placeholder="Click to edit"
      style={{ width: 300 }}
    />
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('Try single/double click');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label>Single click to edit, double-click for modal (blue variant):</label>
          <SpecialInput2
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: 300, marginTop: 8 }}
          />
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
            Current value: {value}
          </p>
        </div>
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => (
    <SpecialInput2
      placeholder="Enter your text here"
      style={{ width: 300 }}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <SpecialInput2
      value="Disabled input"
      disabled
      style={{ width: 300 }}
    />
  ),
};
