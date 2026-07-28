import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AppModal from '../components/AppModal';
import { Button } from 'antd';

const meta = {
  title: 'Components/AppModal',
  component: AppModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AppModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalWithTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <AppModal
        title="Modal Title"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>This is the modal content. It supports any React components.</p>
        <p>The modal has custom styling for headers, body, and footer.</p>
      </AppModal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalWithTrigger />,
};

export const WithLongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <AppModal
        title="Modal with Long Content"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </p>
      </AppModal>
    );
  },
};

export const CustomFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <AppModal
        title="Custom Footer"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => setOpen(false)}>
            Submit
          </Button>,
        ]}
      >
        <p>This modal has a custom footer with custom buttons.</p>
      </AppModal>
    );
  },
};

export const ConfirmDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <AppModal
        title="Confirm Action"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to proceed with this action?</p>
      </AppModal>
    );
  },
};
