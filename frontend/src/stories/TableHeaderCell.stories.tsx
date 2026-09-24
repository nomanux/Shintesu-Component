import type { Meta, StoryObj } from '@storybook/react';
import { TableHeaderCell } from '../components/TableHeaderCell';

const meta = {
  title: 'Components/TableHeaderCell',
  component: TableHeaderCell,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TableHeaderCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Column Header',
    style: {
      padding: '12px 16px',
      background: '#fafafa',
      border: '1px solid #f0f0f0',
    },
  },
};

export const WithResizeHandle: Story = {
  args: {
    children: 'Resizable Column',
    style: {
      padding: '12px 16px',
      background: '#fafafa',
      border: '1px solid #f0f0f0',
      position: 'relative',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export const Hoverable: Story = {
  args: {
    children: 'Hover me',
    style: {
      padding: '12px 16px',
      background: '#fafafa',
      border: '1px solid #f0f0f0',
      cursor: 'pointer',
    },
  },
};
