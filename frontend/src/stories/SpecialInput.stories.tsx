import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SpecialInput from '../components/SpecialInput';

const meta = {
  title: 'Components/SpecialInput',
  component: SpecialInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
    },
  },
} satisfies Meta<typeof SpecialInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledInput() {
  const [value, setValue] = useState('Click me to edit');

  return (
    <SpecialInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Click to edit, double-click for modal"
      style={{ width: 300 }}
    />
  );
}

export const Default: Story = {
  render: () => <ControlledInput />,
};

export const Small: Story = {
  render: () => (
    <SpecialInput
      size="small"
      value="Small input"
      placeholder="Click to edit"
      style={{ width: 300 }}
    />
  ),
};

export const Middle: Story = {
  render: () => (
    <SpecialInput
      size="middle"
      value="Middle input"
      placeholder="Click to edit"
      style={{ width: 300 }}
    />
  ),
};

export const Large: Story = {
  render: () => (
    <SpecialInput
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
          <label>Single click to edit, double-click for modal:</label>
          <SpecialInput
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
    <SpecialInput
      placeholder="Enter your text here"
      style={{ width: 300 }}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <SpecialInput
      value="Disabled input"
      disabled
      style={{ width: 300 }}
    />
  ),
};
